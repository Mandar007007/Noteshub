// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import verifyEmailSlice from "./slices/verifyotp"

const rootReducer = combineReducers({
  verifyEmailSlice: verifyEmailSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
