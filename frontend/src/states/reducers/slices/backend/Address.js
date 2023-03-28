import { createSlice } from '@reduxjs/toolkit';

// Slice for Storing User Relatives
export const AddressSlice = createSlice({
  name: 'Address',
  initialState: {
    address: []
  },
  reducers: {
    setUserAddress: (state, action) => {
        state = action.payload;
    }
  }
});

// Action Methods
export const { setUserAddress } = AddressSlice.actions;

// Selector Methods
export const selectUserAddress = (state) => state.address;

// Reducer
export const AddressReducer = AddressSlice.reducer;