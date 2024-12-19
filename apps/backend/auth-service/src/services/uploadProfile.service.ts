import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer from "multer";
import { Request } from "express";
import configs from "../config";

// Create S3 client
const s3 = new S3Client({
  region: configs.awsCognitoRegion,
  credentials: {
    accessKeyId: configs.awsAccessKeyId,
    secretAccessKey: configs.awsSecretAccessKey,
  },
});

// File filter to restrict file types to images only
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG, PNG, and GIF files are allowed.")
    );
  }
};

// Multer setup to store images in S3
const upload = multer({
  storage: multerS3({
    s3,
    bucket: configs.awsS3BucketName,
    key: (_req, file, cb) => cb(null, file.originalname), // Use original filename as the key
  }),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Function to list images from S3
const listImages = async () => {
  const command = new ListObjectsV2Command({ Bucket: configs.awsS3BucketName });
  const response = await s3.send(command);
  return response.Contents?.map((item) => item.Key) || [];
};

// Function to delete an image from S3
const deleteImage = async (imageName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: configs.awsS3BucketName,
    Key: imageName, // Use the image name as the key
  });

  try {
    await s3.send(command);
    return `Image ${imageName} successfully deleted`;
  } catch (error: any) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

export { upload, listImages, deleteImage };
