import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: true, // Indicates if user data is being rehydrated
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.loading = false; // Rehydration complete
    },
    logoutUser(state) {
      state.userInfo = null;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload; // Manually set loading state
    },
  },
});

export const { setUser, logoutUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
