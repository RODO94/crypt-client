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

const getUsersBattles = async (
  token: string,
  count: number
): Promise<any | false> => {
  try {
    const { data } = await axios.get(`${baseURL}/battles/user/upcoming`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    count--;

    if (count > 0) {
      return getUsersBattles(token, count);
    } else {
      console.error(error);
      return false;
    }
  }
};

const getUsersResults = async (
  token: string,
  count: number
): Promise<any | false> => {
  const cachedUserResults = sessionStorage.getItem("user-results");

  if (cachedUserResults) {
    return JSON.parse(cachedUserResults);
  } else {
    try {
      const { data } = await axios.get(`${baseURL}/battles/user/completed`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      sessionStorage.setItem("user-results", JSON.stringify(data));

      return data;
    } catch (error: any) {
      count--;
      if (count > 0) {
        return getUsersResults(token, count);
      }
      console.error(error);
      return false;
    }
  }
};

const getOneBattle = async (battleID: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/battles/${battleID}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const updateBattleDetail = async (
  battleID: string,
  token: string,
  detail: string,
  requestBody: object
) => {
  try {
    await axios.patch(
      `${baseURL}/battles/${battleID}/edit/${detail}`,
      requestBody,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const submitBattle = async (battleID: string, token: string) => {
  try {
    await axios.post(`${baseURL}/battles/${battleID}/submit`, "", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const reSubmitBattle = async (battleID: string, token: string) => {
  try {
    await axios.post(`${baseURL}/battles/${battleID}/resubmit`, "", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createBattleRequest = async (
  token: string,
  requestBody: any,
  count: number
) => {
  try {
    const response: any = await axios.post(
      `${baseURL}/battles/create`,
      requestBody,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data.split("ID ")[1];
  } catch (error) {
    count--;
    if (count > 0) {
      createBattleRequest(token, requestBody, count);
    }
    console.error(error);
    return false;
  }
};

export {
  getUpcomingBattlesFive,
  getUpcomingBattles,
  getCompletedBattlesFive,
  getCompletedBattles,
  getUsersBattles,
  getUsersResults,
  getOneBattle,
  updateBattleDetail,
  submitBattle,
  reSubmitBattle,
  createBattleRequest,
};
