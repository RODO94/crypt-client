import axios from "axios";

const baseURL = "http://localhost:8080";

const getCompletedBattlesFive = async () => {
  const { data } = await axios.get(`${baseURL}/battles/upcoming/5`);
  return data;
};

export { getCompletedBattlesFive };
