import axios from "axios";


export const signupUser = (data) => {
  return axios.post("http://localhost:8000/v1/auth/register", data);
};


export const loginUser = (data) => {
  return axios.post("http://localhost:8000/v1/auth/login", data);
};

