import axios from "axios";

axios.defaults.baseURL = "https://api.chucknorris.io";

export const getMessage = async () => {
  const { data } = await axios.get("jokes/random");
  return data.value;
};
