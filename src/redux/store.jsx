import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './slices/gallerySlice';
import servicesReducer from './slices/servicesSlice';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    services: servicesReducer,
    language: languageReducer
  }
});

export default store;