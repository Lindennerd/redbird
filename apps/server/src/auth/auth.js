import jwt from "../lib/jwt.js";

export default {
  getToken(token) {
    if (token && token.startsWith("Bearer")) {
      return jwt.getUser(token.split("Bearer")[1]);
    } else return null;
  },
};
