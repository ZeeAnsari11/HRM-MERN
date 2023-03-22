import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const QualificationSlice = createSlice({
  name: 'qualifications',
  initialState: {
    qualifications: []
  },
  reducers: {
    setUserQualification: (state, action) => {
        state = action.payload;
    }
  }
});

// Action Methods
export const { setUserQualification } = QualificationSlice.actions;

// Selector Methods
export const selectUserQualification = (state) => state.qualifications;

// Reducer
export const QualificationReducer = QualificationSlice.reducer;