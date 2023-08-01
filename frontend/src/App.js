<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./ConfigRoutes";
import { selectCurrentUser, selectIsAdmin } from "./states/reducers/slices/backend/UserSlice";

import Dashboard from "./screens/Dashboard";
import Error from "./screens/Error/404";
import FirstUser from "./screens/FirstUser";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword";
import { useSelector } from "react-redux";
=======
import { Route, Routes } from "react-router-dom";

import Allowances from "./screens/Allowances";
import Asset from "./screens/AddAsset";
import AssetTypes from "./screens/AssetTypes";
import Attendence from "./screens/Attendence";
import Branches from "./screens/Branches";
import Dashboard from "./screens/Dashboard";
import Departments from "./screens/Departments";
import Desiginations from "./screens/Desiginations";
import Error from "./screens/Error/404";
import FirstUser from "./screens/FirstUser";
import ForgotPassword from "./screens/ForgotPassword";
import Leave from "./screens/Leave";
import LeavePolicy from "./screens/LeavePolicy";
import LeaveRequest from "./screens/LeaveRequest";
import LeaveType from "./screens/LeaveType";
import Loan from "./screens/Loan";
import LoanType from "./screens/LoanType";
import Login from "./screens/Login"
import ManageAsset from "./screens/ManageAsset";
import Payslips from "./screens/Payslips";
import Probation from "./screens/Probation";
import Profile from "./screens/Profile";
import React from "react";
import ResetPassword from "./screens/ResetPassword";
import Roaster from "./screens/Roaster/src";
import Settings from "./screens/Settings";
import Skeleton from "./screens/Skeleton";
import TimeSheet from "./screens/TimeSheet";
import TimeSlots from "./screens/TimeSlots";
import User from "./screens/User";
import ViewAttendenceRequests from "./screens/ViewAttendenceRequests";
import ViewEmployees from "./screens/ViewEmployees";
import ViewWorkFromHome from "./screens/WorkFromHome";
import WorkFromHomeRequest from "./screens/WorkFromHomeRequest";

// import ChartPage from "./screens/Chart/src";
// import ChartPage from "./screens/Chart";
>>>>>>> HRMD-1008

function App() {
  
  const isAdmin = useSelector(selectIsAdmin);
  const [trigger, setTrigger] = useState(false);

  const handleTrigger = () => {
    setTrigger(!trigger)
  }
  console.log("trigger")
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Login/>} />
      <Route path="/welcome" element={<FirstUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard handleTrigger={handleTrigger}/>}>
        {(isAdmin === true) && privateRoutes()}
        {publicRoutes()}
=======
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
        <Route path="/dashboard/attendence-request" element={<Attendence />}/>
        <Route path="/dashboard/attendence" element={<ViewAttendenceRequests />}/>
        <Route path="/dashboard/wfh" element={<WorkFromHomeRequest />}/>
        <Route path="/dashboard/view-wfh" element={< ViewWorkFromHome/>}/>
        <Route path="/dashboard/profile" element={<Profile />}/>
        <Route path="/dashboard/settings" element={<Settings />}/>
        <Route path="/dashboard/add-asset" element={<Asset />}/>
        <Route path="/dashboard/asset-type" element={<AssetTypes />}/>
        <Route path="/dashboard/desiginations" element={<Desiginations />}/>
        <Route path="/dashboard/departments" element={<Departments />}/>
        <Route path="/dashboard/branches" element={<Branches />}/>
        <Route path="/dashboard/timeSlots" element={<TimeSlots />}/>
        <Route path="/dashboard/allowances" element={<Allowances />}/>
        <Route path="/dashboard/loan-type" element={<LoanType />}/>
        <Route path="/dashboard/payslips" element={<Payslips />}/>
        <Route path="/dashboard/Desiginations" element={<Desiginations />}/>
        <Route path="/dashboard/manage-assets" element={<ManageAsset />}/>
        <Route path="/dashboard/leave-type" element={<LeaveType />}/>

>>>>>>> HRMD-1008
      </Route>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}
export default App;
