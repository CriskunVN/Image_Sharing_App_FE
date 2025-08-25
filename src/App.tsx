import React, { useEffect, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Context } from "./context";

import Signup from "./pages/Signup";
import Confirmation from "./pages/Confirmation";

const App = () => {
  // const { state, dispatch } = useContext(Context);

  useEffect(() => {}, []);
  return (
    <>
      <Navbar auth={false} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:confirmationToken" element={<Confirmation />} />
      </Routes>
    </>
  );
};

export default App;
