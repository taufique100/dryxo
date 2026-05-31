import { useState, useEffect } from "react";
import useLocalStorage from "../Component/hooks/useLocalStorage";
import { successNotify } from "../Utils/toastNotify";
import axios from "axios";
import { apiUrls } from "../Utils/apiUrls";

const useAuth = () => {
  const { getItem } = useLocalStorage();
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
    } catch {
      setIsLoggedIn(false);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener("auth:login", checkAuthStatus);
    window.addEventListener("auth:logout", checkAuthStatus);
    return () => {
      window.removeEventListener("auth:login", checkAuthStatus);
      window.removeEventListener("auth:logout", checkAuthStatus);
    };
  }, []);

  const logout = () => {
    axios
      .post(apiUrls.logout, { refreshToken: getItem("userRefreshToken") })
      .then(() => {
        successNotify("Logged out successfully");
      })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userInfo");
        setIsLoggedIn(false);
        setUserInfo(null);
        window.dispatchEvent(new Event("auth:logout"));
      });
  };

  return {
    isLoggedIn,
    userInfo,
    loading,
    logout,
    refreshAuth: checkAuthStatus,
  };
};

export default useAuth;
