import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const BranchSlice = createSlice({
    name: 'Branch',
    initialState: {
        branches: []
    },
    reducers: {
        setUserBranch: (state, action) => {
            state.branches = action.payload;
        }
    }
});

// Action Methods
export const { setUserBranch } = BranchSlice.actions;

// Selector Methods
export const selectUserBranch = (state) => state.branch.branches;

// Reducer
export const BranchReducer = BranchSlice.reducer;