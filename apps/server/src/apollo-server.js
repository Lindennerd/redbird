import apollo from "apollo-server-express";
import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";
import auth from "./auth/auth.js";
import { AuthenticationError } from "apollo-server-express";

const server = new apollo.ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  context: ({ req, res }) => {
    const token = req.headers.authorization || "";
    const user = auth.getToken(token);

    console.log("user", user);

    return {
      user,
      req,
      res,
    };
  },
});
export default server;
