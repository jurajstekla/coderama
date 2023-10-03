import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notificationsSlice',
  initialState: {
    notifications: []
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    deleteNotifications: state => {
      state.notifications = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addNotification, deleteNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
