import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      {/* <Route path="/*" element={<Login/>}/> */}
    </Routes>
  );
}

export default App;
