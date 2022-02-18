const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const listss = require("../controllers/list");
const evalid = require("../middleware/expressvalid");
router
  .route("/fetchlist")
  .get(fetchuser, evalid.validate("vfetchlist"), listss.fetchlist);

router
  .route("/addlist")
  .post(fetchuser, evalid.validate("vaddlist"), listss.addlist);

router.route("/updatelist/:id").put(fetchuser, listss.updatelist);

router.route("/deletelist/:id").delete(fetchuser, listss.deletelist);

module.exports = router;
