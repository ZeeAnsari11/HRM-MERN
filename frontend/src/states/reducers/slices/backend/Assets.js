import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const AssetsSlice = createSlice({
    name: 'assets',
    initialState: {
        assets: [],
        assetType: [],
        allAssets: [],
        allocation: [],
        id: {},
        action: {},
        assetHistory: []
    },
    reducers: {
        setUserAssets: (state, action) => {
            state.assets = action.payload;
        },
        setAssetTypes: (state, action) => {
            state.assetType = action.payload;
        },
        setAllAssets: (state, action) => {
            state.allAssets = action.payload;
        },
        setAllocation: (state, action) => {
            state.allocation = action.payload;
        },
        setAllocationId: (state, action) => {
            state.id = action.payload;
        },
        setAllocationAction: (state, action) => {
            state.action = action.payload;
        },
        setAssetHistory: (state, action) => {
            state.assetHistory = action.payload;
        }
        
    }
});

// Action Methods
export const { setUserAssets, setAssetTypes, setAllAssets, setAllocation, setAllocationId, setAllocationAction, setAssetHistory } = AssetsSlice.actions;

// Selector Methods
export const selectUserAssets = (state) => state.assets.assets;

export const selectAssetTypes = (state) => state.assets.assetType;

export const selectAllAsset = (state) => state.assets.allAssets;

export const selectAssetAllocation = (state) => state.assets.allocation;

export const selectAllocationId = (state) => state.assets.id;

export const selectAllocationAction = (state) => state.assets.action;

export const selectAssetHistory = (state) => state.assets.assetHistory;

// Reducer
export const AssetsReducer = AssetsSlice.reducer;