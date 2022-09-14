import multer from "multer";
import {v4} from "uuid";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = req.body.fileType;
    let path;
    if (fileType) {
      path = `public/uploads/${fileType}`;
    } else {
      path = `public/uploads/random`;
    }
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename(req, file, cb) {
    const newFileName = `${v4()}-${file.originalname.trim()}`;
    cb(null, newFileName);
  },
});
const uploadImage = multer({
  storage: storage,
}).single("image");

const uploadVideo = multer({
  storage: storage,
}).single("video");

export { uploadImage, uploadVideo };
