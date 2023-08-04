const express = require("express");
const router = express.Router();
const { getPlanet } = require("../controller/planets.controller");
router.get("", (req, res) => {
  getPlanet(req, res);
});
module.exports = router;
