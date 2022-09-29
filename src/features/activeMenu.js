import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActiveMenu: true,
  screenSize: 0,
};

const activeMenuSlice = createSlice({
  name: 'activeMenu',
  initialState,
  reducers: {
    openActiveMenu: (state) => {
      state.isActiveMenu = true;
    },
    closeActiveMenu: (state) => {
      state.isActiveMenu = false;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
  },
});

export default activeMenuSlice.reducer;
export const { openActiveMenu, closeActiveMenu, setScreenSize } = activeMenuSlice.actions;
