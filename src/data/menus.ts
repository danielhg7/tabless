import { MenuItem } from "@/interfaces/MenuItem";

export const menus: Record<string, MenuItem[]> = {
  "tasty-burger": [
    {
      imageUrl: "",
      id: "1", 
      name: "Hamburguesa Clásica",
      description: "Carne 100% res, lechuga, tomate y mayonesa.",
      price: 6500,
    },
    {
      imageUrl: "",
      id: "2",
      name: "Papas Fritas",
      description: "Crocantes y doradas.",
      price: 2500,
    },
  ],
  "pizza-love": [
    {
      imageUrl: "",
      id: "3",
      name: "Pizza Margarita",
      description: "Mozzarella, albahaca y salsa de tomate.",
      price: 7900,
    },
    {
      imageUrl: "",
      id: "4",
      name: "Pizza Pepperoni",
      description: "Con extra pepperoni.",
      price: 8500,
    },
  ],
  "sushi-mania": [
    {
      imageUrl: "",
      id: "5",
      name: "Roll California",
      description: "Kanikama, palta y pepino.",
      price: 7800,
    },
    {
      imageUrl: "",
      id: "6",
      name: "Roll Tempura",
      description: "Salmón frito, queso crema.",
      price: 8900,
    },
  ],
};