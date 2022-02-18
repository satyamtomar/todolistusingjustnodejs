const { body } = require("express-validator/check");

exports.validate = (method) => {
  switch (method) {
    case "vsignup": {
      return [
        body("email", "Enter a valid mail").isEmail(),
        body("name", "Enter a valid name").isLength({ min: 1 }),
        body("password", "Password must contain atleast 5 characters").isLength(
          {
            min: 1,
          }
        ),
      ];
    }
    case "vlogin": {
      return [
        body("email", "Enter a valid mail").isEmail(),
        body("password", "Password cannot be blank").exists(),
      ];
    }
    case "vfetchlist": {
      return [
        
        body("description", "Enter a valid description").isLength({ min: 1 }),
      ];
    }
    case "vaddlist": {
      return [
       
        body("description", "Enter a valid description").isLength({ min: 1 }),
      ];
    }
  }
};
