import User from "../models/user.js";
import express from "express";

import mailSender from "../auth/forgetPwMail.js";
import FpMail from "../models/forgetPw.js";
import Bcrypt from "bcrypt";

const ChangePasswordRouter = express.Router();

ChangePasswordRouter.post("/send_mail", async (request, response) => {
  const { email } = request.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    return response.status(400).json({
      error: "User doesnot exists!",
    });
  }
  const sendMail = mailSender.SendEmail(email);
  if (!sendMail) {
    return response.status(400).json({
      error: "Failed to send mail!",
    });
  }
  response.status(201).json({ message: "Change passsword OTP Sent" });
});

ChangePasswordRouter.post("/verify_otp", async (request, response) => {
  const { email, code } = request.body;
  const find = await FpMail.findOne({ email: email });
  if (find) {
    if (find.code === code) {
      const verifiedUser = await User.findOne({ email: email });
      find.verified = true;
      await find.save();
      response.status(200).json(verifiedUser);
    } else {
      return response.status(400).json({
        error: "Code not matched!",
      });
    }
  } else {
    return response.status(400).json({
      error: "Email not found!",
    });
  }
});

ChangePasswordRouter.post("/new_password", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return response.status(400).json({
      error: "User doesnot exists!",
    });
  }
  const checkCode = await FpMail.findOne({ email: email });
  if (!checkCode) {
    return response.status(400).json({
      error: "Otp code expired!!",
    });
  }
  if (!checkCode.verified) {
    return response.status(400).json({
      error: "Please verify your otp code!!",
    });
  }

  if (password.length < 7) {
    return response.status(400).json({
      error: "New password must be at least 7 characters long!",
    });
  }
  const match = await Bcrypt.compare(password, user.passwordHash);
  if (match) {
    return response.status(400).json({
      error: "Password not valid, Try new password!!",
    });
  }
  const newPasswordHash = await Bcrypt.hash(password, 10);
  user.passwordHash = newPasswordHash;
  await user.save();
  response.status(200).json(user);
});

export default ChangePasswordRouter;
