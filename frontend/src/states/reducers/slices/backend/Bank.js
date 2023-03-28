import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const BankSlice = createSlice({
    name: 'Bank',
    initialState: {
        banks: []
    },
    reducers: {
        setUserBank: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserBank } = BankSlice.actions;

// Selector Methods
export const selectUserBank = (state) => state.banks;

// Reducer
export const BankReducer = BankSlice.reducer;