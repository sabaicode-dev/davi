import AWS from "aws-sdk";
import { createCanvas } from "canvas";
import { v4 as uuidv4 } from "uuid";
import configs from "../../config";

const awsAccessKeyId = configs.awsAccessKeyId;
const awsS3Region = configs.awsCognitoRegion;
const awsS3BucketName = configs.awsS3BucketName;
const awsSecretAccessKey = configs.awsSecretAccessKey;

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  region: awsS3Region,
});

// Function to generate a profile image
export function generateProfileImage(email: string): Buffer {
  const initials = email.slice(0, 2).toUpperCase(); // Extract initials
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Randomize background color
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#FF33A6"];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add initials to the image
  ctx.fillStyle = "#FFFFFF"; // White text
  ctx.font = "bold 80px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  return canvas.toBuffer("image/png");
}

// Function to upload image to S3
export async function uploadToS3(
  buffer: Buffer,
  email: string
): Promise<string> {
  const fileName = `profiles/${uuidv4()}_${email}.png`;
  const params = {
    Bucket: awsS3BucketName!,
    Key: fileName,
    Body: buffer,
    ContentType: "image/png",
    ACL: "public-read", // Make file public
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
}
