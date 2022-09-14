import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  code: {
    type: Number,
    required: [true, "Code is required"],
  },
  createdAt: {
    type: Date,
    expires: "10m",
    default: Date.now,
  },
});

mailSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Mail = mongoose.model("mail_codes", mailSchema);
export default Mail;
