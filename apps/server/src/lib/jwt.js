const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  genToken: (data) => {
    return jwt.sign(data, config.JWT_SECRET);
  },

  validateToken: (token) => {
    return jwt.verify(token, config.JWT_SECRET);
  },
};
