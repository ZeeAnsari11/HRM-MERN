import { createSlice } from '@reduxjs/toolkit';

export const QualificationSlice = createSlice({
  name: 'qualifications',
  initialState: {
    qualifications: [],
    clickState: '',
    selectedQualification: {
        id: '',
        instituteName: '',
        degreeTitle:'',
        isDegreeCompleted: false,
        starting: '',
        ending: ''
    }
  },
  reducers: {
    setUserQualifications: (state, action) => {
        state.qualifications = action.payload;
    },
    setClickState: (state, action) => {
      console.log("====action",action);
      console.log("====state",state);

        state.clickState = action.payload._id;
        state.selectedQualification = {
            id: action.payload._id,
            instituteName: action.payload.instituteName,
            degreeTitle: action.payload.degreeTitle,
            isDegreeCompleted: action.payload.isDegreeCompleted,
            starting: action.payload.starting,
            ending: action.payload.ending
      }
    }}
});

// Action Methods
export const { setUserQualifications, setClickState } = QualificationSlice.actions;

// Selector Methods
export const selectUserQualifications = (state) => state.qualification.qualifications;
export const selectQualificationsClickState = (state) => state.qualification.clickState;
export const selectSelectedQualification = (state) => state.qualification.selectedQualification;

// Reducer
export const QualificationReducer = QualificationSlice.reducer;