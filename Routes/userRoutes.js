const express = require("express");

const router = express.Router();

const userController = require("../Controllers/userController");

router.get("/user", userController.CheckToken);

router.post("/user", userController.Create);

router.put("/user/civ", userController.ChangeCivGuess);
router.put("/user/unit", userController.ChangeUnitGuess);

router.delete("/user", userController.DeleteUser);

module.exports = router;