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
};
