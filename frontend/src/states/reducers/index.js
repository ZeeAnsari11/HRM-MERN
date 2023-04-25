import { combineReducers } from "redux";
import { AddressReducer } from "./slices/backend/Address";
import { AssetsReducer } from "./slices/backend/Assets";
import { BankReducer } from "./slices/backend/Bank";
import { BranchReducer } from "./slices/backend/Branch";
import { CertificatesReducer } from "./slices/backend/Certificates";
import { DepartmentReducer } from "./slices/backend/Department";
import { DesignationReducer } from "./slices/backend/Designation";
import { ExperiencesReducer } from "./slices/backend/Experiences";
import { LoanReducer } from "./slices/backend/Loan";
import { QualificationReducer } from "./slices/backend/QualificationSlice";
import { RelativeReducer } from "./slices/backend/RelativesSlice";
import { SalaryReducer } from "./slices/backend/SalarySlice";
import { UserReducer } from "./slices/backend/UserSlice";
import { LeaveRequestReducer } from "./slices/backend/LeaveRequest";
import { NavbarReducer } from "./slices/frontend/Navbar";

// Combining resucers in a root reducer
export const rootReducer = combineReducers({
    user: UserReducer,
    relatives: RelativeReducer,
    qualifications: QualificationReducer,
    salary: SalaryReducer,
    address: AddressReducer,
    assets: AssetsReducer,
    bank: BankReducer,
    branch: BranchReducer,
    certificates: CertificatesReducer,
    department: DepartmentReducer,
    designation: DesignationReducer,
    experiences: ExperiencesReducer,
    loan: LoanReducer,
    navbar: NavbarReducer,
    leaverequest: LeaveRequestReducer,
})