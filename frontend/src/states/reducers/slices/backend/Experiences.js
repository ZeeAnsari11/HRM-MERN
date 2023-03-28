import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const ExperiencesSlice = createSlice({
    name: 'Experiences',
    initialState: {
        experiencess: []
    },
    reducers: {
        setUserExperiences: (state, action) => {
            state = action.payload;
        }
    }
});

// Action Methods
export const { setUserExperiences } = ExperiencesSlice.actions;

// Selector Methods
export const selectUserExperiences = (state) => state.experiencess;

// Reducer
export const ExperiencesReducer = ExperiencesSlice.reducer;