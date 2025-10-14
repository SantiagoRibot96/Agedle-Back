const db = require("../Configs/db");

const user = {
  update: (data, cb) => {
    return db.query(
      "UPDATE users SET current_civ = ? WHERE token = ?",
      [data.current_civ, data.token],
      cb
    );
  },
  fetchByTokenForUserDataAPI: (token, cb) => {
    return db.query(
      "SELECT nickname, timestamp, country FROM users WHERE token = ?;",
      [token, token],
      cb
    );
  },
  changeNickname: (data, cb) => {
    return db.query(
      "UPDATE users SET nickname = ? WHERE token = ?",
      [data.nickname, data.token],
      cb
    );
  },
  deleteUser: (token, cb) => {
    return db.query("DELETE FROM users WHERE token = ?", [token], cb);
  },
  setCountry: (data, cb) => {
    return db.query(
      "UPDATE users SET country = ? WHERE token = ?",
      [data.country, data.token],
      cb
    );
  },
};

module.exports = user;
