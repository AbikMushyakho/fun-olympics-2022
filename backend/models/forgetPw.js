import mongoose from "mongoose";

const forgetPw = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  code: {
    type: Number,
    required: [true, "Code is required"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    expires: "10m",
    default: Date.now,
  },
});

forgetPw.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ForgetPw = mongoose.model("forget_pws", forgetPw);
export default ForgetPw;
