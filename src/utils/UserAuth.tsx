import axios from "axios";
import { LogInBody, SignUpBody, email, password } from "./Interfaces";

const baseURL = import.meta.env.VITE_SERVER_URL;

const loginAuthentication = async (body: LogInBody) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/login`, body);
    sessionStorage.setItem("token", data);
    return data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

const signupAuthentication = async (body: SignUpBody) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/signup`, body);

    return data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

const forgotPasswordAuthentication = async (body: email) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/forgot-password`, body);
    return data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

const resetPasswordAuthentication = async (token: string, body: password) => {
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
