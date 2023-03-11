import axios from "axios";

export async function logTemperature(data, token) {
  let config = {
    method: "post",
    url: "http://localhost:3002/api/temperature",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios(config);
  return response.data;
}
