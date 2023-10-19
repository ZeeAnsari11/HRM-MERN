import { setIsAdmin } from "../states/reducers/slices/backend/UserSlice"

export const ConfigureAdminStatus = (userRole, dispatcher) => {
    if (userRole === 'admin') dispatcher(setIsAdmin(true))
    else dispatcher(setIsAdmin(false))
}

export const setHeaders = (orgId, role, key)=>{
    return {
        'role': role,
        'organization': orgId,
        'key' : key
    };
}