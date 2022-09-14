import Category from "../models/category.js";
import fs from "fs"
const categoryExists = async function (request, response, next) {
  const { title } = request.body;
  const exists = await Category.find({ title: title });
  if (exists) {
    const path = request.file.path;
    fs.rmSync(path);
    return response.status(409).json({
      error: `${request.body.title} already exists!`,
    });
  }

  next();
};

export { categoryExists };
