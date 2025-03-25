import axios from "axios";
import { Armies, Army, UsersArmyInfo } from "./Interfaces";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllArmies = async (count: number): Promise<Armies[] | false> => {
  try {
    const { data } = await axios.get(`${baseURL}/armies/all`);
    return data;
  } catch (error) {
    count--;
    if (count > 0) {
      return getAllArmies(count);
    }
    console.error(error);
    return false;
  }
};

const getAllUserArmies = async (id: string) => {
  const { data } = await axios.get(`${baseURL}/armies/all/${id}`);
  return data;
};

const addArmyRequest = async (
  token: string,
  requestBody: Pick<Army, "name" | "type" | "emblem" | "emblem_id">,
  count: number
): Promise<Army | false> => {
  try {
    const { data } = await axios.post(`${baseURL}/armies/create`, requestBody, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    count--;
    if (count > 0) {
      return addArmyRequest(token, requestBody, count);
    }
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

const getArmyInfo = async (
  id: string,
  count: number
): Promise<UsersArmyInfo | false> => {
  try {
    const { data } = await axios.get(`${baseURL}/armies/${id}/info`);
    return data;
  } catch (error) {
    count--;
    if (count > 0) {
      return getArmyInfo(id, count);
    }
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
  requestBody: {
    player_1: { army_id?: string }[];
    player_2: { army_id?: string }[];
  },
  battleID: string,
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

const changeArmyField = async (
  changeValue: string,
  changeType: string,
  id: string,
  token: string
) => {
  try {
    let requestBody = {};
    switch (changeType) {
      case "name":
        requestBody = { name: changeValue };
        break;
      case "type":
        requestBody = { type: changeValue };
        break;
      case "user":
        requestBody = { userId: changeValue };
        break;
      case "emblem":
        requestBody = { emblemName: changeValue };
    }

    const response = await axios.patch(
      `${baseURL}/armies/${id}/update`,
      requestBody,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
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
  getArmyInfo,
  changeArmyField,
};
