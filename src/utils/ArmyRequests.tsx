import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllArmies = async (count: number): Promise<any | false> => {
  const cachedArmyList = sessionStorage.getItem("army-list");
  if (cachedArmyList) {
    return JSON.parse(cachedArmyList);
  } else {
    try {
      const { data } = await axios.get(`${baseURL}/armies/all`);

      sessionStorage.setItem("army-list", JSON.stringify(data));

      return data;
    } catch (error) {
      count--;
      if (count > 0) {
        return getAllArmies(count);
      }
      console.error(error);
      return false;
    }
  }
};

const getAllUserArmies = async (id: string) => {
  const { data } = await axios.get(`${baseURL}/armies/all/${id}`);
  return data;
};

const addArmyRequest = async (token: string, requestBody: any) => {
  try {
    const { data } = await axios.post(`${baseURL}/armies/create`, requestBody, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getOneArmy = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/armies/army/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getBattleCount = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/battles/${id}/completed/count`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data.count;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getWinPercent = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/battles/${id}/win/percent`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data.percent;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getArmyRank = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/rankings/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateArmyCombatants = async (
  requestBody: any,
  battleID: any,
  token: string
) => {
  try {
    await axios.patch(
      `${baseURL}/battles/${battleID}/edit/combatants`,
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

const getArmyNemesis = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/armies/${id}/nemesis`);

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const getArmyAlly = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/armies/${id}/ally`);

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  getAllArmies,
  updateArmyCombatants,
  addArmyRequest,
  getOneArmy,
  getBattleCount,
  getWinPercent,
  getArmyRank,
  getArmyNemesis,
  getArmyAlly,
  getAllUserArmies,
};
