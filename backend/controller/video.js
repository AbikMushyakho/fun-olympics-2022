import { Router } from "express";
import jwt from "jsonwebtoken";
import Video from "../models/video.js";
import { checkAdmin } from "../utils/middleware.js";
import { uploadVideo } from "../utils/multer.js";
import { SECRET } from "../utils/config.js";
import { videoExists } from "../utils/existsMiddleware.js";

const videoRouter = Router();

videoRouter.get("/", async (request, response) => {
  const videos = await Video.find({})
    .populate("uploader", { username: 1, email: 1 })
    .populate("category", { title: 1 });

  response.status(200).json(videos);
});

videoRouter.get("/:id", async (request, response) => {
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
      user: user.id,
    });
    // .populate("category", { title: 1 })
    // .populate("user", { username: 1, email: 1 }).exec();

    const savedVideo = await video.save();
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


export default videoRouter;
