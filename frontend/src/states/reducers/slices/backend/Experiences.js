import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Experiences
export const ExperiencesSlice = createSlice({
  name: 'experiences',
  initialState: {
    experiences: [],
    clickState: '',
    selectedExperience: {
        id: '',
        designation: '',
        organization:'',
        experienceLetter: '',
        stack: '',
        reasonForLeaving: ''
    }
  },
  reducers: {
    setUserExperiences: (state, action) => {
        state.experiences = action.payload;
    },
    setClickState: (state, action) => {
        state.clickState = action.payload._id;
        state.selectedExperience = {
            id: action.payload._id,
            designation: action.payload.designation,
            organization: action.payload.organization,
            experienceLetter: action.payload.experienceLetter,
            stack: action.payload.stack,
            reasonForLeaving: action.payload.reasonForLeaving
      }
    }}
});

// Action Methods
export const { setUserExperiences, setClickState } = ExperiencesSlice.actions;

// Selector Methods
export const selectUserExperiences = (state) => state.experiences.experiences;
export const selectExperiencesClickState = (state) => state.experiences.clickState;
export const selectSelectedExperience = (state) => state.experiences.selectedExperience;

// Reducer
export const ExperiencesReducer = ExperiencesSlice.reducer;