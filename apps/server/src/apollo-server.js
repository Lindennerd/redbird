import apollo from "apollo-server-express";
import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";

const server = new apollo.ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ["*"],
  },
  csrfPrevention: true,
  cache: "bounded",
  context: ({ req }) => {},
});
export default server;
