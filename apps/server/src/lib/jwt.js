const jwt = require("jsonwebtoken");

// TODO move to env
const SECRET = "dev-secret";

module.exports = {
  genToken: (data) => {
    return jwt.sign(data, SECRET);
  },

  validateToken: (token) => {
    return jwt.verify(token, SECRET);
  },
};
