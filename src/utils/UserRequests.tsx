import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllUsersNames = async () => {
  const { data } = await axios.get(`${baseURL}/users/all`);

  const userArray = data.map((user: any) => {
    return user.known_as;
  });
  return userArray;
};

const getUser = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/one`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getNemesis = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/nemesis`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const getAlly = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/ally`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export { getAllUsersNames, getUser, getNemesis, getAlly };
