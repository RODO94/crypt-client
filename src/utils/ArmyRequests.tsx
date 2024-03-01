import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllArmies = async () => {
  const { data } = await axios.get(`${baseURL}/armies/all`);
  return data;
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

export { getAllArmies, updateArmyCombatants };
