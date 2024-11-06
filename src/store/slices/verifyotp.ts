// store/slices/verifyEmailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const verifyEmailSlice = createSlice({
  name: 'verifyEmail',
  initialState: { email: '' },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
