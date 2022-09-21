import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import graphql from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  "/graphql",
  graphql.graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    graphiql: true,
  })
);

export default app;
