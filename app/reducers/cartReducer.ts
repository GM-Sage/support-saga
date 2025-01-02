import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity += 1;
      } else {
        state.items[productId] = { productId, quantity: 1 };
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.items[productId] && state.items[productId].quantity > 1) {
        state.items[productId].quantity -= 1;
      }
    },
  },
});

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
