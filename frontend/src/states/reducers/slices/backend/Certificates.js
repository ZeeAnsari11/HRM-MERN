import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const CertificatesSlice = createSlice({
    name: 'Certificates',
    initialState: {
        certificatess: []
    },
    reducers: {
        setUserCertificates: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserCertificates } = CertificatesSlice.actions;

// Selector Methods
export const selectUserCertificates = (state) => state.certificatess;

// Reducer
export const CertificatesReducer = CertificatesSlice.reducer;