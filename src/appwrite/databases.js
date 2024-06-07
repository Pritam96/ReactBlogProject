import config from "../config/config";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabasesService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const document = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        { title, slug, content, featuredImage, status, userId }
      );
      return document;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId, { title, content, featuredImage, status }) {
    try {
      const document = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId,
        { title, content, featuredImage, status }
      );
      return document;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const document = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId) {
    try {
      const document = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
      return document;
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const document = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return document;
    } catch (error) {
      throw error;
    }
  }
}

export const databasesService = new DatabasesService();

export default DatabasesService;
