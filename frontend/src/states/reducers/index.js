import { combineReducers } from "redux";
import { AddressReducer } from "./slices/Address";
import { AssetsReducer } from "./slices/Assets";
import { BankReducer } from "./slices/Bank";
import { BranchReducer } from "./slices/Branch";
import { CertificatesReducer } from "./slices/Certificates";
import { DepartmentReducer } from "./slices/Department";
import { DesignationReducer } from "./slices/Designation";
import { ExperiencesReducer } from "./slices/Experiences";
import { LoanReducer } from "./slices/Loan";
import { QualificationReducer } from "./slices/QualificationSlice";
import { RelativeReducer } from "./slices/RelativesSlice";
import { SalaryReducer } from "./slices/SalarySlice";
import { UserReducer } from "./slices/UserSlice";

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
})