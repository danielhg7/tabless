"use client";

import { useCart } from "@/context/CartContext";

export default function PaymentPage() {

  const { cart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);

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

        {/* Mensaje de seguridad */}
        {/*<p className="text-center text-sm text-gray-500">
          Pago realizado de forma segura por <span className="font-semibold">Tabless</span>.
        </p>
        <hr/>
        <p className="text-center text-sm text-gray-500">
          Al utilizar la aplicación <span className="font-semibold">Tabless</span>, aceptas nuestras condiciones de uso y
           el tratamiento de tus datos personales de conformidad con nuestra política de privacidad. 
           Tu información es recopilada en nombre del restaurante y será compartida con este.
        </p>*/}

        <div className="fixed bottom-22 left-0 right-0 flex justify-center">
          <button
                  onClick={() => console.log("Pagando!")}
                  className="w-3/4 bg-black text-white py-2 rounded-xl"
              >
                  {'Pagar o dividir cuenta'}
          </button>
        </div>
      </main>
    </div>
  );
}
