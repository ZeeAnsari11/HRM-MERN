import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const LoanSlice = createSlice({
    name: 'Loan',
    initialState: {
        loans: []
    },
    reducers: {
        setUserLoan: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserLoan } = LoanSlice.actions;

// Selector Methods
export const selectUserLoan = (state) => state.loans;

// Reducer
export const LoanReducer = LoanSlice.reducer;