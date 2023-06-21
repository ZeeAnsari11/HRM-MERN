import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const DesignationSlice = createSlice({
    name: 'designation',
    initialState: {
        designations: [],
        name: {}
    },
    reducers: {
        setOrganizationDesignation: (state, action) => {
            state.designations = action.payload;
        },
        setDesignationName: (state, action) => {
            state.name = action.payload;
        }
    }
});

// Action Methods
export const { setOrganizationDesignation, setDesignationName } = DesignationSlice.actions;

// Selector Methods
export const selectOrganizationDesignation = (state) => state.designation.designations;

export const selectDesignationName = (state) => state.designation.name;

// Reducer
export const DesignationReducer = DesignationSlice.reducer;