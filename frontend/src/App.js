import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./ConfigRoutes";
import { selectCurrentUser, selectIsAdmin } from "./states/reducers/slices/backend/UserSlice";

import Dashboard from "./screens/Dashboard";
import Error from "./screens/Error/404";
import FirstUser from "./screens/FirstUser";
import ForgotPassword from "./screens/ForgotPassword";
import Landing from "./screens/Landing";
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword";
import { useSelector } from "react-redux";

function App() {
  
  const isAdmin = useSelector(selectIsAdmin);
  const [trigger, setTrigger] = useState(false);

  const handleTrigger = () => {
    setTrigger(!trigger)
  }
  console.log("trigger")
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/welcome" element={<FirstUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard handleTrigger={handleTrigger}/>}>
        {(isAdmin === true) && privateRoutes()}
        {publicRoutes()}
      </Route>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default App;