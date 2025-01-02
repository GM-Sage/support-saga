import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartSlice from '../reducers/cartSlice'; // Import your cart slice

// Combine slices into a root reducer
const rootReducer = combineReducers({
  cart: cartSlice,
  // Add other slices like `user`, `products`, etc., if needed
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Retain default middleware with adjustments
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
