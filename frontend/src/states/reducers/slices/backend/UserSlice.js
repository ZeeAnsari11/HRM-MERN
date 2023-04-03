import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing Current User
export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    userId: null,
    userRole: null,
    userEmail: null,
    userAuthToken: null,
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
    }
  }
});

// Action Methods
export const { setCurrentUser, setAuth, logout } = UserSlice.actions;

// Selector Methods
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectAuth = (state) => state.user.userAuthToken;
export const selectUID = (state) => state.user.userId;

// Reducer
export const UserReducer = UserSlice.reducer;