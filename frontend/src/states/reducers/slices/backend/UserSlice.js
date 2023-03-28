import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing Current User
export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    userRole: null,
    userEmail: null,
    userAuthToken: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
        state.currentUser = action.payload;
        state.userEmail = action.payload.email;
    }
  }
});

// Action Methods
export const { setCurrentUser } = UserSlice.actions;

// Selector Methods
export const selectCurrentUser = (state) => state.user.currentUser;

// Reducer
export const UserReducer = UserSlice.reducer;