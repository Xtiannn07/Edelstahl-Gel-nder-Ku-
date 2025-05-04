import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './slices/gallerySlice';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    language: languageReducer
  }
});

export default store;