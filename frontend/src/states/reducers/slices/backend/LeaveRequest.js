import { createSlice } from '@reduxjs/toolkit';

export const LeaveRequestSlice = createSlice({
  name: 'leaverequest',
  initialState: {
    formData: {},
    leaveTypes: [],
    shortLeaveTypes: [],
    userLeaves: [],
    leaveType: {}
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setLeaveTypes: (state, action) => {
      state.leaveTypes = action.payload;
    },
    setShortLeaveTypes: (state, action) => {
      state.shortLeaveTypes = action.payload;
    },
    setUserLeaves: (state, action) => {
      state.userLeaves = action.payload
    },
    setLeaveType: (state, action) => {
      state.leaveTypes = action.payload;
    },
  }
});

// Action Methods
export const { setFormData, setLeaveTypes, setShortLeaveTypes, setUserLeaves, setLeaveType } = LeaveRequestSlice.actions;

// Selector Methods
export const selectFormData = (state) => state.leaverequest.formData;
export const selectLeaveTypes = (state) => state.leaverequest.leaveTypes;
export const selectShortLeaveTypes = (state) => state.leaverequest.shortLeaveTypes;
export const selectUserLeaves = (state) => state.leaverequest.userLeaves;
export const selectLeaveType = (state) => state.leaverequest.leaveType;
// Reducer
export const LeaveRequestReducer = LeaveRequestSlice.reducer;