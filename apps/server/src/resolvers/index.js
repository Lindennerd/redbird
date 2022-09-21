const user = require("./user");
const login = require("./login");

const resolvers = {
  Query: {
    users: user.getUsers,
    login: login.login,
  },

  Mutation: {
    registerUser: user.registerUser,
  },
};

module.exports = resolvers;
