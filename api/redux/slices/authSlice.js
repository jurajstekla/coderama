import { createSlice } from '@reduxjs/toolkit';
import { getCookieValue } from '../../../Global/globalFunctions';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loading: false,
    isLogged: getCookieValue('accessToken') !== null ? true : false,
    username: getCookieValue('username') !== null ? getCookieValue('username') : ''
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading, setIsLogged, setUsername } = authSlice.actions;
export default authSlice.reducer;
