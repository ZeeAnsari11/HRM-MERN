import { AddressReducer } from "./slices/backend/Address";
import { AssetsReducer } from "./slices/backend/Assets";
import { BankReducer } from "./slices/backend/Bank";
import { BranchReducer } from "./slices/backend/Branch";
import { CertificationReducer } from "./slices/backend/Certificates";
import { DepartmentReducer } from "./slices/backend/Department";
import { DesignationReducer } from "./slices/backend/Designation";
import { EmploymentTypeReducer } from "./slices/backend/EmploymentType";
import { ExperiencesReducer } from "./slices/backend/Experiences";
import { LeaveRequestReducer } from "./slices/backend/LeaveRequest";
import { LoanReducer } from "./slices/backend/Loan";
import { NavbarReducer } from "./slices/frontend/Navbar";
import { QualificationReducer } from "./slices/backend/QualificationSlice";
import { RelativeReducer } from "./slices/backend/RelativesSlice";
import { SalaryReducer } from "./slices/backend/SalarySlice";
import { ToggleReducer } from "./slices/frontend/Toggle";
import { UserReducer } from "./slices/backend/UserSlice";
import { combineReducers } from "redux";

// Combining resucers in a root reducer
export const rootReducer = combineReducers({
    user: UserReducer,
    relatives: RelativeReducer,
    qualification: QualificationReducer,
    salary: SalaryReducer,
    address: AddressReducer,
    assets: AssetsReducer,
    bank: BankReducer,
    branch: BranchReducer,
    certification: CertificationReducer,
    department: DepartmentReducer,
    designation: DesignationReducer,
    experiences: ExperiencesReducer,
    loan: LoanReducer,
    navbar: NavbarReducer,
    leaverequest: LeaveRequestReducer,
    employeeType: EmploymentTypeReducer,
    toggler: ToggleReducer
})