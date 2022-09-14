import express from "express";
import cors from "cors";
const app = express();
import "express-async-errors"
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";
import { info } from "./utils/logger.js";
import {
  unknownEndpoint,
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
  checkAdmin
} from "./utils/middleware.js";
import userRouter from "./controller/users.js";
import loginRouter from "./controller/login.js";
import categoryRouter from "./controller/category.js"

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
app.use(tokenExtractor);
app.use(userExtractor)


app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use('/api/category',categoryRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
