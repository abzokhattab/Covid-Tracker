import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

export async function updateUser(data, token) {
  let config = {
    method: "patch",
    url: `${REACT_APP_SERVER_URL}/api/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios(config);
  return response.data;
}
