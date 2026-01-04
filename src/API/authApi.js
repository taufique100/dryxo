import axios from "axios";
import { apiUrls } from "../Utils/apiUrls";

export const signupUser = (data) => {
  return axios.post(apiUrls.register, data);
};

export const loginUser = (data) => {
  return axios.post(apiUrls.login, data);
};
