const civilization = require("../Models/civilizationModel");
const userV2 = require("../Models/v2/user");
const civilizationV2 = require("../Models/v2/civilization");
const GetPartialSimilarites = require("../Helpers/compare").GetPartialSimilarites;
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

const GetCorrectCiv = async (req, res) => {
  const token = req.token;
  const user = await userV2.findByToken(token);
  if (!user)
    return res.json({ status: "error", message: "Token is invalid" });

  const correctCiv = await civilizationV2.findById(user.current_civ);
  if (!correctCiv)
    return res.json({ status: "error", message: "User has no current civ" });

  return res.json({
    status: "success",
    correctguess: correctCiv.name,
  });
}

const GetCorrectUnit = async (req, res) => {
  const token = req.token;
  const user = await userV2.findByToken(token);
  if (!user)
    return res.json({ status: "error", message: "Token is invalid" });

  const correctoUnit = await civilizationV2.findById(user.current_unit);
  if (!correctoUnit)
    return res.json({ status: "error", message: "User has no current unit" });

  return res.json({
    status: "success",
    correctguess: correctoUnit.name,
  });
}

const GetAllCivs = (req, res) => {
  const key = req.path;
  
  civilization.getAllNames((err, result) => {
    if (err) {
      console.log(err);
      
      return res.json({ status: "error", error: err });
    }

    const civs = [];
    result.forEach((civ) => {
      civs.push({
        value: civ["name"]
      });
    });

    const response = { status: "success", civs: civs };
    
    res.json(response);
  });
};

const GuessCiv = async (req, res) => {
  try {
    const { guess } = req.body;
    if (!guess)
      return res.json({ status: "error", message: "Guess is required" });

    const token = req.token;
    const user = await userV2.findByToken(token);
    if (!user)
      return res.json({ status: "error", message: "Token is invalid" });

    const correctCiv = await civilizationV2.findById(user.current_civ);
    if (!correctCiv)
      return res.json({ status: "error", message: "User has no current civ" });

    const guessCiv = await civilizationV2.findByName(guess);

    if (!guessCiv) {
      return res.json({
        status: "error",
        message: "Nothing found with that civilization name",
      });
    }

    const civData = {
      guessedCiv: guessCiv.name,
      type: guessCiv.type,
      dlc: guessCiv.dlc,
      hasFullBlacksmith: guessCiv.has_full_blacksmith,
      UUType: guessCiv.uu_type,
      hasRendemption: guessCiv.has_rendemption,
      architectureSet: guessCiv.architecture_set,
      hasCannonGalleon: guessCiv.has_cannon_galleon
    };

    const similarites = {
      sameDlc: guessCiv.dlc === correctCiv.dlc,
      sameHasFullBlacksmith: guessCiv.has_full_blacksmith === correctCiv.has_full_blacksmith,
      sameUUType: GetPartialSimilarites(
        guessCiv.uu_type,
        correctCiv.uu_type
      ),
      sameType: GetPartialSimilarites(
        guessCiv.type,
        correctCiv.type
      ),
      sameHasRendemption: guessCiv.has_rendemption === correctCiv.has_rendemption,
      sameArchitectureSet: guessCiv.architecture_set === correctCiv.architecture_set,
      sameHasCannonGalleon: guessCiv.has_cannon_galleon === correctCiv.has_cannon_galleon
    };
    if (guess !== correctCiv.name) {
      return res.json({
        status: "success",
        correctGuess: false,
        properties: [civData, similarites],
      });
    }

    // correct guess
    // Get all civ IDs
    const allCivIds = await civilizationV2.findAllIds();

    // Get solved civ IDs for this user
    const solvedRows = await userV2.getSolvedCivIds(user.id);

    // Add the just-solved civ if not already present
    if (!solvedRows.includes(correctCiv.id)) {
      await userV2.addSolvedCiv(user.id, correctCiv.id);
      solvedRows.push(correctCiv.id);
    }

    // Pick a new civ not yet solved
    const unsolvedIds = allCivIds.filter(
      (id) => !solvedRows.includes(id)
    );

    let newCivId = unsolvedIds[Math.floor(Math.random() * unsolvedIds.length)];

    if(!newCivId){
      newCivId = allCivIds[Math.floor(Math.random() * allCivIds.length)]
      await clearSolvedCivs(user.id);
    }

    // Update user
    await userV2.updateById(user.id, {
      current_civ: newCivId,
    });

    res.json({
      status: "success",
      correctGuess: true,
      properties: [civData, similarites],
      title: correctCiv.title,
    });
  } catch (error) {
    console.error("Error in Guess function:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const GetUnit = async (req, res) => {
  const token = req.token;
  try {
    const userObj = await userV2.findByToken(token);
    if (!userObj) {
      return res.json({ status: "error", message: "Token is invalid" });
    }

    if (!userObj.current_unit) {
      return res.json({
        status: "error",
        message: "No current unit set for this user",
      });
    }

    // Fetch the unit from the database
    const currentUnitId = userObj.current_unit;
    
    const unitData = await civilizationV2.findById(currentUnitId);
    if (!unitData) {
      return res.json({
        status: "error",
        message: "unit not found for this user",
      });
    }

    const imageName = unitData.name;
    
    return res.json({
      status: "success",
      result: imageName,
    });
  } catch (error) {
    console.error("Error in GetUnit function:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const GuessUnit = async (req, res) => {
  try {
    const { guess } = req.body;
    if (!guess)
      return res.json({ status: "error", message: "Guess is required" });

    const token = req.token;
    const user = await userV2.findByToken(token);
    if (!user)
      return res.json({ status: "error", message: "Token is invalid" });

    const correctUnit = await civilizationV2.findById(user.current_unit);
    
    if (!correctUnit)
      return res.json({ status: "error", message: "No current unit set for this user" });

    const guessCiv = await civilizationV2.findByName(guess);

    if (!guessCiv) {
      return res.json({
        status: "error",
        message: "Nothing found with that unit name",
      });
    }

    if (guessCiv.name !== correctUnit.name) {
      return res.json({
        status: "success",
        isCorrect: false,
        name: guessCiv.name,
        name2: correctUnit.name
      });
    }

    // correct guess
    // Get all civ IDs
    const allCivIds = await civilizationV2.findAllIds();

    // Get solved civ IDs for this user
    const solvedRows = await userV2.getSolvedUnitIds(user.id);

    // Add the just-solved civ if not already present
    if (!solvedRows.includes(correctUnit.id)) {
      await userV2.addSolvedUnit(user.id, correctUnit.id);
      solvedRows.push(correctUnit.id);
    }

    // Pick a new civ not yet solved
    const unsolvedIds = allCivIds.filter(
      (id) => !solvedRows.includes(id)
    );
    let newCivId =
      unsolvedIds[Math.floor(Math.random() * unsolvedIds.length)];

    if(!newCivId){
      newCivId = allCivIds[Math.floor(Math.random() * allCivIds.length)]
      await clearSolvedUnits(user.id);
    }
    // Update user
    await userV2.updateById(user.id, {
      current_unit: newCivId,
    });
    
    res.json({
      status: "success",
      isCorrect: true,
      properties: correctUnit,
      name: correctUnit.name,
    });
  } catch (error) {
    console.error("Error in Guess function:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  GetAllCivs,
  GuessCiv,
  GuessUnit,
  GetUnit,
  GetCorrectCiv,
  GetCorrectUnit
};