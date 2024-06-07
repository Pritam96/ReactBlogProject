import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!userAccount) {
        throw Error("Something went wrong while register");
      }
      // If successful, call login method
      return this.login({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (!session) {
        throw Error("Something went wrong while login");
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      // console.log(user);
      if (!user) {
        throw Error("Something went wrong while getting current user");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions();
      if (!result) {
        throw Error("Something went wrong while logging out");
      }
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();

export default AuthService;
