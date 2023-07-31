import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing Current User
export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    userAuthToken: null,
    teamLeads: [],
    finalAuthority: [],
    timeSlots: [],
    allUsers: [],
    grades: [],
    wfh: [],
    timeSheet: [],
    payslips: [],
    profileCompletion: 0,
    updatedWfh: {},
    updatedLeave: {},
    userLeaveDetails: [],
  },
  reducers: {
    setCurrentUser: (state, action) => {
        state.currentUser = action.payload;
        state.userEmail = action.payload.email;
    },
    setAuth: (state, action) => {
      state.userAuthToken = action.payload.token;
      state.userId = action.payload.user._id;
    },
    logout: (state, action) => {
      state.userAuthToken = null;
      state.userId = null;
    },
    setOrganization: (state, action) => {
      state.currentUser.organization = action.payload;
    },
    setTeamLeadList: (state, action) => {
      state.teamLeads = action.payload;
    },
    setFinalAuthority: (state, action) => {
      state.finalAuthority = action.payload;
    },
    setTimeSLots: (state, action) => {
      state.timeSlots = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUserGrades: (state, action) => {
      state.grades = action.payload;
    },
    setUserWFH: (state, action) => {
      state.wfh = action.payload;
    },
    setTimeSheet: (state, action) => {
      state.timeSheet = action.payload;
    },
    setPayslips: (state, action) => {
      state.payslips = action.payload;
    },
    setProfileCompletion: (state, action) => {
      state.profileCompletion = (state.profileCompletion+action.payload)%100;
    },
    setUpdatedWfh: (state, action) => {
      state.updatedWfh = action.payload;
    },
    setUpdatedLeave: (state, action) => {
      state.updatedLeave = action.payload;
    },
    setUserLeaveDetails: (state, action) => {
      state.userLeaveDetails = action.payload;
    }
  }
});

// Action Methods
export const {
  setCurrentUser, setAuth, logout,
  setOrganization, setTeamLeadList, 
  setFinalAuthority, setTimeSLots,
  setAllUsers,
  setUserGrades,
  setUserWFH,
  setTimeSheet,
  setPayslips,
  setProfileCompletion,
  setUpdatedWfh,
  setUpdatedLeave,
  setUserLeaveDetails,
} = UserSlice.actions;

// Selector Methods
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectCurrentUserOrg = (state) => state.user.currentUser.organization._id;
export const selectCurrentUserBranch = (state) => state.user.currentUser.branch._id;
export const selectAuth = (state) => state.user.userAuthToken;
export const selectUID = (state) => state.user.currentUser._id;
export const selectLeads = (state) => state.user.teamLeads;
export const selectTimeSlots = (state) => state.user.timeSlots;
export const selectFinalAuthority = (state) => state.user.finalAuthority;
export const selectOrgId = (state) => state.user.currentUser.organization._id;
export const selectUserLeaveTypes = (state) => state.user.currentUser.leaveTypeDetails
export const selectAllUsers = (state) => state.user.allUsers
export const selectPayslips = (state) => state.user.payslips

export const selectUserGrades = (state) => state.user.grades
export const selectUserWfh = (state) => state.user.wfh
export const selectTimeSheet = (state) => state.user.timeSheet
export const selectProfileCompletion = (state) => state.user.profileCompletion
export const selecteUpdatedWfh = (state) => state.user.updatedWfh
export const selecteUpdatedLeave = (state) => state.user.updatedLeave
export const selectUserLeaveDetails = (state) => state.user.userLeaveDetails

// Reducer
export const UserReducer = UserSlice.reducer;