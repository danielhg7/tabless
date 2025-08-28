"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "@/interfaces/Item";
import { CartItem } from "@/interfaces/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Item | null) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  handleDecrease: (id: string) => void;
  handleIncrease: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Item | null) => {
    console.log("Adding item to cart: ", item)
    if(item) {
      setCart((prev) => {
        const existing = prev.find((i) => i._id === item._id);
        if (existing) {
          return prev.map((i) =>
            i._id === item._id ? { ...i, count: i.count + 1 } : i
          );
        } else {
          return [...prev, { ...item, count: 1 }];
        }
      });
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };


  const handleDecrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleIncrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.count >= 0
          ? { ...item, count: item.count + 1 }
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