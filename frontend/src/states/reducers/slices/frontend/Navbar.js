import { createSlice } from '@reduxjs/toolkit';

export const NavbarSlice = createSlice({
  name: 'user',
  initialState: {
    isNavSm: true,
    actionBarWidth: '269px'
  },
  reducers: {
    setNavbarState: (state, action) => {
        state.isNavSm = action.payload;
        (state.isNavSm) ? state.actionBarWidth='269px': state.actionBarWidth='135px' ;
    }
  }
});

// Action Methods
export const { setNavbarState } = NavbarSlice.actions;

// Selector Methods
export const selectNavState = (state) => state.navbar.isNavSm;
export const selectWidth = (state) => state.navbar.actionBarWidth;

// Reducer
export const NavbarReducer = NavbarSlice.reducer;