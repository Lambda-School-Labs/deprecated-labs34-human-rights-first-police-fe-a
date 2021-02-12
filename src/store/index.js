import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import incidentSlice from './incidentSlice';
import mapSlice from './mapSlice';
import timelineSlice from './timelineSlice';

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    incident: incidentSlice.reducer,
    map: mapSlice.reducer,
    timeline: timelineSlice.reducer,
  },
});

export default store;

export const { actions: apiActions } = apiSlice;
export const { actions: incidentActions } = incidentSlice;
export const { actions: timelineActions } = timelineSlice;
