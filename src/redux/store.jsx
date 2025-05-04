import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './slices/gallerySlice';
import languageReducer from './slices/languageSlice';
import particleReducer from './slices/particleSlice';

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    language: languageReducer,
    particles: particleReducer
  }
});

export default store;