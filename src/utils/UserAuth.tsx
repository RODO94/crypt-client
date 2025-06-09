import axios, { AxiosError } from "axios";
import { LogInBody, SignUpBody, Email, Password } from "./Interfaces";
import { UserRole } from "../store/user";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const loginAuthentication = async (body: LogInBody) => {
  try {
    const { data }: { data: { token: string; role: UserRole } } =
      await axios.post(`${baseURL}/users/login`, body);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      return error.response?.data;
    }
  }
};

export const signUpAuthentication = async (body: SignUpBody) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/register`, body);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      return error.response?.data;
    }
  }
};

export const forgotPasswordAuthentication = async (body: Email) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/forgot-password`, body);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      return error.response?.data;
    }
  }
};

export const resetPasswordAuthentication = async (
  token: string,
  body: Password
) => {
  try {
    const { data } = await axios.patch(`${baseURL}/users/reset/${token}`, body);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      return error.response?.data;
    }
  }
};
