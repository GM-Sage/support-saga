// app/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cartSlice'; // Update path to cartSlice

const rootReducer = combineReducers({
  cart: cartSlice, // Use the cart slice
  // Add other slices if needed in the future
});

export default rootReducer;
