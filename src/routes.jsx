import React from "react";
import Home from "./Pages/Home/Home";
import Home2 from "./Pages/Home2/Home2";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import Media from "./Pages/Media/Media";
import Blogs from "./Pages/Blogs/Blogs";
import Pad_ATM from "./Pages/Pad_ATM/Pad_ATM";
import Chanel_Partner from "./Pages/Chanel_Partner/Chanel_Partner";
import { BlogDetailsPage } from "./Pages/Blogs/BlogDetailsPage";
import ParchaseDetails from "./Pages/Products/Purchase/ParchaseDetails";
import MyOrder from "./Pages/MyOrder/MyOrder";
import OrderDetail from "./Pages/MyOrder/OrderDetail";
import Orders from "./Pages/Orders/Orders";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import LoginPage from "./Pages/NewLogin/LoginPage";
import SignUp from "./Pages/NewLogin/SignUp";
import ForgotPassword from "./Pages/NewLogin/ForgotPassword";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";

const routeConfig = [
  { path: "home", element: <Home2 />, auth: false },
  { path: "home2", element: <Home /> },
  { path: "products", element: <Products /> },
  { path: "products/Parchase-Details", element: <ParchaseDetails /> },
  { path: "profile", element: <Profile />, auth: true },
  { path: "media", element: <Media /> },
  { path: "blog", element: <Blogs /> },
  { path: "blog/blog-details", element: <BlogDetailsPage /> },
  { path: "pad_atm", element: <Pad_ATM /> },
  { path: "about", element: <About /> },
  { path: "chanel_partner", element: <Chanel_Partner /> },
  { path: "contact", element: <Contact /> },
  { path: "my-order", element: <MyOrder />, auth: true },
  { path: "my-order/:id", element: <OrderDetail />, auth: true },
  { path: "orders", element: <Orders />, auth: true },
  { path: "change-password", element: <ChangePassword />, auth: true },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignUp /> },
  { path: "forget-password", element: <ForgotPassword /> },
  { path: "*", element: <NotFound /> },
];

export default routeConfig;
