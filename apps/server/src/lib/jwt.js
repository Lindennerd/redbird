import jwt from "jsonwebtoken";

// TODO move to env
const SECRET = "dev-secret";

export default {
  genToken: (data) => {
    return jwt.sign(data, SECRET);
  },

  validateToken: (token) => {
    console.log(token);
    return jwt.verify(token, SECRET);
  },
};
