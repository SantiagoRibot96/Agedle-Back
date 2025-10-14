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
      "SELECT users.current_civ, civs.id, civs.name, civs.type, civs.dlc, civs.has_full_blacksmith, civs.uu_type, civs.has_rendemption, civs.architecture_set, civs.has_cannon_galleon FROM users JOIN civs ON civs.id = users.current_civ WHERE users.token = ?",
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
