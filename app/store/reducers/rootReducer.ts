// supportsaga/store/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './exampleReducer'; // Adjust path if exampleReducer is in another file

const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here
});

export default rootReducer;