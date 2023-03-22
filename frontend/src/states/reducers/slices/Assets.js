import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const AssetsSlice = createSlice({
    name: 'Assets',
    initialState: {
        asserts: []
    },
    reducers: {
        setUserAssets: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserAssets } = AssetsSlice.actions;

// Selector Methods
export const selectUserAssets = (state) => state.asserts;

// Reducer
export const AssetsReducer = AssetsSlice.reducer;