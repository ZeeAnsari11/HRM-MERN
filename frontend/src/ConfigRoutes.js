import Allowances from "./screens/Allowances";
import Asset from "./screens/AddAsset";
import AssetTypes from "./screens/AssetTypes";
import Attendence from "./screens/Attendence";
import Branches from "./screens/Branches";
import Departments from "./screens/Departments";
import Desiginations from "./screens/Desiginations";
import EmployeementType from "./screens/EmployeementType";
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
      <Route path="employee" element={<User />} />
      <Route path="view-employees" element={<ViewEmployees />} />
      <Route path="add-asset" element={<Asset />} />
      <Route path="asset-type" element={<AssetTypes />} />
      <Route path="desiginations" element={<Desiginations />} />
      <Route path="departments" element={<Departments />} />
      <Route path="branches" element={<Branches />} />
      <Route path="timeSlots" element={<TimeSlots />} />
      <Route path="allowances" element={<Allowances />} />
      <Route path="loan-type" element={<LoanType />} />
      <Route path="payslips" element={<Payslips />} />
      <Route path="manage-assets" element={<ManageAssets />} />
      <Route path="leave-type" element={<LeaveType />} />
      <Route path="employeement-type" element={<EmployeementType/>} />


    </>
  }
  
export const publicRoutes = () => {
    return <>
        <Route path="home" element={<Skeleton />} />
        <Route path="probation" element={<Probation />} />
        <Route path="roaster" element={<Roaster />} />
        {/* <Route path="chart" element={<ChartPage />}/> */}
        <Route path="loan" element={<Loan />} />
        <Route path="leaverequest" element={<LeaveRequest />} />
        <Route path="leaves" element={<Leave />} />
        <Route path="policy" element={<LeavePolicy />} />
        <Route path="timesheet" element={<TimeSheet />} />
        <Route path="attendence-request" element={<Attendence />} />
        <Route path="attendence" element={<ViewAttendenceRequests />} />
        <Route path="wfh" element={<WorkFromHomeRequest />} />
        <Route path="view-wfh" element={< ViewWorkFromHome />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<Settings />} />
    </>
}
