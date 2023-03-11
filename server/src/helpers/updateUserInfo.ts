import { User } from "../types/User";
const axios = require("axios");

const {
  MANAGEMENT_API_CLIENT,
  MANAGEMENT_API_SECRET,
  MANAGEMENT_API_AUDIENCE,
  AUTH0_DOMAIN,
} = process.env;
export async function updateUser(userId: string, data: Partial<User>) {
  const token: string = await getManagementApiToken();

  const config = {
    method: "patch",
    url: `https://${AUTH0_DOMAIN}/api/v2/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data,
  };
  const response = await axios(config);
  return response?.data;
}

async function getManagementApiToken(): Promise<string> {
  const options = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `https://${AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: {
      client_id: MANAGEMENT_API_CLIENT,
      client_secret: MANAGEMENT_API_SECRET,
      audience: MANAGEMENT_API_AUDIENCE,
      grant_type: "client_credentials",
    },
  };
  const response = await axios(options);
  return response?.data?.access_token;
}
