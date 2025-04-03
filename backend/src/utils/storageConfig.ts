import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  region: "tor1",
  endpoint: process.env.SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY || "",
    secretAccessKey: process.env.SPACES_SECRET_KEY || "",
  },
});

const bucketName = process.env.BUCKET_NAME as string;

export const storage = multerS3({
  s3: s3,
  bucket: bucketName,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const userId = (req as unknown as Request & { user: { userId: number } })
      .user?.userId;
    const subDir =
      file.fieldname === "bannerimage" ? "banners" : "profilePictures";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.originalname.replace(/\s/g, "_");

    cb(
      null,
      `assets/images/user_${userId}/${subDir}/${uniqueSuffix}-${sanitizedFilename}`
    );
  },
});

export const upload = multer({ storage });
