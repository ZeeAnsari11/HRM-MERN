import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const DepartmentSlice = createSlice({
    name: 'Department',
    initialState: {
        department: {}
    },
    reducers: {
        setUserDepartment: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserDepartment } = DepartmentSlice.actions;

// Selector Methods
export const selectUserDepartment = (state) => state.department;

// Reducer
export const DepartmentReducer = DepartmentSlice.reducer;