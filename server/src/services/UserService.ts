import { User } from "../types/User";

const axios = require("axios");

const {
  MANAGEMENT_API_CLIENT,
  MANAGEMENT_API_SECRET,
  MANAGEMENT_API_AUDIENCE,
  AUTH0_DOMAIN,
} = process.env;

export class UserService {
  domain: string | undefined;
  client_id: string | undefined;
  secret: string | undefined;
  audience: string | undefined;

  constructor() {
    this.domain = AUTH0_DOMAIN;
    this.client_id = MANAGEMENT_API_CLIENT;
    this.secret = MANAGEMENT_API_SECRET;
    this.audience = MANAGEMENT_API_AUDIENCE;
  }

  async getUserInfo(token: string) {
    const url = `https://${process.env.AUTH0_DOMAIN}/userinfo`;

    let config = {
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);
    return response.data;
  }

  async updateUserInfo(userId: string, updatedUser: Partial<User>) {
    const url = `https://${this.domain}/api/v2/users/${userId}`;
    const headers = {
      Authorization: `Bearer ${await this.getManagementApiToken()}`,
      "Content-Type": "application/json",
    };
    const data = { user_metadata: updatedUser };
    const response = await axios.patch(url, data, { headers });
    return response.data;
  }

  private async getManagementApiToken() {
    const url = `https://${this.domain}/oauth/token`;
    const data = {
      grant_type: "client_credentials",
      client_id: this.client_id,
      client_secret: this.secret,
      audience: `https://${this.domain}/api/v2/`,
    };
    const response = await axios.post(url, data);
    return response.data.access_token;
  }
}
