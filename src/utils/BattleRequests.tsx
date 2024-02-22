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

const getUsersBattles = async (token: string) => {
  const { data } = await axios.get(`${baseURL}/battles/user/upcoming`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
};

const getUsersResults = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/battles/user/completed`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error: any) {
    console.error(error);
    return [{ errorMessage: error.response }];
  }
};

export {
  getUpcomingBattlesFive,
  getUpcomingBattles,
  getCompletedBattlesFive,
  getCompletedBattles,
  getUsersBattles,
  getUsersResults,
};
