import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./ConfigRoutes";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "./screens/Dashboard";
import Error from "./screens/Error/404";
import FirstUser from "./screens/FirstUser";
import ForgotPassword from "./screens/ForgotPassword";
import Landing from "./screens/Landing";
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword";
import { getCurrentUser } from "./api/user";
import { selectIsAdmin } from "./states/reducers/slices/backend/UserSlice";

function App() {
  
  const isAdmin = useSelector(selectIsAdmin);
  const dispatcher = useDispatch();
  
  React.useEffect(() => {
    getCurrentUser(dispatcher, null);
  }, [isAdmin])
    
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/welcome" element={<FirstUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard/>}>
        {/* {(isAdmin === true) && privateRoutes()} */}
        {privateRoutes()}
        {publicRoutes()}
      </Route>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default App;