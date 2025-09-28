import React from "react";
import "./App.css";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
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

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="home" />} />
            <Route index path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/Parchase-Details" element={<ParchaseDetails />} />
            <Route path="media" element={<Media />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/blog-details" element={<BlogDetailsPage />} />
            <Route path="pad_atm" element={<Pad_ATM />} />
            <Route path="about" element={<About />} />
            <Route path="chanel_partner" element={<Chanel_Partner />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
