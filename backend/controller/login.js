import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import User from "../models/user.js";
import { SECRET } from "../utils/config.js";

const loginRouter = Router();
loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await Bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return response.status(400).json({
      error: "Invalid email or password!!",
    });
  }
  const userForToken = {
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    id: user._id,
  };
  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 });

  response.status(200).json({
    token: token,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    id:user._id
  });
});

export default loginRouter;
