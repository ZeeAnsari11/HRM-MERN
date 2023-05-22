import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const DesignationSlice = createSlice({
    name: 'Designation',
    initialState: {
        designation: {},
        name: {}
    },
    reducers: {
        setUserDesignation: (state, action) => {
            state = action.payload;
        },
        setDesignationName: (state, action) => {
            state.name = action.payload;
        }
    }
});

// Action Methods
export const { setUserDesignation, setDesignationName } = DesignationSlice.actions;

// Selector Methods
export const selectUserDesignation = (state) => state.designations;

export const selectDesignationName = (state) => state.designation.name;

// Reducer
export const DesignationReducer = DesignationSlice.reducer;