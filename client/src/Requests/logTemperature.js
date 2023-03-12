import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

export async function logTemperature(data, token) {
  let config = {
    method: "post",
    url: `${REACT_APP_SERVER_URL}/api/temperatures`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios(config);
  return response.data;
}
