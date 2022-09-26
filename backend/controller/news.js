import { Router } from "express";
import News from "../models/news.js";
import { newsExists } from "../utils/existsMiddleware.js";
import { checkAdmin, setFileType } from "../utils/middleware.js";
import { uploadImage } from "../utils/multer.js";
import { SECRET } from "../utils/config.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

const newsRouter = Router();

newsRouter.get("/", async (request, response) => {
  const news = await News.find({}).populate("user", { username: 1, email: 1 });
  return response.status(200).json(news);
});

newsRouter.get("/:id", async (request, response) => {
  const news = await News.findById(request.params.id).populate("user", {
    username: 1,
    email: 1,
  });
  news
    ? response.status(200).json(news)
    : response.status(404).json({ error: "News doesn't exists!" }).end();
});

newsRouter.post(
  "/",
  setFileType,
  checkAdmin,
  uploadImage,
  newsExists,
  async (request, response) => {
    const body = request.body;
    const token = request.token;
    const user = request.user;
    let imagePath;
    const { path } = request.file;
    if (path) {
      imagePath = path.replace("public", "");
    }
    const decodeToken = jwt.verify(token, SECRET);

    if (!(user && token && decodeToken.id)) {
      return response.status(401).json({ error: "Token missing or invalid!" });
    }
    const news = await new News({
      title: body.title,
      description: body.description,
      image: imagePath,
      user: user.id,
    }).populate("user", { username: 1, email: 1 });
    const savedNews = await news.save();
    savedNews
      ? response.status(201).json(savedNews)
      : response
          .status(400)
          .json({
            error: "Failed to save!",
          })
          .end();
  }
);

newsRouter.patch("/:id", checkAdmin, async (request, response) => {
  const findAndUpdate = await News.findByIdAndUpdate(
    request.params.id,
    request.body,
    { runValidators: true }
  );
  const updatedData = await News.findById(request.params.id);
  findAndUpdate
    ? response.status(200).json(updatedData)
    : response
        .status(400)
        .json({
          error: "Failed to update",
        })
        .end();
});

newsRouter.delete("/:id", checkAdmin, async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodeToken = jwt.verify(token, SECRET);
  if (!(token && user && decodeToken.id)) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }
  const exists = await News.findById(request.params.id);
  if (!exists) {
    return response.status(400).json({ error: "News doesnot exists" });
  }
  const deletePath = path.join("public", exists.image)
  fs.rmSync(deletePath);
  const result = await News.deleteOne({ _id: request.params.id });
  if (result.deletedCount === 1) {
    response.status(204).end();
  } else {
    return response.status(400).json({ error: "Failed to delete" });
  }
});

export default newsRouter;
