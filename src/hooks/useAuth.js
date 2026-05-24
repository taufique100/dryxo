import { useState, useEffect } from "react";
import useLocalStorage from "../Component/hooks/useLocalStorage";
import { errorNotify, successNotify } from "../Utils/toastNotify";
import axios from "axios";
import { apiUrls } from "../Utils/apiUrls";

const useAuth = () => {
  const { getItem, setItem } = useLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = () => {
    try {
      const token = getItem("userToken");
      const user = getItem("userInfo");

      if (token && user) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(user));
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = () => {
    axios
      .post(apiUrls.logout, {
        refreshToken: getItem("userRefreshToken"),
      })
      .then(() => {
        console.log("Logged out successfully");
        successNotify("Logged out successfully");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        setIsLoggedIn(false);
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        errorNotify("Error during logout. Please try again.");
      });
  };

  return {
    isLoggedIn,
    userInfo,
    loading,
    logout,
  };
};

export default useAuth;
