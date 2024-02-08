import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getRankingTopFive = async () => {
  const { data } = await axios.get(`${baseURL}/rankings/top5`);
  return data;
};
export { getRankingTopFive };
