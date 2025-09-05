"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Order, OrderStatus } from "@/interfaces/Order";

interface OrderContextType {
  order: Order | null;
  createOrder: (tableId: string, totalAmount: number) => void;
  updateOrder: (updates: Partial<Order>) => void;
  setOrderStatus: (status: OrderStatus) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Order | null>(null);

  const createOrder = (tableId: string, totalAmount: number) => {
    const newOrder: Order = {
      id: null,
      tableId,
      status: "PENDING",
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrder(newOrder);
  };

  const updateOrder = (updates: Partial<Order>) => {
    setOrder((prev) =>
      prev ? { ...prev, ...updates, updatedAt: new Date() } : prev
    );
  };

  const setOrderStatus = (status: OrderStatus) => {
    setOrder((prev) =>
      prev ? { ...prev, status, updatedAt: new Date() } : prev
    );
  };

  const clearOrder = () => {
    setOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{ order, createOrder, updateOrder, setOrderStatus, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder debe usarse dentro de OrderProvider");
  }
  return context;
};
