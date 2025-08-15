import React from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Layout from "./Component/Layout/Layout";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="about" element={<About />} />
            <Route path="home" element={<Home />} />
            {/* <Route path="contact" element={<Contact />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
