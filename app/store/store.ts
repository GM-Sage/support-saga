// app/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer'; // Adjusted path to rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;