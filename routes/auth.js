const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const evalid = require("../middleware/expressvalid");
const auth = require("../controllers/auth.js");
router.route("/createuser").post(evalid.validate("vsignup"), auth.createuser);

router.route("/login").post(evalid.validate("vlogin"), auth.login);

router.route("/getuser").get(fetchuser, auth.getuser);

module.exports = router;
