const axios = require("axios");

const url = `https://${process.env.AUTH0_DOMAIN}/userinfo`;

export async function getUserInfo(token: String) {
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
