import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const getAllUsersNames = async () => {
  const { data } = await axios.get(`${baseURL}/users/all`);

  const userArray = data.map((user: any) => {
    return user.known_as;
  });
  return userArray;
};

const getAllUsers = async (count: number): Promise<any | false> => {
  const cachedUserList = sessionStorage.getItem("user-list");

  if (cachedUserList) {
    return JSON.parse(cachedUserList);
  } else {
    try {
      const { data } = await axios.get(`${baseURL}/users/all`);
      sessionStorage.setItem("user-list", JSON.stringify(data));
      return data;
    } catch (error) {
      count--;
      if (count > 0) {
        return getAllUsers(count);
      }
      console.error(error);
      return false;
    }
  }
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

const getUserInfo = async (
  token: string,
  count: number
): Promise<any | false> => {
  try {
    const { data } = await axios.get(`${baseURL}/users/user/info`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    count--;
    if (count > 0) {
      return getUserInfo(token, count);
    } else {
      console.error(error);
      return false;
    }
  }
};

const getArmyUser = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/one/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getNemesis = async (
  token: string,
  count: number
): Promise<any | false> => {
  const cachedUserNemesis = sessionStorage.getItem("user-nemesis");
  if (cachedUserNemesis) {
    return JSON.parse(cachedUserNemesis);
  } else {
    try {
      const { data } = await axios.get(`${baseURL}/users/nemesis`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      sessionStorage.setItem("user-nemesis", JSON.stringify(data));

      return data;
    } catch (error) {
      count--;
      if (count > 0) {
        return getNemesis(token, count);
      }
      console.error(error);
      return false;
    }
  }
};
const getAlly = async (token: string, count: number): Promise<any | false> => {
  const cachedUserAlly = sessionStorage.getItem("user-ally");
  if (cachedUserAlly) {
    return JSON.parse(cachedUserAlly);
  } else {
    try {
      const { data } = await axios.get(`${baseURL}/users/ally`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      sessionStorage.setItem("user-ally", JSON.stringify(data));
      return data;
    } catch (error) {
      count--;
      if (count > 0) {
        return getAlly(token, count);
      }
      console.error(error);
      return false;
    }
  }
};

const makeAdmin = async (id: string, token: string) => {
  try {
    const { data } = await axios.patch(`${baseURL}/users/${id}/admin`, "", {
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

const removeUser = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}/admin`, {
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
export {
  getAllUsersNames,
  getUser,
  getNemesis,
  getAlly,
  getAllUsers,
  getArmyUser,
  makeAdmin,
  removeUser,
  getUserInfo,
};
