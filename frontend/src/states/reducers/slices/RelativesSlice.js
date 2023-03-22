import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const RelativeSlice = createSlice({
  name: 'relatives',
  initialState: {
    relatives: []
  },
  reducers: {
    setUserRelatives: (state, action) => {
        state = action.payload;
    }
  }
});

// Action Methods
export const { setUserRelatives } = RelativeSlice.actions;

// Selector Methods
export const selectUserRelative = (state) => state.relatives;

// Reducer
export const RelativeReducer = RelativeSlice.reducer;