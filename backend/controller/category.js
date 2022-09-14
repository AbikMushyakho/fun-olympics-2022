import { request, response, Router } from "express";
import Category from "../models/category.js";
import { SECRET } from "../utils/config.js";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/multer.js";
import { checkAdmin } from "../utils/middleware.js";
import { categoryExists } from "../utils/existsMiddleware.js";
const categoryRouter = Router();

categoryRouter.get("/", async (request, response) => {
  const categories = await Category.find({});
  // .populate("video");
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
    const imagePath = request.file.path;
    const decodeToken = jwt.verify(token, SECRET);

    if (!(user && token && decodeToken.id)) {
      return response.status(401).json({
        success: false,
        message: "Token missing or invalid!",
      });
    }

    const category = new Category({
      title: body.title,
      description: body.description,
      image: imagePath,
    });

    // .populate("video");
    const savedCategory = await category.save();
    if (savedCategory) {
      return response.status(201).json({
        success: true,
        message: "Saved Successfully!",
        data: savedCategory,
      });
    } else {
      return response
        .status(400)
        .json({
          success: false,
          message: "Failed to save!",
        })
        .end();
    }
  }
);

categoryRouter.get("/:id", async (request, response) => {
  const category = await Category.findById(request.params.id);
  // .populate("video");
  if (category) {
    return response.json({
      success: true,
      message: "Category found successully!",
      data: category,
    });
  } else {
    return response
      .status(404)
      .json({ success: false, message: "Category doesn't exists!" }).end;
  }
});

categoryRouter.put("/:id", checkAdmin, async (request, response) => {
  const { id } = request.params;
  const updatedCategory = await Category.update(
    { ...request.body },
    { where: { id } }
  );
  if (updatedCategory[0]) {
    return response.json({
      success: true,
      message: "Category upated",
      data: updatedCategory,
    });
  } else {
    response
      .status(404)
      .json({ success: false, message: "Failed to update category" });
  }
});

export default categoryRouter;
