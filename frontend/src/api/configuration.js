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
    getUsersByFilter: baseUrl+'/user/filter-user/organization/',
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
    getAssetType: baseUrl+'/asset-type/organization/'
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
    byId: baseUrl+'/asset/'
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