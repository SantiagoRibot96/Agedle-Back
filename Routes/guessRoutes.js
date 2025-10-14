const express = require("express");

const router = express.Router();

const civilizationController = require("../Controllers/civilizationController");

router.post("/guess/civ", civilizationController.GuessCiv);
router.post("/guess/unit", civilizationController.GuessUnit);

module.exports = router;
