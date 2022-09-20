import hello from "./hello.js";
import user from "./user.js";
import login from "./login.js";

const resolvers = {
  Query: {
    hello: hello,
    users: user.getUsers,
    login: login.login,
  },

  Mutation: {
    registerUser: user.registerUser,
  },
};

export default resolvers;
