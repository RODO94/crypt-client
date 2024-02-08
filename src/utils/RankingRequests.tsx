import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getFortyKRankingTopFive = async () => {
  const { data } = await axios.get(`${baseURL}/rankings/top5`);
  console.log(data);
  return data;
};

export { getFortyKRankingTopFive };
