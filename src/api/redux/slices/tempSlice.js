import { createSlice } from '@reduxjs/toolkit';

export const tempSlice = createSlice({
  name: 'tempSlice',
  initialState: {
    pageSize: 15,
    pageIndex: 0
  },
  reducers: {
    setPageSizeR: (state, action) => {
      state.pageSize = action.payload;
    },

    setPageIndexR: (state, action) => {
      state.pageIndex = action.payload;
    },
    resetPageData: state => {
      state.pageIndex = 0;
      state.pageSize = 15;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPageIndexR, setPageSizeR, resetPageData } = tempSlice.actions;
export default tempSlice.reducer;
