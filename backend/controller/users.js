import User from "../models/user.js";
import express from "express";
import Bcrypt from "bcrypt";
import mailSender from "../auth/mailSender.js";
import Mail from "../models/mail.js";

const userRouter = express.Router();

userRouter.get("/", async (request, response) => {
  // Can use populate  like .populate('favourites')
  const users = await User.find({});
  response.status(200).json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, email, password } = request.body;
  if (!((username || email) && password)) {
    return response.status(400).json({
      error: "username , email and password are required!",
    });
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "username and password must be at least 3 characters long!",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      error: "email must be unique!",
    });
  }

  const passwordHash = await Bcrypt.hash(password, 10);
  const user = new User({ username, email, passwordHash });
  const savedUser = await user.save();
  if (!savedUser) {
    return response.status(400).json({
      error: "User not saved",
    });
  }
  const sendMail = mailSender.SendEmail(email);
  if (!sendMail) {
    return response.status(400).json({
      error: "failed to send mail!",
    });
  }

  response.status(201).json(savedUser);
});

userRouter.post("/verify", async (request, response) => {
  const { email, code } = request.body;

  const find = await Mail.findOne({ email: email });
  if (find) {
    if (find.code === code) {
      const verifiedUser = await User.findOne({ email: email });
      verifiedUser.verified = true;
      await verifiedUser.save();
      response.status(200).json(verifiedUser);
    } else {
      return response.status(400).json({
        error: "code not matched!",
      });
    }
  } else {
    return response.status(400).json({
      error: "email not found!",
    });
  }
});

export default userRouter;
