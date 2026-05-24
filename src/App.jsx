import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "./Component/Loader/Loader";
import routeConfig from "./routes.jsx";
import ProtectedRoute from "./ProtectedRoute";
import usePageTitle from "./hooks/usePageTitle";

function App() {
  usePageTitle();
  const loading = useSelector((state) => state.loader.loading);

  return (
    <>
      <div className="app">
        <ToastContainer />
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="home" replace />} />
            {routeConfig.map(({ path, element, auth }) => (
              <Route
                key={path}
                path={path}
                element={auth ? <ProtectedRoute>{element}</ProtectedRoute> : element}
              />
            ))}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
