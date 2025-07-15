import { MenuItem } from "@/interfaces/MenuItem";

export const menus: Record<string, MenuItem[]> = {
  "tasty-burger": [
    {
      id: "1", 
      name: "Hamburguesa Clásica",
      description: "Carne 100% res, lechuga, tomate y mayonesa.",
      price: 6500,
    },
    {
      id: "2",
      name: "Papas Fritas",
      description: "Crocantes y doradas.",
      price: 2500,
    },
  ],
  "pizza-love": [
    {
      id: "3",
      name: "Pizza Margarita",
      description: "Mozzarella, albahaca y salsa de tomate.",
      price: 7900,
    },
    {
      id: "4",
      name: "Pizza Pepperoni",
      description: "Con extra pepperoni.",
      price: 8500,
    },
  ],
  "sushi-mania": [
    {
      id: "5",
      name: "Roll California",
      description: "Kanikama, palta y pepino.",
      price: 7800,
    },
    {
      id: "6",
      name: "Roll Tempura",
      description: "Salmón frito, queso crema.",
      price: 8900,
    },
  ],
};