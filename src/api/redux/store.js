import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import notificationsSlice from './slices/notificationsSlice';
import movieTableSlice from './slices/movieTableSlice';

const reducer = combineReducers({
  notifications: notificationsSlice,
  movieTable: movieTableSlice
});

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })
  ]
});
