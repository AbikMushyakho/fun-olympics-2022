import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  views: { type: Number, default: 0, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});

videoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Category = mongoose.model("video", videoSchema);
export default Category;
