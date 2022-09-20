import hello from "./hello.js";
import user from "./user.js";

const resolvers = {
  Query: {
    hello: hello,
    users: user.getUsers,
  },
};

export default resolvers;
