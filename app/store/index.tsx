// Assuming index.tsx is in the 'app/store' directory
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // This points to the reducers folder within store

const store = configureStore({ reducer: rootReducer });

export default store;