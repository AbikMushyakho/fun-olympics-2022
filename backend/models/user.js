import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  favourites: [
    {type:mongoose.Schema.Types.ObjectId, ref:'videos'}
  ],
  verified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // returnedObject.favourites = returnedObject.favourites.map((fav)=>{return fav.toString()})
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("users", userSchema);
export default User;
