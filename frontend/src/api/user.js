import {
  authentication,
  getOrganization,
  organizationRoutes,
  timeSlots,
  userChart,
  userLeave,
  userRoutes,
} from "./configuration";
import {
  setAllUsers,
  setAuth,
  setCurrentUser,
  setFinalAuthority,
  setIsAdmin,
  setProfileCompletion,
  setTimeSLots,
  setUserById,
  setUserChart,
  setUserGrades,
  setUserLeaveDetails,
} from "../states/reducers/slices/backend/UserSlice";

import axios from "axios";
import { getAllTheme } from "./theme";
import { getAllUsers } from "./configuration";
import { setEmploymentTypes } from "../states/reducers/slices/backend/EmploymentType";
import { setOrganizationDesignation } from "../states/reducers/slices/backend/Designation";
import { setUserBranch } from "../states/reducers/slices/backend/Branch";
import { setUserDepartment } from "../states/reducers/slices/backend/Department";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const loginAuth = (dispatcher, body, navigation, toast, setLoading) => {
  axios
    .post(authentication.login, body)
    .then((auth) => {
      dispatcher(setAuth(auth.data));
      localStorage.setItem("currentUser", auth.data.user._id);
      localStorage.setItem("organization", auth.data.user.organization);
      localStorage.setItem("authToken", auth.data.token);
      getCurrentUser(dispatcher, null);
      navigation("/dashboard/home");
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
    })
    .finally(() => {
      setLoading(false);
    });
};

export const logout = (dispatcher, navigation) => {
  axios
    .get(authentication.logout)
    .then(() => {
      dispatcher(setAuth({ token: null, user: { _id: null } }));
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("selectedMenuItem");
      localStorage.removeItem("selectedMenuChildItem");
      navigation("/");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

export const getCurrentUser = (dispatcher, setLoaded = null) => {
  const userId = localStorage.getItem("currentUser");
  if (userId)
    axios
      .get(userRoutes.getUserById + userId)
      .then((user) => {
        dispatcher(setCurrentUser(user.data.user));
        if (user.data.user.skills.length > 0)
          dispatcher(setProfileCompletion(10));
        if (user.data.user.phoneNumber) dispatcher(setProfileCompletion(5));
        if (user.data.user.personalEmail) dispatcher(setProfileCompletion(5));
        if (user.data.user.profile) dispatcher(setProfileCompletion(10));
        if (user.data.user.nic?.number) dispatcher(setProfileCompletion(5));
        if (user.data.user.drivingLinsence?.number)
          dispatcher(setProfileCompletion(5));
        if (user.data.user.roleType === "admin") {
          dispatcher(setIsAdmin(true));
        }
        getAllTheme(user.data.user.organization._id, dispatcher, setLoaded);
      })
      .catch(() => {
        dispatcher(setCurrentUser({}));
        localStorage.removeItem("currentUser");
        localStorage.removeItem("authToken");
      });
};

export const loadAllOrganizationsInfo = (dispatcher, orgId, branchId) => {
  axios
    .get(getOrganization.grades + orgId)
    .then((rsp) => {
      dispatcher(setUserGrades(rsp.data.grades));
    })
    .catch((e) => console.log(e));
  axios
    .get(organizationRoutes.getEmployementTypesByOrgId + orgId)
    .then((rsp) => {
      dispatcher(setEmploymentTypes(rsp.data.response));
    })
    .catch((e) => console.log(e));
  axios
    .get(organizationRoutes.getBranchesByOrgId + orgId)
    .then((rsp) => {
      dispatcher(setUserBranch(rsp.data.branches));
    })
    .catch((e) => console.log(e));
  axios
    .get(organizationRoutes.getDepartmentsByOrgId + orgId)
    .then((rsp) => {
      dispatcher(setUserDepartment(rsp.data.departments));
    })
    .catch((e) => console.log(e));
  axios
    .get(organizationRoutes.getDesignationsByOrgId + orgId)
    .then((rsp) => {
      dispatcher(setOrganizationDesignation(rsp.data.response));
    })
    .catch((e) => console.log(e));
  axios
    .post(organizationRoutes.getUsersByFilter, {
      organization: orgId,
      branch: branchId,
      isLineManager: true,
      isActive: true,
    })
    .then((rsp) => {
      dispatcher(setFinalAuthority(rsp.data.active_users));
    })
    .catch((e) => console.log(e));
  axios
    .get(timeSlots.getTimeSlotsByOrganization + orgId)
    .then((response) => dispatcher(setTimeSLots(response.data.response)))
    .catch((e) => console.log(e));
};

export const createUser = (data, setLoader) => {
  let nm = new FormData();
  Object.keys(data).forEach((key) => {
    nm.append(key, data[key]);
  });

  console.log("DATA", nm);
  axios
    .post(userRoutes.createUser, data)
    .then(() => {
      toastMessage("success", "User Created Succefully", toast);
      setTimeout(() => {
        window.location.href = "/dashboard/view-employees";
      }, 2000);
    })
    .catch((error) => {
      toastMessage("error", error.response.data.Message, toast);
    })
    .finally(() => {
      setLoader(false);
    });
};

export const getAllUsersByOrganization = (
  organizationId,
  dispatcher,
  trigger = null
) => {
  axios
    .get(getAllUsers.byOrganization + organizationId)
    .then((response) => {
      dispatcher(
        setAllUsers(
          response.data.users.filter((user) => {
            if (user.firstUser === false) return user;
          })
        )
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() =>{
      if(trigger !== null){
          trigger()
      }
  })
};

export const updateUserById = (userId, data, trigger) => {
  console.log("Update User");
  axios
    .put(userRoutes.updateById + userId, data)
    .then((response) => {
      toastMessage("success", response.data.Message, toast);
      setTimeout(() => {
        //window.location.href = "/dashboard/profile";
      }, 2000);
    })
    .catch((error) => {
      toastMessage("error", error.response.data.Message, toast);
    })
    .finally(() => {
      trigger();
    });
};

export const getUserLeaveDetails = (userId, dispatch) => {
  axios
    .get(userLeave.details + userId)
    .then((response) => {
      dispatch(setUserLeaveDetails(response.data.result.leaveTypeDetails));
    })
    .catch((error) => {
      // console.log(error)
    });
};

export const getUserChart = (id, dispatcher) => {
  console.log("form", id);
  axios
    .get(userChart.details + id)
    .then((response) => {
      dispatcher(setUserChart(response.data.childs));
    })
    .catch((error) => {});
};

export const getUserById = (id, dispatcher, setLoader) => {
  axios
    .get(userRoutes.getUserById + id)
    .then((response) => {
      dispatcher(setUserById(response.data.user));
    })
    .catch((error) => {})
    .finally(() => {
      setLoader(false);
    });
};
