"use client";

import { PaySplitBillSheet } from "@/components/PaySplitBillSheet";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function PaymentPage() {

  const { cart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);
  const [clickPay, setClickPay] = useState(false);

  return (
    <div className="flex flex-col min-h-screen px-4 py-8 justify-center">

      {/* Contenido principal */}
      <main className="flex-2 p-4 space-y-6 justify-center">
        {/* Info mesa y total */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Mesa 12</p>
            <p className="text-xl font-semibold">Monto a pagar</p>
          </div>
          <p className="text-xl font-semibold">${totalPrice.toLocaleString()}</p>
        </div>

        {/* Lista de items */}
        <div className="space-y-3">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.count}x</span>
                <span>{item.name}</span>
              </div>
              <span className="font-semibold">
                ${(item.count * item.price).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="fixed bottom-22 left-0 right-0 flex justify-center">
          <button
                  onClick={() => setClickPay(true)}
                  className="w-3/4 bg-black text-white py-2 rounded-xl"
              >
                  {'Pagar o dividir cuenta'}
          </button>
        </div>
      </main>

      <PaySplitBillSheet clickPay={clickPay} setClickPay={setClickPay} />
    </div>
  );
}
