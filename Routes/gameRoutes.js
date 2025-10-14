const express = require("express");

const router = express.Router();

const civilizationController = require("../Controllers/civilizationController");

router.get("/civs", civilizationController.GetAllCivs);

router.get("/civs/correctguess", civilizationController.GetCorrectCiv);

router.get("/unit", civilizationController.GetUnit);
router.get("/unit/correctguess", civilizationController.GetCorrectUnit);

module.exports = router;