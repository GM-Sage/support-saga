// app/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';

// Import your slices here
import exampleSlice from './exampleSlice'; // Adjust the import

const rootReducer = combineReducers({
  example: exampleSlice,
  // Add other slices here
});

export default rootReducer;