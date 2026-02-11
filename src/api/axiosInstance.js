import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      // window.location.href = "/login";
      console.warn("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
