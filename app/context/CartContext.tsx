"use client";

import { createContext, useContext, useState } from "react";

// Define the type for an individual cart item
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Define the type for the CartContext
export type CartContextType = {
  cartItems: CartItem[]; // Array of items in the cart
  addToCart: (item: CartItem) => void; // Function to add an item to the cart
  removeFromCart: (id: string) => void; // Function to remove an item by ID
  clearCart: () => void; // Function to clear the entire cart
};

// Create the context with an undefined initial value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider for the CartContext
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide the context value to children
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
