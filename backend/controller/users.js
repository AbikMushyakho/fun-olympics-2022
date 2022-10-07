import User from "../models/user.js";
import express from "express";
import Bcrypt from "bcrypt";
import mailSender from "../auth/mailSender.js";
import Mail from "../models/mail.js";
import { checkAdmin } from "../utils/middleware.js";


const userRouter = express.Router();

userRouter.get("/", checkAdmin, async (request, response) => {
  // Can use populate  like .populate('favourites')
  const users = await User.find({}).populate("favourites");
  response.status(200).json(users);
});
userRouter.get("/:id", async (request, response) => {
  const found = await User.findById(request.params.id).populate("favourites");

  found
    ? response.status(200).json(found)
    : response.status(404).json({ error: "user not found!" }).end();
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

userRouter.patch("/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.user;
  const token = request.token;
  if (!(user && token)) {
    return response.status(401).json({ error: "Token missing or invalid!" });
  }

  const { username, email, password } = request.body;
  let passwordHash = null;
  if (user.id === id || user.isAdmin) {
    password === undefined || password === ""
      ? (passwordHash = null)
      : (passwordHash = Bcrypt.hashSync(password, 10));
    const newData =
      passwordHash === null
        ? { username, email }
        : { username, email, passwordHash };
    const findAndUpdate = await User.findByIdAndUpdate(id, newData, {
      runValidators: true,
    });
    const updatedUser = await User.findById(id);
    findAndUpdate
      ? response.status(200).json(updatedUser)
      : response
          .status(400)
          .json({
            error: "Failed to update! Try again later",
          })
          .end();
  } else {
    response
      .status(401)
      .json({
        error: "Unauthorized update!",
      })
      .end();
  }
});

userRouter.patch("/fav/:id",async(request,response)=>{
  const { id } = request.params;
  const user = request.user;
  const token = request.token;
  if (!(user && token)) {
    return response.status(401).json({ error: "Token missing or invalid!" });
  }

  // const body = request.body;
  const videoId = request.body.videoId.toString()
  const prevFav = [...user.favourites]
  const exists = prevFav.some((fav) => String(fav) === String(videoId));
  if (exists) {
    const removedList = prevFav.filter(
      (fav) => String(fav) !== String(videoId)
    );
    user.favourites = removedList;
    await user.save();
    response
      .status(200)
      .json({ message: "Removed from favourite list", data: removedList });
  } else {
    let favourites = [...prevFav, videoId];
    console.log(favourites);
    user.favourites = favourites;
    await user.save();
    response
      .status(200)
      .json({ message: "Added to favourite list", data: favourites });
  }


})

export default userRouter;
