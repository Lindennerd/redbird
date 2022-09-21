const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const graphql = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const expressPlayground = require("graphql-playground-middleware-express");
const jwt = require("./lib/jwt");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const payload = jwt.validateToken(token.split("Bearer ")[1]);
    req.user = payload;
  }

  next();
});

app.use(
  "/graphql",
  graphql.graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  })
);

app.use("/playground", expressPlayground.default({ endpoint: "/graphql" }));

module.exports = app;
