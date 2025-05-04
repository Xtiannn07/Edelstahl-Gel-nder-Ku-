import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enabled: true,
  config: {
    particleCount: 150,
    color: '#264190', // Blue color
    opacity: 0.7,
    speed: 0.8,
    size: {
      min: 0.2,
      max: 2.5 
    },
    connectParticles: true,
    connectionDistance: 150
  }
};

const particleSlice = createSlice({
  name: 'particles',
  initialState,
  reducers: {
    toggleParticles: (state) => {
      state.enabled = !state.enabled;
    },
    updateParticleConfig: (state, action) => {
      state.config = { ...state.config, ...action.payload };
    },
    setParticleCount: (state, action) => {
      state.config.particleCount = action.payload;
    },
    setParticleColor: (state, action) => {
      state.config.color = action.payload;
    },
    setParticleOpacity: (state, action) => {
      state.config.opacity = action.payload;
    },
    setParticleSpeed: (state, action) => {
      state.config.speed = action.payload;
    }
  }
});

export const { 
  toggleParticles, 
  updateParticleConfig, 
  setParticleCount, 
  setParticleColor,
  setParticleOpacity,
  setParticleSpeed
} = particleSlice.actions;

export default particleSlice.reducer;