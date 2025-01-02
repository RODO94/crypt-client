import axios from "axios";
import { LogInBody, SignUpBody, Email, Password } from "./Interfaces";
import { UserRole } from "../store/user";

const baseURL = import.meta.env.VITE_SERVER_URL;

const loginAuthentication = async (body: LogInBody) => {
  try {
    const { data }: { data: { token: string; role: UserRole } } =
      await axios.post(`${baseURL}/users/login`, body);
    sessionStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

const signupAuthentication = async (body: SignUpBody) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/register`, body);

    return data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

const forgotPasswordAuthentication = async (body: Email) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/forgot-password`, body);
    return data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

const resetPasswordAuthentication = async (token: string, body: Password) => {
  try {
    const { data } = await axios.patch(`${baseURL}/users/reset/${token}`, body);

    return data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
export {
  loginAuthentication,
  signupAuthentication,
  resetPasswordAuthentication,
  forgotPasswordAuthentication,
};
