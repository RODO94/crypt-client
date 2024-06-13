import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getRankingTopFive = async () => {
  const { data } = await axios.get(`${baseURL}/rankings/top5`);
  return data;
};

const getRankingsOneArmy = async (id: string) => {
  const { data } = await axios.get(`${baseURL}/rankings/${id}/all`);
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

const getAllUserRanking = async (
  token: string,
  count: number
): Promise<any | false> => {
  const cachedRankings: string | null = sessionStorage.getItem("user-rankings");
  if (cachedRankings) {
    return JSON.parse(cachedRankings);
  } else {
    try {
      const { data } = await axios.get(`${baseURL}/users/rankings`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      sessionStorage.setItem("user-rankings", JSON.stringify(data));

      return data;
    } catch (error: any) {
      count--;
      if (count > 0) {
        return getAllUserRanking(token, count);
      } else {
        console.error(error);
        return error.response.data;
      }
    }
  }
};
export {
  getRankingTopFive,
  getRanking,
  getUserRanking,
  getAllUserRanking,
  getRankingsOneArmy,
};
