import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Home2 from "./Pages/Home2/Home2";
import Layout from "./Component/Layout/Layout";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import Media from "./Pages/Media/Media";
import Blogs from "./Pages/Blogs/Blogs";
import Pad_ATM from "./Pages/Pad_ATM/Pad_ATM";
import Chanel_Partner from "./Pages/Chanel_Partner/Chanel_Partner";
import { BlogDetailsPage } from "./Pages/Blogs/BlogDetailsPage";
import ParchaseDetails from "./Pages/Products/Purchase/ParchaseDetails";
import { ToastContainer } from "react-toastify";

// import ForgetPassword from "./Pages/LoginSign/ForgetPassword";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Orders from "./Pages/Orders/Orders";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import LoginPage from "./Pages/NewLogin/LoginPage";
import SignUp from "./Pages/NewLogin/SignUp";
import ForgotPassword from "./Pages/NewLogin/ForgotPassword";
import Profile from "./Pages/Profile/Profile";
import usePageTitle from "./hooks/usePageTitle";

function App() {
  usePageTitle();
  return (
    <>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="home2" element={<Home2 />} />
            <Route path="products" element={<Products />} />
            <Route
              path="products/Parchase-Details"
              element={<ParchaseDetails />}
            />
            <Route path="profile" element={<Profile/>}/>
            <Route path="media" element={<Media />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/blog-details" element={<BlogDetailsPage />} />
            <Route path="pad_atm" element={<Pad_ATM />} />
            <Route path="about" element={<About />} />
            <Route path="chanel_partner" element={<Chanel_Partner />} />
            <Route path="contact" element={<Contact />} />
            <Route path="my-order" element={<MyOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forget-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
