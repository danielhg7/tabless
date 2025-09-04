"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "@/interfaces/Item";
import { CartItem, CartItemStatus } from "@/interfaces/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Item | null) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  handleDecrease: (id: string) => void;
  handleIncrease: (id: string) => void;
  changeStatus: (status: CartItemStatus) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Item | null) => {
    console.log("Adding item to cart: ", item)
    if(item) {
      setCart((prev) => {
        const existing = prev.find((i) => i._id === item._id && i.status === 'ADDED');
        if (existing) {
          return prev.map((i) =>
            i._id === item._id ? { ...i, count: i.count + 1 } : i
          );
        } else {
          return [...prev, { ...item, count: 1, status: 'ADDED' }];
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
        item._id === id && item.status === 'ADDED' && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleIncrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.status === 'ADDED' && item.count >= 0
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const changeStatus = (status: CartItemStatus) => {
    setCart((prevCart) => {
      const updatedCart: CartItem[] = [];
  
      prevCart.forEach((item) => {
        if (item.status === "ADDED" && status === "ORDERED") {
          // Buscar si ya existe uno igual pero ORDERED
          const existing = updatedCart.find(
            (c) => c._id === item._id && c.status === "ORDERED"
          );
  
          if (existing) {
            // Si existe, sumamos cantidades
            existing.count += item.count;
          } else {
            // Si no existe, lo agregamos como ORDERED
            updatedCart.push({ ...item, status: "ORDERED" });
          }
        } else {
          // Mantener cualquier otro item sin cambios
          updatedCart.push(item);
        }
      });
  
      return updatedCart;
    });
  };
  

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleDecrease, handleIncrease, changeStatus }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}