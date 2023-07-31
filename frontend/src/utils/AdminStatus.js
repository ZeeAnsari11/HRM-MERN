import { setIsAdmin } from "../states/reducers/slices/backend/UserSlice"

export const ConfigureAdminStatus = (userRole, dispatcher) => {
    if (userRole === 'admin') dispatcher(setIsAdmin(true))
    else dispatcher(setIsAdmin(false))
}