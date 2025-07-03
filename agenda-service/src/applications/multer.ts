import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "..", "public", "images"));
  },
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(16).toString("hex");

    callback(null, `${timestamp}-${randomName}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});
