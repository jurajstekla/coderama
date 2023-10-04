import { createSlice } from '@reduxjs/toolkit';

export const movieTableSlice = createSlice({
  name: 'movieTableSlice',
  initialState: {
    loading: false,
    rows: [],
    selectedRow: [],
    searchValue: ''
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading, setRows, setSelectedRow, setSearchValue } = movieTableSlice.actions;
export default movieTableSlice.reducer;
