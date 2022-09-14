import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

newsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const News = mongoose.model("news", newsSchema);
export default News;
