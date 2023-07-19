import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const RelativeSlice = createSlice({
  name: 'relatives',
  initialState: {
    relatives: [],
    clickState: '',
    selectedRelative: {
      id: '',
      name:'',
      relationship: '',                                 
      cellNumber: '',
      landLineNumber: '',
      isDependent: false,
    }
  },
  reducers: {
    setUserRelatives: (state, action) => {
        state.relatives = action.payload;
    },
    setClickState: (state, action) => {
        state.clickState = action.payload._id;
        state.selectedRelative = {
          id: action.payload._id,
          name: action.payload.name,
          relationship: action.payload.relationship,                                 
          cellNumber: action.payload.cellNumber,
          landLineNumber: action.payload.landLineNumber,
          isDependent: action.payload.isDependent
      }
    }}
});

// Action Methods
export const { setUserRelatives, setClickState } = RelativeSlice.actions;

// Selector Methods
export const selectUserRelative = (state) => state.relatives.relatives;
export const selectRelativeClickState = (state) => state.relatives.clickState;
export const selectSelectedRelative = (state) => state.relatives.selectedRelative;

// Reducer
export const RelativeReducer = RelativeSlice.reducer;