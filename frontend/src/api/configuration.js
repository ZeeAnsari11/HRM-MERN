const baseUrl = 'http://127.0.0.1:4000/api/v1';

export const authentication = {
    login: baseUrl+'/login',
    logout: baseUrl+'/logout',
}

export const userRoutes = {
    createUser: baseUrl+'/user/new',
    getUserById: baseUrl+'/user/',
}

export const organizationRoutes = {
    getUserById: baseUrl+'/organization/',
    getBranchesByOrgId: baseUrl+'/branch/organization/',
    getDepartmentsByOrgId: baseUrl+'/departments/organization/',
    getDesignationsByOrgId: baseUrl+'/designations/organization/',
    getUsersByFilter: baseUrl+'/user/filter-user/organization',
    getEmployementTypesByOrgId: baseUrl+'/employmentType/all/'
}

export const leaveRequestRoutes = {
    getLeaveTypes: baseUrl+'/leaveTypes/filter/?active=true&&active=false&&organization=',
    setUserLeave: baseUrl+'/leave-request/new'
}

export const shortLeaveRoutes = {
    getShortLeaveTypes: baseUrl+'/short-leave/organization/'
}

export const userLeaveRoute = {
    getUserLeaves: baseUrl+'/leave-request/user-leaves/'
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
    getAssetType: baseUrl+'/asset-type/organization/'
}

export const allowances = {
    createAllowance : baseUrl+'/allowance/new',
    getAllowancesByOrgId: baseUrl+'/allowance/all/'
}

export const loanType = {
    createLoanType : baseUrl+'/loan-type/new',
    getAllowancesByOrgId: baseUrl+'/loan-type/organization/'
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

export const  getDesignation = {
    byId: baseUrl+'/designation/'
}

export const  getAsset = {
    byId: baseUrl+'/previous-holders/asset/'
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
    getMissingPunchesHistoryByUserId : baseUrl+'/missing-punch/user/filter'
}

export const departmentRoute = {
    createDepartment : baseUrl+'/new/department',
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

export const  updateWfh = {
    request: baseUrl+'/wfh/update/'
}

export const branchRoute = {
    createBranch : baseUrl+'/branch/new',
}

export const timeSlotsRoute = {
    createTimeSlot: baseUrl+'/time-slot/new',
    getTimeSlotsByOrgId : baseUrl+'/time-slot/organization/'
}    
export const  paySlips = {
    ofUser: baseUrl+'/paySlip/user/'

}