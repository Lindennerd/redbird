import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));

export default app;
