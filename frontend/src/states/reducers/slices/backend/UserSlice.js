import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing Current User
export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    userAuthToken: null,
    allUsers: []
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
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    }
  }
});

// Action Methods
export const { 
  setCurrentUser, setAuth, logout,
  setOrganization,
  setAllUsers,
} = UserSlice.actions;

// Selector Methods
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectAuth = (state) => state.user.userAuthToken;
export const selectUID = (state) => state.user.currentUser._id;
export const selectOrgId = (state) => state.user.currentUser.organization._id;
export const selectUserLeaveTypes = (state) => state.user.currentUser.leaveTypeDetails
export const selectAllUsers = (state) => state.user.allUsers

// Reducer
export const UserReducer = UserSlice.reducer;