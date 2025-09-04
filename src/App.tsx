import React, { useEffect, useContext } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Context } from "./context";

//Import Page
import Signup from "./pages/Signup";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import View from "./pages/View";
import Upload from "./pages/Upload";
type Props = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: Props) => {
  const { state } = useContext(Context);
  return state.auth ? children : <Navigate to="/login" replace />;
};

const OnlyNotAuth = ({ children }: Props) => {
  const { state } = useContext(Context);
  return !state.auth ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { dispatch, state } = useContext(Context);
  console.log("state.auth ", state.auth);
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: user,
            token: user.token,
          },
        });
      }
    } catch (e) {
      // Nếu dữ liệu không phải JSON hợp lệ
      console.error("Invalid user data in localStorage");
    }
  }, []);
  return (
    <>
      <Navbar auth={state.auth} />
      {/* Routing here */}
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
          path="/verify/:confirmationToken"
          element={
            <OnlyNotAuth>
              <Confirmation />
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
          path="/upload"
          element={
            <RequireAuth>
              <Upload />
            </RequireAuth>
          }
        />
        <Route
          path="/view"
          element={
            <RequireAuth>
              <View />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
