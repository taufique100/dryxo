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
import LoginModal from "./Component/LoginModal";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "./Store/AuthSlice";

function App() {
  usePageTitle();
  const loading = useSelector((state) => state.loader.loading);
  const showLogin = useSelector((state) => state.auth.showLoginModal);
  const dispatch = useDispatch();

  const handleLoginHide = () => dispatch(setShowLoginModal(false));
  const handleLoginSuccess = () => dispatch(setShowLoginModal(false));

  return (
    <>
      <div className="app">
        <ToastContainer />
        <LoginModal show={showLogin} onHide={handleLoginHide} onLoginSuccess={handleLoginSuccess} />
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
