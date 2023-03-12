import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;
export async function getUser(token) {
  let config = {
    method: "get",
    url: `${REACT_APP_SERVER_URL}/api/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response.data;
}
