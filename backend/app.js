import express from "express";
import cors from "cors";
const app = express();
import "express-async-errors";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";
import { info } from "./utils/logger.js";
// get dir name
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// info(__dirname);
import {
  unknownEndpoint,
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
} from "./utils/middleware.js";
import userRouter from "./controller/users.js";
import loginRouter from "./controller/login.js";
import categoryRouter from "./controller/category.js";
import newsRouter from "./controller/news.js";
import videoRouter from "./controller/video.js";

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
app.use(express.static("public"));
app.use(express.static("build"));

// app.use(express.static(path.join(__dirname, "public")));
// info(path.join(__dirname, "public"));
app.use(requestLogger);
app.use(tokenExtractor);
app.use(userExtractor);

// info(path.join(__dirname, 'build', 'index.js'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/category", categoryRouter);
app.use("/api/news", newsRouter);
app.use("/api/video", videoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
