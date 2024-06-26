import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword";
import Skeleton from "./screens/Skeleton";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Probation from "./screens/Probation";
import Loan from "./screens/Loan";
import Leave from "./screens/Leave";
import LeavePolicy from "./screens/LeavePolicy";
import TimeSheet from "./screens/TimeSheet";
import Attendence from "./screens/Attendence";
import WorkFromHome from "./screens/WorkFromHome";
import LeaveRequest from "./screens/LeaveRequest";
import Error from "./screens/Error/404";
import FirstUser from "./screens/FirstUser";
import User from "./screens/User";
import Asset from "./screens/AddAsset";
import ManageAsset from "./screens/ManageAsset";
import ViewEmployees from "./screens/ViewEmployees";
import Roaster from "./screens/Roaster/src";
// import ChartPage from "./screens/Chart/src";
// import ChartPage from "./screens/Chart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/welcome" element={<FirstUser />}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="/dashboard/home" element={<Skeleton />}/>
        <Route path="/dashboard/employee" element={<User/>}/>
        <Route path="/dashboard/view-employees" element={<ViewEmployees/>}/>
        <Route path="/dashboard/probation" element={<Probation />}/>
        <Route path="/dashboard/roaster" element={<Roaster />}/>
        {/* <Route path="/dashboard/chart" element={<ChartPage />}/> */}
        <Route path="/dashboard/loan" element={<Loan />}/>
        <Route path="/dashboard/leaverequest" element={<LeaveRequest />}/>
        <Route path="/dashboard/leaves" element={<Leave />}/>
        <Route path="/dashboard/policy" element={<LeavePolicy />}/>
        <Route path="/dashboard/timesheet" element={<TimeSheet />}/>
        <Route path="/dashboard/attendence" element={<Attendence />}/>
        <Route path="/dashboard/wfh" element={<WorkFromHome />}/>
        <Route path="/dashboard/profile" element={<Profile />}/>
        <Route path="/dashboard/settings" element={<Settings />}/>
        <Route path="/dashboard/add-asset" element={<Asset />}/>
        <Route path="/dashboard/manage-assets" element={<ManageAsset />}/>
      </Route>
      <Route path="/*" element={<Error />}/>
    </Routes>
  );
}

export default App;
