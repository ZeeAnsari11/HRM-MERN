import axios from 'axios';
import { authentication, getOrganization, organizationRoutes, timeSlots, userRoutes } from './configuration';
import { setAuth, setCurrentUser, setFinalAuthority, setTimeSLots, setAllUsers, setUserGrades, setProfileCompletion } from '../states/reducers/slices/backend/UserSlice';
import { setUserBranch } from '../states/reducers/slices/backend/Branch';
import { setUserDepartment } from '../states/reducers/slices/backend/Department';
import { setOrganizationDesignation } from '../states/reducers/slices/backend/Designation';
import { getAllUsers } from './configuration';
import { setEmploymentTypes } from '../states/reducers/slices/backend/EmploymentType';
import { toastMessage } from "../AlertConfigs";
import { toast } from 'react-toastify';

export const loginAuth = (dispatcher, body, navigation, toast, setLoading) => {
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
            toast.error(error.response.data.Message, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).finally(() => {
            setLoading(false)
        });
}

export const logout = (dispatcher, navigation) => {
    axios.get(authentication.logout)
        .then(() => {
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
    axios.get(userRoutes.getUserById + userId)
        .then((user) => {
            dispatcher(setCurrentUser(user.data.user));
            if (user.data.user.skills.length > 0)  dispatcher(setProfileCompletion(10))
            if (user.data.user.phoneNumber)  dispatcher(setProfileCompletion(5))
            if (user.data.user.personalEmail)  dispatcher(setProfileCompletion(5))
            if (user.data.user.profile)  dispatcher(setProfileCompletion(10))
            if (user.data.user.nic?.number)  dispatcher(setProfileCompletion(5))
            if (user.data.user.drivingLinsence?.number)  dispatcher(setProfileCompletion(5))
            if (setLoaded !== null) setLoaded(false);
        }).catch((error) => {
            console.log(error)
        })
}

export const loadAllOrganizationsInfo = (dispatcher, orgId, branchId) => {
    axios.get(getOrganization.grades + orgId).then((rsp) => { dispatcher(setUserGrades(rsp.data.grades))}).catch((e) => console.log(e))
    axios.get(organizationRoutes.getEmployementTypesByOrgId + orgId).then((rsp) => {console.log("sungiiiii",rsp); dispatcher(setEmploymentTypes(rsp.data.response))}).catch((e) => console.log(e))
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

export const updateUserById = (userId, data, trigger) => {
    console.log(data)
    axios.put(userRoutes.updateById+userId, data)
    .then((response) => {
        toastMessage('success', response.data.Message, toast);
        setTimeout(() => {
            window.location.href = "/dashboard/profile"
        }, 2000)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        trigger();
    })
}