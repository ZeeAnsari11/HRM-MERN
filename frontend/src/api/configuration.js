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
    getUsersByFilter: baseUrl+'/user/filterUser/organization/',
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