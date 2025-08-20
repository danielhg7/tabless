"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "@/interfaces/Item";
import { CartItem } from "@/interfaces/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  handleDecrease: (id: string) => void;
  handleIncrease: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    console.log(JSON.stringify(cart));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };


  const handleDecrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleIncrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity >= 0
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleDecrease, handleIncrease }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}