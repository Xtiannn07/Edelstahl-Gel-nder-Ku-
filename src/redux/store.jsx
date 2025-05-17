import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import particleReducer from './slices/particleSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    particles: particleReducer
  }
});

export default store;