const db = require("../Configs/db");

const civilization = {
  getAllIds: (cb) => {
    db.query("SELECT id FROM civs", cb);
  },
  getAllNames: (cb) => {
    db.query("SELECT name FROM civs", cb);
  },
  getAllNames: (cb) => {
    db.query("SELECT name FROM civs", cb);
  },
  getByToken: (token, cb) => {
    db.query(
      "SELECT users.currentCiv, civs.id, civs.name, civs.type, civs.dlc, civs.hasFullBalcksmith, civs.UUType, civs.hasRendemption, civs.architectureSet, civs.hasCannonGalleon FROM users JOIN civs ON civs.id = users.currentCiv WHERE users.token = ?",
      [token],
      cb
    );
  },
  getByName: (name, cb) => {
    db.query("SELECT * FROM civs WHERE name = ?", [name], cb);
  },
  getNameById: (id, cb) => {
    db.query("SELECT name FROM civs WHERE id = ?", [id], cb);
  },
};

module.exports = civilization;
