import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllUsersNames = async () => {
  const { data } = await axios.get(`${baseURL}/users/all`);

  const userArray = data.map((user: any) => {
    return user.known_as;
  });
  return userArray;
};
export { getAllUsersNames };
