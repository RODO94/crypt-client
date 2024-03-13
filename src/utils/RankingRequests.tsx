import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getRankingTopFive = async () => {
  const { data } = await axios.get(`${baseURL}/rankings/top5`);
  return data;
};

const getRanking = async (battleType: string) => {
  const { data } = await axios.get(`${baseURL}/rankings/all`);

  let responseArray = [];

  battleType === "fortyk"
    ? (responseArray = data.fortyK)
    : (responseArray = data.fantasy);

  return responseArray;
};

const getUserRanking = async (token: string, battleType: string) => {
  const { data } = await axios.get(`${baseURL}/users/rankings`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  let responseArray = [];

  battleType === "fortyk"
    ? (responseArray = data.fortyK)
    : (responseArray = data.fantasy);

  return responseArray;
};

const getAllUserRanking = async (token: string) => {
  const { data } = await axios.get(`${baseURL}/users/rankings`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
export { getRankingTopFive, getRanking, getUserRanking, getAllUserRanking };
