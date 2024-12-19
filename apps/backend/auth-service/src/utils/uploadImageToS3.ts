import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as mime from "mime-types";
import * as crypto from "crypto";
import configs from "../config";

const awsS3Region = configs.awsCognitoRegion;
const awsS3BucketName = configs.awsS3BucketName;
const awsAccessKeyId = configs.awsAccessKeyId;
const awsSecretAccessKey = configs.awsAccessKeyId;

const s3Client = new S3Client({
  region: awsS3Region,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

export const uploadImageToS3 = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    // Generate a unique filename
    const extension = mime.extension(file.type) || "jpg";
    const fileName = `${path}/${crypto.randomUUID()}.${extension}`;

    // Prepare the S3 command
    const command = new PutObjectCommand({
      Bucket: awsS3BucketName,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // Optional: Public access
    });

    // Upload the file to S3
    await s3Client.send(command);

    // Return the public URL of the uploaded file
    return `https://${awsS3BucketName}.s3.${awsS3Region}.amazonaws.com/${fileName}`;
  } catch (error: any) {
    console.error("Error uploading image to S3:", error.message || error);
    throw new Error("Failed to upload image. Please try again.");
  }
};
