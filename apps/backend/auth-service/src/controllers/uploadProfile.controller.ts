import {
  Controller,
  Post,
  Route,
  Tags,
  UploadedFile,
  Delete,
  Get,
  Path,
} from "tsoa";
import { Express } from "express";
import { listImages, deleteImage } from "../services/uploadProfile.service";
import configs from "../config";

@Route("/v1/auth")
@Tags("UploadProfile")
export class UploadProfileController extends Controller {
  /**
   * Upload a profile image
   * @param file Profile image file to upload
   * @returns The URL of the uploaded file
   */
  @Post("/upload")
  public async uploadProfile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<string> {
    if (!file) {
      throw new Error("No file uploaded or invalid file type.");
    }

    // Assuming multer-s3 adds the 'location' property
    const location = (file as any).location;
    if (!location) {
      throw new Error("File upload failed, location not found.");
    }

    return `Successfully uploaded ${file.originalname} at ${location}`;
  }

  /**
   * Get the URL of a profile image
   * @param imageName Name of the image to retrieve
   * @returns Image URL
   */
  @Get("/image/:imageName")
  public async getImage(@Path() imageName: string): Promise<string> {
    const imageUrl = `https://${configs.awsS3BucketName}.s3.${configs.awsCognitoRegion}.amazonaws.com/${imageName}`;
    return imageUrl;
  }

  /**
   * List all images in the S3 bucket
   * @returns List of image URLs
   */
  @Get("/images")
  public async listAllImages(): Promise<string[]> {
    const images = await listImages();
    return images.map(
      (image) =>
        `https://${configs.awsS3BucketName}.s3.${configs.awsCognitoRegion}.amazonaws.com/${image}`
    );
  }

  /**
   * Delete a profile image
   * @param imageName Name of the image to delete
   * @returns Success message
   */
  @Delete("/image/:imageName")
  public async deleteProfileImage(@Path() imageName: string): Promise<string> {
    try {
      const result = await deleteImage(imageName);
      return result;
    } catch (error: any) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }
}
