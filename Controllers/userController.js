const user = require("../Models/userModel");
const civilization = require("../Models/civilizationModel");
const userV2 = require("../Models/v2/user");
const civilizationV2 = require("../Models/v2/civilization");
const crypto = require("crypto");

const Create = async (req, res) => {
  crypto.randomBytes(46, async (err, token) => {
    if (err) {
      console.log(err);
      return res.json({ status: "error", message: "Error on token creation" });
    }

    token = token.toString("base64");

    const country = req.get("cf-ipcountry");

    civilization.getAllIds(async (err, data) => {
      if (err) {
        console.log(err);
        return res.json({
          status: "error",
          message: "Error on fetching civilization ids",
        });
      }
      
      const random = Math.floor(Math.random() * data.length);
      const currentCivilization = data[random];

      try {
          const randomUnitIndex = Math.floor(Math.random() * data.length);
          const randomUnit = data[randomUnitIndex];
          
          const userData = {
            nickname: "nickname",
            password: "1234",
            token: token,
            current_civ: currentCivilization.id,
            current_unit: randomUnit.id,
            timestamp: new Date().toLocaleDateString("en"),
            country: country,
            streak: 0,
          };
          
          const user = await userV2.create(userData);

          res.json({ status: "success", token: token });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "error",
          message: "Error on creating user",
        });
      }
    });
  });
};

const CheckToken = (req, res) => {
  const token = req.token;

  const key = req.path + ":" + token;

  user.fetchByTokenForUserDataAPI(token, (err, result) => {
    if (result) {
      const response = {
        status: "success",
        message: "Token is valid",
        player: result,
      };

      res.json(response);
    } else {
      if (err?.errno === -111) {
        return res
          .status(500)
          .json({ status: "error", message: "Error on fetching user" });
      } else if (!err && !result) {
        res.json({ status: "error", message: "Token is not valid" });
      } else {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Error on fetching user",
        });
      }
    }
  });
};

const DeleteUser = (req, res) => {
  user.deleteUser(req.token, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        status: "error",
        message: "Error on deleting account",
      });
    }

    if (result.affectedRows !== 0) {
      return res.json({ status: "success", message: "Account deleted" });
    } else {
      return res.json({
        status: "error",
        message: "No user was found with that token",
      });
    }
  });
};

const ChangeCivGuess = async (req, res) => {
  try {
    const token = req.token;
    const userObj = await userV2.findByToken(token);
    if (!userObj) {
      return res.json({ status: "error", message: "Token is invalid" });
    }

    const allCivsIds = await civilizationV2.findAllIds();
    const solvedIds = await userV2.getSolvedCivIds(userObj.id);
    const civPool = allCivsIds.filter((id) => !solvedIds.includes(id));

    const random = Math.floor(Math.random() * civPool.length);
    let newCivId = civPool[random];

    if(!newCivId){
      newCivId = allCivsIds[Math.floor(Math.random() * allCivsIds.length)];
      await userV2.clearSolvedCivs(userObj.id);
    }

    await userV2.updateById(userObj.id, { current_civ: newCivId });

    res.json({
      status: "success",
      message: "Changed guess to Civilization game",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Error on updating user data" });
  }
};

const ChangeUnitGuess = async (req, res) => {
  try {
    const token = req.token;
    const userObj = await userV2.findByToken(token);
    if (!userObj) {
      return res.json({ status: "error", message: "Token is invalid" });
    }

    const allCivsIds = await civilizationV2.findAllIds();
    const solvedIds = await userV2.getSolvedUnitIds(userObj.id);
    const civPool = allCivsIds.filter((id) => !solvedIds.includes(id));

    const random = Math.floor(Math.random() * civPool.length);
    let newCivId = civPool[random];

    if(!newCivId){
      newCivId = allCivsIds[Math.floor(Math.random() * allCivsIds.length)];
      await userV2.clearSolvedUnits(userObj.id);
    }

    await userV2.updateById(userObj.id, { current_unit: newCivId });

    res.json({
      status: "success",
      message: "Changed guess to Unit game",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Error on updating user data" });
  }
};

module.exports = {
  Create,
  CheckToken,
  DeleteUser,
  ChangeCivGuess,
  ChangeUnitGuess
};