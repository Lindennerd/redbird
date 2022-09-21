import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import graphql from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";
import expressPlayground from "graphql-playground-middleware-express";
import jwt from "./lib/jwt.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const payload = jwt.validateToken(token.split("Bearer ")[1]);
    res.user = payload;
    console.log(payload);
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

export default app;
