import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const EmploymentSlice = createSlice({
    name: 'employmentType',
    initialState: {
        all: []
    },
    reducers: {
        setEmploymentTypes: (state, action) => {
            state.all = action.payload;
        }
    }
});

// Action Methods
export const { setEmploymentTypes } = EmploymentSlice.actions;

// Selector Methods
export const selectEmploymentTypes = (state) => state.employmentType.all;

// Reducer
export const EmploymentTypeReducer = EmploymentSlice.reducer;