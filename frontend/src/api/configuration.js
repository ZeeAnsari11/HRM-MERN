export const base = 'http://127.0.0.1:4000/';
const baseUrl = base+'api/v1';

export const authentication = {
    login: baseUrl+'/login',
    logout: baseUrl+'/logout',
}

export const userRoutes = {
    createUser: baseUrl+'/user/new',
    getUserById: baseUrl+'/user/',
    updateById: baseUrl+'/user/update/'
}

export const organizationRoutes = {
    getUserById: baseUrl+'/organization/',
    getBranchesByOrgId: baseUrl+'/branch/organization/',
    getDepartmentsByOrgId: baseUrl+'/departments/organization/',
    getDesignationsByOrgId: baseUrl+'/designations/organization/',
    getLeaveTypeByOrgId: baseUrl+'/leave-types/organization/',
    getShortLeaveTypeByOrgId: baseUrl+'/short-leave/organization/',
    getUsersByFilter: baseUrl+'/user/filter-user/organization',
    getEmployementTypesByOrgId: baseUrl+'/employmentType/all/',
    getTaxRulesByOrgId: baseUrl+'/taxRule/organization/',
    getGradesByOrgId: baseUrl+'/grade/organization/',
    getGradeBenefitsByOrgId: baseUrl+'/benefits/organization/',
    getLeaveRequestsByOrgId : baseUrl +'/leaves/org/',
    getWFHRequestByOrgId : baseUrl +'/wfh/org/',
    getAllM_PByOrdId : baseUrl+'/missing-punch/all/org/'

}

export const leaveRequestRoutes = {
    getLeaveTypes: baseUrl+'/leaveTypes/filter/?active=true&&active=false&&organization=',
    setUserLeave: baseUrl+'/leave-request/new'
}

export const shortLeaveRoutes = {
    getShortLeaveTypes: baseUrl+'/short-leave/organization/'
}

export const userLeaveRoute = {
    getUserLeaves: baseUrl+'/leave-request/user-leaves/',
    getUserAllowedLeaves : baseUrl+'/leaves/user/'
}

export const userLeave = {
    details: baseUrl+'/user/leave-quota/'
}

export const userChart = {
    details: baseUrl+'/user/chart/my-chart/'
}

export const leaveType = {
    getLeaveType: baseUrl+'/leaveType/'
}


export const timeSlots = {
    getTimeSlotsByOrganization: baseUrl+'/time-slot/organization/',
}

export const asset = {
    setAsset: baseUrl+'/asset/new'
}

export const assetType = {
    createAssetType : baseUrl+'/asset-type/new',
    getAssetType: baseUrl+'/asset-type/organization/',
    deleteAssetType: baseUrl+'/asset-type/',
    UpdateAssetType: baseUrl+'/asset-type/',
}

export const gradesRoute = {
    createGrades : baseUrl+'/grade/new',
    getGrades: baseUrl+'/grade/',
    deleteGrades: baseUrl+'/grade/',
    updateGrades: baseUrl+'/grade/'

}

export const allowances = {
    createAllowance : baseUrl+'/allowance/new',
    getAllowancesByOrgId: baseUrl+'/allowance/all/',
    updateAllowancesById : baseUrl + '/allowance/',
    deletAllowancesById : baseUrl + '/allowance/'
}

export const loanType = {
    createLoanType : baseUrl+'/loan-type/new',
    getAllowancesByOrgId: baseUrl+'/loan-type/organization/',
    updateLoanTypeById : baseUrl+'/loan-type/',
    deleteLoanTypeById : baseUrl+'/loan-type/'
}

export const gradeBenefits = {
    createGradeBenefit : baseUrl+'/benefits/new',
    updateGradeBenefitById : baseUrl+'/benefits/',
    deleteGradeBenefitById : baseUrl+'/benefits/'
}

export const assetManagment = {
    manageAsset: baseUrl+'/asset/management'
}

export const  allAssets = {
    getAssets: baseUrl+'/assets/organization/'
}

export const  getAllUsers = {
    byOrganization: baseUrl+'/user/organization/'
}

export const  getAssetBy = {
    id: baseUrl+'/asset/'
}


export const  getDesignation = {
    byId: baseUrl+'/designation/'
}

export const  getAsset = {
    byId: baseUrl+'/previous-holders/asset/'
}

export const  createLoanRequest = {
    create: baseUrl+'/loan/new',
    getAll : baseUrl+'/loans/org/',
    getAllLoansByUser : baseUrl + '/loan/user/',
    updateLoanRequest : baseUrl + '/loan/',
    deleteLoanRequest : baseUrl + '/loan/',
    loanRepqymentSchedule: baseUrl + '/loan-repayment-schedule/'
}

export const  getUserLoan = {
    byId: baseUrl+'/loan/user/'
}

export const  getLoanTypeBy = {
    organization: baseUrl+'/loan-type/organization/'
}

export const missingPunchesRoute = {
    setUserMissingPunchesRquest: baseUrl+'/missing-punch/new',
    getMissingPunchesHistoryByUserId : baseUrl+'/missing-punch/user/filter'
}

export const desiginationsRoute = {
    createDesigination: baseUrl+'/designation/new',
    getMissingPunchesHistoryByUserId : baseUrl+'/missing-punch/user/filter',
    deleteDesiginationById : baseUrl +'/designation/',
    updateDesiginationById : baseUrl +'/designation/',
}

export const departmentRoute = {
    createDepartment : baseUrl+'/new/department',
    updateDepartmentById : baseUrl+'/department/',
    deleteDepartmentById : baseUrl+'/department/'
}

export const  getOrganization = {
    grades: baseUrl+'/grade/organization/'
}

export const  createWfh = {
    request: baseUrl+'/wfh/new'
}

export const  getAllWfh = {
    ofUser: baseUrl+'/wfh/user/'
}

export const  getTime = {
    sheet: baseUrl+'/filter-attendence'
}
export const  deleteRequest = {
    wfh: baseUrl+'/wfh/delete/'
}

export const  deleteLeave = {
    request: baseUrl+'/leave-request/delete/'
}

export const  updateWfh = {
    request: baseUrl+'/wfh/update/'
}

export const  updateLeave = {
    request: baseUrl+'/leave-request/update/'
}

export const branchRoute = {
    createBranch : baseUrl+'/branch/new',
    updateBranchById :baseUrl + '/branch/',
    deleteBranchById : baseUrl +'/branch/'
}

export const taxRuleRoute = {
    createTaxRule : baseUrl+'/taxRule/new/',
    updateTaxRuleById :baseUrl + '/taxRule/',
    deleteTaxRuleById : baseUrl +'/taxRule/'
}

export const employeementTypeRoute = {
    createEmployeementType : baseUrl+'/employmentType/new',
    updateEmployeementType :baseUrl + '/employmentType/',
    deleteEmployeementType : baseUrl +'/employmentType/'
}

export const leaveTypeRoute = {
    updateLeaveTypeById :baseUrl + '/leaveType/',
    createLeaveType : baseUrl +'/leaveType/new'
}

export const shortLeaveTypeRoute = {
    createShortLeaveType : baseUrl +'/short-leave/new',
    updatShorteLeaveTypeById :baseUrl + '/short-leave/update/',
}

export const timeSlotsRoute = {
    createTimeSlot: baseUrl+'/time-slot/new',
    getTimeSlotsByOrgId : baseUrl+'/time-slot/organization/',
    updateTimeSlotById : baseUrl+'/time-slot/',
    deleteTimeSlotById : baseUrl+'/time-slot/',
}

export const  paySlips = {
    ofUser: baseUrl+'/paySlip/user/',
    ofOrganizarion: baseUrl+'/paySlip/organization/',
    generate: baseUrl+'/paySlip/new/'
}

export const relatives = {
    createRelative: baseUrl+'/relative/new',
    getRealtives: baseUrl+'/relatives/user/',
    updateRelative: baseUrl+'/relative/',
    deleteRelative: baseUrl+'/relative/'
}

export const experiences = {
    createExperience: baseUrl+'/experience/new',
    getExperience: baseUrl+'/experience/user/',
    updateExperience: baseUrl+'/experience/',
    deleteExperience: baseUrl+'/experience/'
}

export const certification = {
    createCertification: baseUrl+'/certificate/new',
    getCertifications: baseUrl+'/certificate/user/',
    updateCertification: baseUrl+'/certificate/',
    deleteCertification: baseUrl+'/certificate/'
}

export const qualification = {
    createQualification: baseUrl+'/qualification/new',
    getQualifications: baseUrl+'/qualification/user/',
    updateQualification: baseUrl+'/qualification/',
    deleteQualification: baseUrl+'/qualification/'
}

export const organization = {
    createOrganization: baseUrl+'/organization/new'
}

export const theme = {
    createTheme: baseUrl+'/theme/new',
    updateTheme: baseUrl+'/theme/org/',
    getTheme: baseUrl+'/theme/org/'
}

export const attendence = {
    checkIO: baseUrl+'/attendence/new',
    delete: baseUrl+'/missing-punch/',
    update: baseUrl+ '/missing-punch/'
}

export const requestType = {
    all: baseUrl+'/request-type/all/',
    create: baseUrl+'/request-type/create',
    update: baseUrl+'/request-type/update/'
}

export const requestFlow = {
    create: baseUrl+'/request-flow/create',
    all: baseUrl+'/request-flow/all-org/',    
}

export const requestFlowNode = {
    create: baseUrl+'/request-flow/create-node/',
    all: baseUrl+'/request-flow/all/nodes/'  ,
    deleteNode :   (flowId, nodeId)=>{
        return `${baseUrl}/request-flow/${flowId}/nodes/${nodeId}`
    }
}