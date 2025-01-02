// types/types.ts

// For NextAuth session extension
declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
      };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      id: string;
    }
}

// For your application state
export interface State {
  cartItems: CartItem[];
}

// In your types.ts or where you define CartItem
export interface CartItem {
    id: number; // Assuming CartItem has an id
    name: string; // Assuming CartItem has a name
    price: number; // Assuming CartItem has a price
    imageUrl: string; // Add imageUrl property to CartItem
    quantity: number; // If CartItem has a quantity
}

// If you're using Redux, you might also define your action types here
export enum ActionTypes {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  UPDATE_QUANTITY = "UPDATE_QUANTITY", // Added this line
}

export interface Action {
  type: ActionTypes;
  payload: CartItem | number | { id: number, newQuantity: number }; // Updated to handle different payload types
}

// If you're using Redux, you might also define your root state here
export interface RootState {
  cart: State;
  // Add other state slices if needed
}