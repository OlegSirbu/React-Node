/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import { Context } from "./context";

const RequireAuth = ({ children }) => {
  const { state } = useContext(Context);
  return state.auth ? children : <Navigate to="/login" replace />;
};

const OnlyNotAuth = ({ children }) => {
  const { state } = useContext(Context);
  return !state.auth ? children : <Navigate to="/" replace />;
};

const Home = () => {
  const { state } = useContext(Context);
  return <h1>Hello, ${state.user?.username || state.user?.email}!</h1>;
};

const App = () => {
  localStorage.clear();
  const { state, dispatch } = useContext(Context);
  console.log("state :>> ", state);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user)
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
          token: user?.token || "",
        },
      });
  }, []);
  return (
    <>
      <Navbar auth={state.auth} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/signup"
          element={
            <OnlyNotAuth>
              <Signup />
            </OnlyNotAuth>
          }
        />
        <Route
          path="/login"
          element={
            <OnlyNotAuth>
              <Login />
            </OnlyNotAuth>
          }
        />
        <Route
          path="/verify/:confirmationToken"
          element={
            <OnlyNotAuth>
              <Confirmation />
            </OnlyNotAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
