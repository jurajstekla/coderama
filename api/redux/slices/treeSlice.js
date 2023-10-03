import { createSlice } from '@reduxjs/toolkit';

export const treeSlice = createSlice({
  name: 'treeSlice',
  initialState: {
    loading: false,
    selectedTreeNode: { id: '', label: '', permissions: [] },
    expandedTreeNodes: ['root']
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedTreeNode: (state, action) => {
      state.selectedTreeNode = action.payload;
    },
    setSelectedTreeNodePermissions: (state, action) => {
      let copy = { ...state.selectedTreeNode, permissions: action.payload };
      state.selectedTreeNode = copy;
    },
    setExpandedTreeNodes: (state, action) => {
      state.expandedTreeNodes = action.payload;
    },
    resetState: state => {
      state.treeNodes = {};
      state.selectedTreeNode = { id: '', label: '', permissions: [] };
      state.expandedTreeNodes = ['root'];
    }
  }
});

export const {
  setLoading,
  setSelectedTreeNode,
  setSelectedTreeNodePermissions,
  setExpandedTreeNodes,
  resetState
} = treeSlice.actions;

export default treeSlice.reducer;
