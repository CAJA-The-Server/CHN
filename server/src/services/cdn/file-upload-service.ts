import { config } from "@config";
import {
  ImageNotFoundError,
  UnsupportedImageFormatError,
} from "@errors/service-errors";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export type FileUploadServiceOptions = {};

export class FileUploadService {
  public constructor(options?: FileUploadServiceOptions) {
    const defaultOption: FileUploadServiceOptions = {};
  }

  public async get(name: string): Promise<string> {
    try {
      const imagePath = path.resolve(config.image.path, name);
      const stat = await fs.stat(imagePath);
      if (!stat.isFile()) {
        return Promise.reject(new ImageNotFoundError());
      }
      return imagePath;
    } catch (error) {
      return Promise.reject(new ImageNotFoundError());
    }
  }

  public async post(imagePath: string): Promise<string> {
    const conf = config.image;
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const format = metadata.format;
    if (
      format === undefined ||
      !(conf.supportedFormats as string[]).includes(format)
    ) {
      return Promise.reject(new UnsupportedImageFormatError());
    }
    const processor = conf.imageProcessor;
    const { name, data: processed } = await processor(image);
    const dest = path.resolve(config.image.path, name);
    await processed.toFile(dest);
    return name;
  }
}