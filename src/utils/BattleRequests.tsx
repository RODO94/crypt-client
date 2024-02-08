import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getCompletedBattlesFive = async () => {
  const { data } = await axios.get(`${baseURL}/battles/upcoming/5`);
  return data;
};

export { getCompletedBattlesFive };
