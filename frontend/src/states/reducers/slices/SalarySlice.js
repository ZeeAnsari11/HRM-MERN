import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const SalarySlice = createSlice({
  name: 'salary',
  initialState: {
    salary: {}
  },
  reducers: {
    setUserSalary: (state, action) => {
        state = action.payload;
    }
  }
});

// Action Methods
export const { setUserRelatives } = SalarySlice.actions;

// Selector Methods
export const selectUserSalary = (state) => state.salary;

// Reducer
export const SalaryReducer = SalarySlice.reducer;