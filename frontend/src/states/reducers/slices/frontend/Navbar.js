import { createSlice } from '@reduxjs/toolkit';

export const NavbarSlice = createSlice({
  name: 'user',
  initialState: {
    isNavSm: true,
    actionBarWidth: '269px',
    topbarMenu: {
      user: false,
      notification: false
    }
  },
  reducers: {
    setNavbarState: (state, action) => {
        state.isNavSm = action.payload;
        (state.isNavSm) ? state.actionBarWidth='269px': state.actionBarWidth='0' ;
    },
    setTogglers: (state, action) => {
        if (state.topbarMenu[action.payload] === true) {
          state.topbarMenu[action.payload] = false
        }
        else {
          Object.keys(state.topbarMenu).forEach((key) => {
            state.topbarMenu[key] = (key === action.payload) ? true : false
          })
        }
    }
  }
});

// Action Methods
export const { setTogglers, setNavbarState } = NavbarSlice.actions;

// Selector Methods
export const selectNavState = (state) => state.navbar.isNavSm;
export const selectWidth = (state) => state.navbar.actionBarWidth;
export const selectMenuOpen = (state) => state.navbar.topbarMenu;

// Reducer
export const NavbarReducer = NavbarSlice.reducer;