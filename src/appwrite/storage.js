import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async createFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(fileId) {
    try {
      const file = await this.storage.getFileDownload(
        config.appwriteBucketId,
        fileId
      );
      return file;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const file = await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    const file = this.storage.getFilePreview(config.appwriteBucketId, fileId);
    return file;
  }
}

export const storageService = new StorageService();

export default StorageService;
