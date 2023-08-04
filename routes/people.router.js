const express = require("express");
const router = express.Router();
const { getPeople } = require("../controller/people.controller");
router.get("", (req, res) => {
  getPeople(req, res);
});
module.exports = router;
