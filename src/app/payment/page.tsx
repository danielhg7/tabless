"use client";

import Footer from "@/components/Footer";
import { useRestaurant } from "@/context/RestaurantContext";

export default function PaymentPage() {
  const { restaurant } = useRestaurant();

  return (
    <div className="min-h-screen pb-16 flex flex-col items-center justify-start bg-gray-50">
      {/* Header */}
      <div className="w-full bg-white shadow p-4 flex items-center justify-center">
        <h1 className="text-xl font-bold">
          {restaurant ? `Pago en ${restaurant.name}` : "Pago"}
        </h1>
      </div>

      {/* Contenido de pago */}
      <div className="flex flex-col items-center mt-8 w-full px-4 space-y-4">
        <p className="text-gray-600 text-center">
          Aquí irá el flujo de pago 💳. Puedes agregar:  
          tarjeta, métodos de pago, resumen del pedido, etc.
        </p>

        <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4">
          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Número de tarjeta"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="MM/AA"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="CVV"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
            Pagar
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
