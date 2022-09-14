import Category from "../models/category.js";
import fs from "fs";
import News from "../models/news.js";
import Video from "../models/video.js";
const categoryExists = async function (request, response, next) {
  const { title } = request.body;
  const exists = await Category.findOne({ title: title });
  if (exists) {
    const path = request.file.path;
    fs.rmSync(path);
    return response.status(409).json({
      error: `${request.body.title} already exists!`,
    });
  }

  next();
};

const newsExists = async function (request, response, next) {
  const { title } = request.body;
  const exists = await News.findOne({ title: title });
  if (exists) {
    const path = request.file.path;
    fs.rmSync(path);
    return response.status(409).json({
      error: `${request.body.title} already exists!`,
    });
  }

  next();
};

const videoExists = async function (request, response, next) {
  const { title } = request.body;
  const exists = await Video.findOne({ title: title });
  if (exists) {
    const path = request.file.path;
    fs.rmSync(path);
    return response.status(409).json({
      error: `${request.body.title} already exists!`,
    });
  }

  next();
};

export { categoryExists ,newsExists,videoExists };
