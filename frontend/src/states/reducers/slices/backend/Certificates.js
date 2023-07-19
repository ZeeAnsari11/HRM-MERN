import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Experiences
export const CertificationsSlice = createSlice({
  name: 'certification',
  initialState: {
    certifications: [],
    clickState: '',
    selectedCertification: {
        id: '',
        instituteName: '',
        certificateTitle:'',
        certificationYear: '',
        certificaionAttachment: '',
    }
  },
  reducers: {
    setUserCertifications: (state, action) => {
        state.certifications = action.payload;
    },
    setClickState: (state, action) => {
        state.clickState = action.payload._id;
        state.selectedCertification = {
            id: action.payload._id,
            instituteName: action.payload.instituteName,
            certificateTitle: action.payload.certificateTitle,
            certificationYear: action.payload.certificationYear,
            certificaionAttachment: action.payload.certificaionAttachment,
      }
    }}
});

// Action Methods
export const { setUserCertifications, setClickState } = CertificationsSlice.actions;

// Selector Methods
export const selectUserCertifications = (state) => state.certification.certifications;
export const selectCertificationClickState = (state) => state.certification.clickState;
export const selectSelectedCertification = (state) => state.certification.selectedCertification;

// Reducer
export const CertificationReducer = CertificationsSlice.reducer;