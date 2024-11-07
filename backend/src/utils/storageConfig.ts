import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?.userId;

    const userBasePath = path.join(
      __dirname,
      "../../public/assets/images",
      `user_${userId}`
    );

    const subDir =
      file.fieldname === "bannerimage" ? "banners" : "profilePictures";

    const fullPath = path.join(userBasePath, subDir);

    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.originalname.replace(/\s/g, "_");
    cb(null, `${uniqueSuffix}-${sanitizedFilename}`);
  },
});

export const upload = multer({ storage });
