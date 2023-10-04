import { createSlice } from '@reduxjs/toolkit';

export const movieTableSlice = createSlice({
  name: 'movieTableSlice',
  initialState: {
    loading: false,
    rows: [],
    searchValue: '',
    totalRowsCount: 0,
    pagination: {
      page: 0,
      pageSize: 10
    }
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
    setTotalRowsCount: (state, action) => {
      state.totalRowsCount = parseInt(action.payload);
    },
    setPaginationModel: (state, action) => {
      state.pagination = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading, setRows, setTotalRowsCount, setSearchValue, setPaginationModel } =
  movieTableSlice.actions;
export default movieTableSlice.reducer;
