import { Router } from "express";
import jwt from "jsonwebtoken";
import Video from "../models/video.js";
import { checkAdmin, setFileType } from "../utils/middleware.js";
import { uploadVideo } from "../utils/multer.js";
import { SECRET } from "../utils/config.js";
import { videoExists } from "../utils/existsMiddleware.js";
import Category from "../models/category.js";
import path from "path";
import fs from "fs";

const videoRouter = Router();

videoRouter.get("/", async (request, response) => {
  const videos = await Video.find({})
    .populate("uploader", { username: 1, email: 1 })
    .populate("category", { title: 1 });

  response.status(200).json(videos);
});

videoRouter.get("/:id", async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodeToken = jwt.verify(token, SECRET);
  if (!(user && token && decodeToken.id)) {
    return response.status(401).json({ error: "Token missing or invalid!" });
  }
  user.video_watched = user.video_watched + 1;
  await user.save();
  const found = await Video.findById(request.params.id)
    .populate("uploader", { username: 1, email: 1 })
    .populate("category", { title: 1 });

  if (found) {
    found.views = found.views + 1;
    await found.save();
    response.status(200).json(found);
  } else response.status(404).json({ error: "video not found!" }).end();
});

videoRouter.post(
  "/",
  setFileType,
  checkAdmin,
  uploadVideo,
  videoExists,
  async (request, response) => {
    const body = request.body;
    const token = request.token;
    const user = request.user;
    let videoPath;
    const { path } = request.file;
    if (path) {
      videoPath = path.replace("public", "");
    }
    const decodeToken = jwt.verify(token, SECRET);

    if (!(user && token && decodeToken.id)) {
      return response.status(401).json({ error: "Token missing or invalid!" });
    }

    const video = new Video({
      title: body.title,
      description: body.description,
      video_url: videoPath,
      category: body.category_id,
      uploader: user.id,
    });
    // .populate("category", { title: 1 })
    // .populate("user", { username: 1, email: 1 }).exec();
    const savedVideo = await video.save();
    const category = await Category.findById(body.category_id);
    category.videos = category.videos.concat(savedVideo._id);
    await category.save();
    savedVideo
      ? response.status(201).json(savedVideo)
      : response
          .status(400)
          .json({
            error: "Failed to save!",
          })
          .end();
  }
);

// update views
videoRouter.patch("/:id", checkAdmin, async (request, response) => {
  const findAndUpdate = await Video.findByIdAndUpdate(
    request.params.id,
    request.body,
    { runValidators: true }
  );
  const updatedData = await Video.findById(request.params.id)
    .populate("uploader", { username: 1, email: 1 })
    .populate("category", { title: 1 });
  findAndUpdate
    ? response.status(200).json(updatedData)
    : response
        .status(400)
        .json({
          error: "Failed to update",
        })
        .end();
});

// add video in a category through video controller

videoRouter.delete("/:id", checkAdmin, async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodeToken = jwt.verify(token, SECRET);
  if (!(token && user && decodeToken.id)) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }
  const exists = await Video.findById(request.params.id);
  if (!exists) {
    return response.status(400).json({ error: "Video doesnot exists" });
  }
  const foundCategory = await Category.findById(exists.category);
  const catVideos = foundCategory.videos;

  const filtered = catVideos.filter((video) => video.toString() !== request.params.id.toString());
  foundCategory.videos = filtered;
  await foundCategory.save();

  const deletePath = path.join("public", exists.video_url);
  fs.rmSync(deletePath);
  const result = await Video.deleteOne({ _id: request.params.id });
  if (result.deletedCount === 1) {
    response.status(204).end();
  } else {
    return response.status(400).json({ error: "Failed to delete" });
  }
});

export default videoRouter;
