import express from "express";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";
import { info } from "./utils/logger.js";
import {
  unknownEndpoint,
  requestLogger,
  errorHandler,
} from "./utils/middleware.js";
import userRouter from "./controller/users.js";
import loginRouter from "./controller/login.js";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("connected to mongodb");
  })
  .catch((error) => {
    error("Error connecting mongodb:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
