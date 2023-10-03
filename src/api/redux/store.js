import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './slices/authSlice';
import dataTableSlice from './slices/dataTableSlice';
import notificationsSlice from './slices/notificationsSlice';
import treeSlice from './slices/treeSlice';

const reducer = combineReducers({
  auth: authSlice,
  tree: treeSlice,
  notifications: notificationsSlice,
  dataTable: dataTableSlice
});

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })
  ]
});
