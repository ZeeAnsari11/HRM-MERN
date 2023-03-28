import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const DesignationSlice = createSlice({
    name: 'Designation',
    initialState: {
        designations: {}
    },
    reducers: {
        setUserDesignation: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserDesignation } = DesignationSlice.actions;

// Selector Methods
export const selectUserDesignation = (state) => state.designations;

// Reducer
export const DesignationReducer = DesignationSlice.reducer;