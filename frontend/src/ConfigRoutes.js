import Allowances from "./screens/Allowances";
import Asset from "./screens/AddAsset";
import AssetTypes from "./screens/AssetTypes";
import Attendence from "./screens/Attendence";
import Branches from "./screens/Branches";
import Departments from "./screens/Departments";
import Desiginations from "./screens/Desiginations";
import Leave from "./screens/Leave";
import LeavePolicy from "./screens/LeavePolicy";
import LeaveRequest from "./screens/LeaveRequest";
import LeaveType from "./screens/LeaveType";
import Loan from "./screens/Loan";
import LoanType from "./screens/LoanType";
import ManageAssets from "./screens/ManageAsset";
import Payslips from "./screens/Payslips";
import Probation from "./screens/Probation";
import Roaster from "./screens/Roaster/src";
import { Route } from "react-router-dom";
import Settings from "./screens/Settings";
import Skeleton from "./screens/Skeleton";
import TimeSheet from "./screens/TimeSheet";
import TimeSlots from "./screens/TimeSlots";
import User from "./screens/User";
import UserProfile from "./screens/Profile";
import ViewAttendenceRequests from "./screens/ViewAttendenceRequests";
import ViewEmployees from "./screens/ViewEmployees";
import ViewWorkFromHome from "./screens/WorkFromHome";
import WorkFromHomeRequest from "./screens/WorkFromHomeRequest";

export const privateRoutes = () => {
    return <>
      <Route path="/dashboard/employee" element={<User />} />
      <Route path="/dashboard/view-employees" element={<ViewEmployees />} />
      <Route path="/dashboard/add-asset" element={<Asset />} />
      <Route path="/dashboard/asset-type" element={<AssetTypes />} />
      <Route path="/dashboard/desiginations" element={<Desiginations />} />
      <Route path="/dashboard/departments" element={<Departments />} />
      <Route path="/dashboard/branches" element={<Branches />} />
      <Route path="/dashboard/timeSlots" element={<TimeSlots />} />
      <Route path="/dashboard/allowances" element={<Allowances />} />
      <Route path="/dashboard/loan-type" element={<LoanType />} />
      <Route path="/dashboard/payslips" element={<Payslips />} />
      <Route path="/dashboard/manage-assets" element={<ManageAssets />} />
      <Route path="/dashboard/leave-type" element={<LeaveType />} />

    </>
  }
  
export const publicRoutes = () => {
    return <>
        <Route path="/dashboard/home" element={<Skeleton />} />
        <Route path="/dashboard/probation" element={<Probation />} />
        <Route path="/dashboard/roaster" element={<Roaster />} />
        {/* <Route path="/dashboard/chart" element={<ChartPage />}/> */}
        <Route path="/dashboard/loan" element={<Loan />} />
        <Route path="/dashboard/leaverequest" element={<LeaveRequest />} />
        <Route path="/dashboard/leaves" element={<Leave />} />
        <Route path="/dashboard/policy" element={<LeavePolicy />} />
        <Route path="/dashboard/timesheet" element={<TimeSheet />} />
        <Route path="/dashboard/attendence-request" element={<Attendence />} />
        <Route path="/dashboard/attendence" element={<ViewAttendenceRequests />} />
        <Route path="/dashboard/wfh" element={<WorkFromHomeRequest />} />
        <Route path="/dashboard/view-wfh" element={< ViewWorkFromHome />} />
        <Route path="/dashboard/profile" element={<UserProfile />} />
        <Route path="/dashboard/settings" element={<Settings />} />
    </>
}
