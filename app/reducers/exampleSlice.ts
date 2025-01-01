// app/reducers/exampleSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    data: [],
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setData } = exampleSlice.actions;

export default exampleSlice.reducer;