import axios from 'axios';
import { authentication, organizationRoutes, timeSlots, userRoutes } from './configuration';
import { setAuth, setCurrentUser, setFinalAuthority, setTimeSLots, setAllUsers } from '../states/reducers/slices/backend/UserSlice';
import { setUserBranch } from '../states/reducers/slices/backend/Branch';
import { setUserDepartment } from '../states/reducers/slices/backend/Department';
import { setOrganizationDesignation } from '../states/reducers/slices/backend/Designation';
import { getAllUsers } from './configuration';

export const loginAuth = (dispatcher, body, navigation) => {
    axios.post(authentication.login, body)
        .then((auth) => {
            dispatcher(setAuth(auth.data));
            localStorage.setItem('currentUser', auth.data.user._id);
            localStorage.setItem('organization', auth.data.user.organization);
            localStorage.setItem('authToken', auth.data.token);
            getCurrentUser(auth.data.user._id, dispatcher);
            navigation('/dashboard/home');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

export const logout = (dispatcher, navigation) => {
    axios.get(authentication.logout)
        .then((auth) => {
            dispatcher(setAuth({ token: null, user: { _id: null } }));
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            navigation('/');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

export const getCurrentUser = (dispatcher, setLoaded=null) => {
    const userId = localStorage.getItem("currentUser")
    console.log(localStorage.getItem('currentUser'));
    axios.get(userRoutes.getUserById + userId)
        .then((user) => {
            dispatcher(setCurrentUser(user.data.user));
            if (setLoaded !== null) setLoaded(false);
        }).catch((error) => {
            console.log(error)
        })
}

export const loadAllOrganizationsInfo = (dispatcher, orgId, branchId) => {
    axios.get(organizationRoutes.getBranchesByOrgId + orgId).then((rsp) => { dispatcher(setUserBranch(rsp.data.branches))}).catch((e) => console.log(e))
    axios.get(organizationRoutes.getDepartmentsByOrgId + orgId).then((rsp) => { dispatcher(setUserDepartment(rsp.data.departments)) }).catch((e) => console.log(e))
    axios.get(organizationRoutes.getDesignationsByOrgId + orgId).then((rsp) => { 
        dispatcher(setOrganizationDesignation(rsp.data.response))
     }).catch((e) => console.log(e))
    axios.post(organizationRoutes.getUsersByFilter, {organization: orgId, branch:branchId, isLineManager:true, isActive: true}).then((rsp) => {
        dispatcher(setFinalAuthority(rsp.data.active_users));
    }).catch((e) => console.log(e))
    axios.get(timeSlots.getTimeSlotsByOrganization + orgId)
         .then((response) => dispatcher(setTimeSLots(response.data.response)))
         .catch((e) => console.log(e));
}

export const createUser = (data) => {
    axios.post(userRoutes.createUser, data)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getAllUsersByOrganization = (organizationId, dispatcher) => {
    axios.get(getAllUsers.byOrganization + organizationId)
        .then((response) => {
            console.log(response.data.users);
            dispatcher(setAllUsers(response.data.users));
        }).catch((error) => {
            console.log(error)
        })
}
