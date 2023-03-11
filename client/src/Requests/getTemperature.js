import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

export async function getTemperature(latitude, longitude, radius = 10000) {
  const response = await axios.get(
    `${REACT_APP_SERVER_URL}/api/temperatures?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
  );
  return response.data;
}
