import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulates fetching services from a server
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (language) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real application, this would be an API call
    // Here we're just returning the translations based on language
    return {
      en: {
        title: 'Our Offer',
        items: [
          'Railings for balconies',
          'Railings for stairs',
          'French balconies',
          'Fences',
          'Gates',
          'Stair constructions',
          'Small roofs and coverings',
          'Window grilles',
          'Decorative elements',
          'And many other products, made to customer order'
        ]
      },
      de: {
        title: 'Unser Angebot',
        items: [
          'Geländer für Balkone',
          'Geländer für Treppen',
          'Französische Balkone',
          'Zäune',
          'Tore',
          'Treppenkonstruktionen',
          'Kleine Dächer und Überdachungen',
          'Fenstergitter',
          'Dekorative Elemente',
          'Und viele andere Produkte, nach Kundenauftrag gefertigt'
        ]
      }
    }[language];
  }
);

export const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    title: '',
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    lastFetchedLanguage: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.title = action.payload.title;
        state.items = action.payload.items;
        state.lastFetchedLanguage = action.meta.arg; // Store the language we fetched for
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectServicesTitle = (state) => state.services.title;
export const selectServicesItems = (state) => state.services.items;
export const selectServicesStatus = (state) => state.services.status;
export const selectServicesError = (state) => state.services.error;
export const selectLastFetchedLanguage = (state) => state.services.lastFetchedLanguage;

export default servicesSlice.reducer;