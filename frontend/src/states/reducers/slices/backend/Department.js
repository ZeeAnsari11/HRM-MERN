import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const DepartmentSlice = createSlice({
    name: 'Department',
    initialState: {
        departments: []
    },
    reducers: {
        setUserDepartment: (state, action) => {
            state.departments = action.payload;
        }
    }
});

// Action Methods
export const { setUserDepartment } = DepartmentSlice.actions;

// Selector Methods
export const selectUserDepartment = (state) => state.department.departments;

// Reducer
export const DepartmentReducer = DepartmentSlice.reducer;