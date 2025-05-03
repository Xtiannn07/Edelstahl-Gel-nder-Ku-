import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample gallery images (in production, these would be fetched from an API)
const initialGalleryImages = [
  { id: 1, title: 'Railings', src: '/Railings1.jpg', alt: 'Stainless steel railings', category: 'railings' },
  { id: 2, title: 'Stair Railings', src: '/RailingsStairs.jpg', alt: 'Stainless steel stair railings', category: 'railings' },
  { id: 3, title: 'French Balconies', src: '/FrenchBalconies.jpg', alt: 'Stainless steel french balconies', category: 'balconies' },
  { id: 4, title: 'Fences', src: '/Fences.jpg', alt: 'Stainless steel fences', category: 'fences' },
  { id: 5, title: 'Gates', src: '/Gates.jpg', alt: 'Stainless steel gates', category: 'gates' },
  { id: 6, title: 'Glass Railings', src: '/GlassRailings.jpg', alt: 'Glass railings with stainless steel', category: 'railings' },
  { id: 7, title: 'Window Grilles', src: '/WindowGrilles.jpg', alt: 'Stainless steel window grilles', category: 'grilles' },
  { id: 8, title: 'Grilles', src: '/Grilles.jpg', alt: 'Decorative stainless steel grilles', category: 'grilles' },
];

// Simulates fetching gallery images from a server
export const fetchGalleryImages = createAsyncThunk(
  'gallery/fetchGalleryImages',
  async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return initialGalleryImages;
  }
);

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    filteredImages: [],
    activeFilter: 'all',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    filterGallery: (state, action) => {
      const category = action.payload;
      state.activeFilter = category;
      
      if (category === 'all') {
        state.filteredImages = state.images;
      } else {
        state.filteredImages = state.images.filter(
          image => image.category === category
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
        state.filteredImages = action.payload; // Initialize filtered images with all images
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { filterGallery } = gallerySlice.actions;

// Selectors
export const selectAllGalleryImages = (state) => state.gallery.images;
export const selectFilteredGalleryImages = (state) => state.gallery.filteredImages;
export const selectGalleryStatus = (state) => state.gallery.status;
export const selectGalleryError = (state) => state.gallery.error;
export const selectActiveFilter = (state) => state.gallery.activeFilter;

export default gallerySlice.reducer;