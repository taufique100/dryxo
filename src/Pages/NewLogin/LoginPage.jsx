import React, { useState } from "react";
import "./LoginPage.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import loginImage from "../../assets/NewLoginPage/image.jpg";
import LoginLogo from "../../assets/NewLoginPage/logo.png";
import axios from "axios";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify, successNotify } from "../../Utils/toastNotify";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../Component/hooks/useLocalStorage";


const LoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const {setItem, getItem} = useLocalStorage();


  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [panel, setPanel] = useState("login");
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);

    const token = response?.credential;
    if (!token) {
      setLoading(false);
      errorNotify("Google login failed. Please try again.");
      return;
    }

    try {
      const res = await axios.post(apiUrls.googleLogin, { token });
      // localStorage.setItem("userToken", res?.data?.tokens?.access?.token);
      // localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
      setItem("userToken", res?.data?.tokens?.access?.token)
      setItem("userInfo", JSON.stringify(res?.data?.user))
      successNotify("Login successfully.");
      // navigate("/home");
    } catch (err) {
      console.error("Google login error", err);
      errorNotify(
        err?.response?.data?.message || "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleCredentialResponse,
    onError: () => {
      setLoading(false);
      errorNotify("Google login failed. Please try again.");
    },
    flow: "implicit",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginPayload = {
      email: credentials.username,
      password: credentials.password,
    };
    await axios
      .post(apiUrls.login, loginPayload)
      .then((res) => {
        console.log("loginRes::", res?.data);

        // localStorage.setItem("userToken", res?.data?.tokens?.access?.token);
        // localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
        setItem("userToken", res?.data?.tokens?.access?.token)
        setItem("userInfo", JSON.stringify(res?.data?.user))

        successNotify("Login successfully.");
        navigate("/home");
      })
      .catch((er) => {
        console.log(er);
        errorNotify("Something went wrong");
      })
      .finally(() => {
        console.log("finally");
        setLoading(false);
      });

    // setTimeout(() => {
    //   setLoading(false);
    //   console.log("Login submitted (UI-only):", credentials);
    // }, 700);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      <div className="login_wrapper">
        <div className="ldpl_login_main">
          <div>
            {panel === "forgot" ? (
              <ForgotPassword onCancel={() => setPanel("login")} />
            ) : panel === "signup" ? (
              <SignUp onCancel={() => setPanel("login")} />
            ) : (
              <>
                <div className="login_form_section">
                  <div className="login_form">
                    <div className="form_container">
                      <a href="#" className="login_logo_link">
                        <img
                          src={LoginLogo}
                          alt="Logo"
                          className="login_logo"
                        />
                      </a>

                      <h3 className="login_heading">Welcome back!</h3>

                      <form onSubmit={handleSubmit}>
                        <div className="form_group">
                          <label htmlFor="username" className="form_label">
                            Username <span className="text_danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            className="form_control"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {/* <div className="form_group mt-2">
                    <label htmlFor="password" className="form_label">
                      OTP 
                    </label>
                    <OTPInput numInputs={6}/>
                  </div> */}

                        <div className="form_group">
                          <label htmlFor="password" className="form_label">
                            Password <span className="text_danger">*</span>
                          </label>
                          <div className="position_relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              className="form_control"
                              placeholder="Enter your password"
                              value={credentials.password}
                              onChange={handleChange}
                              required
                            />
                            <button
                              type="button"
                              className="toggle_password"
                              onClick={togglePassword}
                            >
                              {showPassword ? (
                                <FiEye className="password_icon" />
                              ) : (
                                <FiEyeOff className="password_icon" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="form_footer">
                          <div className="remember_me">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              className="form_check_input"
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                          </div>
                          <a
                            href="#"
                            className="forgot_link"
                            onClick={() => setPanel("forgot")}
                          >
                            Forgot password?
                          </a>
                        </div>

                        <button
                          type="submit"
                          className="btn_primary"
                          id="ldpl_login_button"
                          disabled={loading}
                        >
                          {loading ? "Signing in..." : "Login"}
                        </button>
                      </form>

                      {/* Remember me + Forgot password */}
                      <div className="social_login_wrap mt-3">
                        <button
                          type="button"
                          className="btn_social btn_google"
                          onClick={() => loginWithGoogle()}
                          disabled={loading}
                        >
                          <FcGoogle className="btn_social_icon" />
                          Continue with Google
                        </button>

                        {/* <div className="social_separator">
                          <span>or use your email</span>
                        </div> */}
                      </div>

                      <p className="signup_text ">
                        Don’t have an account?{" "}
                        <a
                          href="#"
                          className="signup_link"
                          onClick={() => setPanel("signup")}
                        >
                          Sign up here
                        </a>
                      </p>
                    </div>
                  </div>
                  <footer className="d-block d-md-none mt-5">

                  </footer>
                </div>

                <div className="banner_section">
                  <img src={loginImage} alt="loginImage" />
                </div>
              </>
            )}
          </div>
          {/* Powered by badge */}
          <footer className="login_powered_footer">

          </footer>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
