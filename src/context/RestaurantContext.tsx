"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Restaurant = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  backgroundImage: string;
};

type RestaurantContextType = {
  restaurant: Restaurant | null;
  setRestaurant: (r: Restaurant|null) => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Hook para usarlo más fácil
export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(
      "useRestaurant debe ser usado dentro de un RestaurantProvider"
    );
  }
  return context;
};
