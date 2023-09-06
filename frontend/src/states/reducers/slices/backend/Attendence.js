import { createSlice } from "@reduxjs/toolkit";

// Slice for Attendence
export const AttendenceSlice = createSlice({
  name: "attendence",
  initialState: {
    currentAttendence: {},
  },
  reducers: {
    setAttendence: (state, action) => {
      state.currentAttendence = action.payload;
    },
  },
});

// Action Methods
export const { setAttendence } = AttendenceSlice.actions;

// Selector Methods
export const selectAttendence = (state) => state.attendence.currentAttendence;

// Reducer
export const AttendenceReducer = AttendenceSlice.reducer;
