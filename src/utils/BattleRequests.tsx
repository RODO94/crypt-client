import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getUpcomingBattlesFive = async () => {
  const { data } = await axios.get(`${baseURL}/battles/upcoming/5`);
  return data;
};

const getCompletedBattlesFive = async () => {
  const { data } = await axios.get(`${baseURL}/battles/completed/5`);
  return data;
};

const getUpcomingBattles = async () => {
  const { data } = await axios.get(`${baseURL}/battles/upcoming`);
  return data;
};

const getCompletedBattles = async () => {
  const { data } = await axios.get(`${baseURL}/battles/completed`);
  return data;
};

export {
  getUpcomingBattlesFive,
  getUpcomingBattles,
  getCompletedBattlesFive,
  getCompletedBattles,
};
