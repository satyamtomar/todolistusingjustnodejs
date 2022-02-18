const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "satyamtomar";
const Joi= require("joi");
//Route1 Creating a user using: POST "/api/auth/createuser".Doesn't require Login
module.exports = {
  createuser: async (req, res) => {
    try {
    const schema=Joi.object({
      name: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    const result=await schema.validateAsync(req.body);
    console.log(result);
    let success = false;
    const errors = validationResult(req);
    // if there are errors, returns bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //checks whether the email has already been created
    
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);

      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      //   .then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      // res.json({error:'Please enter a unique value for email'})
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, jwtsecret);
      res.json({ success, authtoken });
    } catch (error) {
      if(error.isJoi)
      {
        res.status(400).send("Joi server error");
      }
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },

  login: async (req, res) => {
    let success = false;
    // const errors = validationResult(req);
    // //if there are errors, returns bad request
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try {
    const { email, password } = req.body;
    
      const schema=Joi.object({
       
      
  
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  
  
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      })
      const result=await schema.validateAsync(req.body);
     
      
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare)
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwtsecret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      if(error.isJoi)
      {
        res.status(400).send("Joi server error");
      }
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },

  getuser: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },
};
