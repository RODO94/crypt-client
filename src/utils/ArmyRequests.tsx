import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllArmies = async () => {
  const { data } = await axios.get(`${baseURL}/armies/all`);
  return data;
};

export { getAllArmies };
