import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

export const dataTableSlice = createSlice({
  name: 'dataTableSlice',
  initialState: {
    loading: false,
    rows: [],
    filteredRows: [],
    isFilterActive: false,
    columns: [],
    dataTableViewType: 'DOCUMENT', // DOCUMENT,TABLE,HTML,
    defaultDataTableViewType: 'DOCUMENT',
    selectedRow: {},
    selectedRows: []
  },
  reducers: {
    
    resetState: state => {
      state.rows = [];
      state.columns = [];
      state.selectedRow = {};
      state.filteredRows = [];
      state.isFilterActive = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setDataTableViewType,
  setRows,
  setColumns,
  setSelectedRow,
  setSelectedRows,
  setLoading,
  deleteRow,
  deleteRows,
  updateRow,
  updateRowCustomProperties,
  addRow,
  renameTitle,
  resetState,
  setFilteredRows,
  setIsFilterActive
} = dataTableSlice.actions;
export default dataTableSlice.reducer;
