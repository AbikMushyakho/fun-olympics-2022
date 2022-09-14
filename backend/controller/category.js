import { Router } from "express";
import Category from "../models/category.js";
import { SECRET } from "../utils/config.js";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/multer.js";
import { checkAdmin } from "../utils/middleware.js";
import { categoryExists } from "../utils/existsMiddleware.js";
const categoryRouter = Router();

categoryRouter.get("/", async (request, response) => {
  const categories = await Category.find({}).populate("videos");
  response.json(categories);
});

categoryRouter.post(
  "/",
  checkAdmin,
  uploadImage,
  categoryExists,
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

    const category = new Category({
      title: body.title,
      description: body.description,
      image: imagePath,
    });

    const savedCategory = await category.save();
    if (savedCategory) {
      return response.status(201).json(savedCategory);
    } else {
      return response
        .status(400)
        .json({
          error: "Failed to save!",
        })
        .end();
    }
  }
);

categoryRouter.get("/:id", async (request, response) => {
  const category = await Category.findById(request.params.id).populate(
    "videos"
  );
  category
    ? response.status(200).json(category)
    : response.status(404).json({ error: "Category doesn't exists!" }).end();
});

categoryRouter.put("/:id", checkAdmin, async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const find = await Category.findById(id);

  let newData;
  find
    ? (newData = {
        title: body.title || find.title,
        description: body.description || find.description,
        image: find.image,
        videos: find.videos,
      })
    : response.status(404).json({ error: "category not found" });
  const updatedCategory = await Category.findOneAndUpdate(
    { where: { id } },
    newData,
    { new: true }
  );
  updatedCategory
    ? response.json(updatedCategory)
    : response.status(404).json({ error: "Failed to update category" });
});

categoryRouter.patch("/:id", checkAdmin, async (request, response) => {
  const findAndUpdate = await Category.findByIdAndUpdate(
    request.params.id,
    request.body,
    { runValidators: true }
  );
  const updatedData = await Category.findById(request.params.id);
  findAndUpdate
    ? response.status(200).json(updatedData)
    : response
        .status(400)
        .json({
          error: "Failed to update",
        })
        .end();
});

export default categoryRouter;
