import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const BranchSlice = createSlice({
    name: 'Branch',
    initialState: {
        branch: {}
    },
    reducers: {
        setUserBranch: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserBranch } = BranchSlice.actions;

// Selector Methods
export const selectUserBranch = (state) => state.branch;

// Reducer
export const BranchReducer = BranchSlice.reducer;