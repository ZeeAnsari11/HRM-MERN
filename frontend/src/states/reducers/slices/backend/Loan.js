import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const LoanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [],
        userLoan: [],
        loanTypes: [],
        creatingLoan: [],
    },
    reducers: {
        setUserLoan: (state, action) => {
            state.userLoan = action.payload;
        },
        setLoanTypes: (state, action) => {
            state.loanTypes = action.payload;
        },
        setCreatingLoan: (state, action) => {
            state.creatingLoan = action.payload;
        }
    }
});

// Action Methods
export const { setUserLoan, setLoanTypes, setCreatingLoan } = LoanSlice.actions;

// Selector Methods
export const selectUserLoan = (state) => state.loan.userLoan;

export const selectLoanTypes = (state) => state.loan.loanTypes;

export const selectCreatingLoan = (state) => state.loan.creatingLoan;

// Reducer
export const LoanReducer = LoanSlice.reducer;