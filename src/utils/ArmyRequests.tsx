import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllArmies = async () => {
  const { data } = await axios.get(`${baseURL}/armies/all`);
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

const updateArmyCombatants = async (
  requestBody: any,
  battleID: any,
  token: string
) => {
  try {
    const { data } = await axios.patch(
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

export { getAllArmies, updateArmyCombatants, addArmyRequest };
