import { createSlice } from '@reduxjs/toolkit';

export const ToggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    toggle: ''
  },
  reducers: {
    setToggler: (state, action) => {
        state.toggle = action.payload;
    }
}
});

// Action Methods
export const { setToggler } = ToggleSlice.actions;

// Selector Methods
export const selectTogglerState = (state) => state.toggler.toggle;

// Reducer
export const ToggleReducer = ToggleSlice.reducer;