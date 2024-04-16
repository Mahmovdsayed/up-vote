import multer from "multer";
import { nanoid } from "nanoid";
import genrateUniqueString from "../utils/generateUniqueString.js";
import allowedExtensions from "../utils/allowedExtensions.js";
import fs from "fs";
import path from "path";
export const multerMiddleWareLocal = ({
  extensions = allowedExtensions.image,
  filePath = "general",
}) => {
  const destination = path.resolve(`uploads/${filePath}`);
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqFileName = genrateUniqueString(8) + "_" + file.originalname;
      cb(null, uniqFileName);
    },
  });
  // fileFilter
  const fileFilter = (req, file, cb) => {
    if (extensions.includes(file.mimetype.split("/")[1])) {
      return cb(null, true);
    }
    cb(new Error("Image format is not allowed!"), false);
  };
  const file = multer({ fileFilter, storage });
  return file;
};

export const multerMiddleWareHost = ({
  extensions = allowedExtensions.image,
}) => {
  const storage = multer.diskStorage({});
  // fileFilter
  const fileFilter = (req, file, cb) => {
    if (extensions.includes(file.mimetype.split("/")[1])) {
      return cb(null, true);
    }
    cb(new Error("Image format is not allowed!"), false);
  };
  const file = multer({ fileFilter, storage });
  return file;
};


