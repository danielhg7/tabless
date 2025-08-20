"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

export default function Footer() {
  const pathname = usePathname();
  const {restaurant} = useRestaurant();
  
  const isMenuActive = pathname === `/menu/${restaurant?.slug}`;
  const isPaymentActive = pathname === "/payment";
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {/* Menu */}
        <Link href={`/menu/${restaurant?.slug}`} className="flex flex-col items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              isMenuActive ? "bg-black" : "bg-white"
            }`}
          >
            <Home
              size={24}
              className={isMenuActive ? "text-white" : "text-black"}
            />
          </div>
          <span
            className={`text-xs mt-1 ${isMenuActive ? "text-black font-semibold" : "text-gray-600"}`}
          >
            Menu
          </span>
        </Link>

        {/* Payment */}
        <Link href="/payment" className="flex flex-col items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              isPaymentActive ? "bg-black" : "bg-white"
            }`}
          >
            <CreditCard
              size={24}
              className={isPaymentActive ? "text-white" : "text-black"}
            />
          </div>
          <span
            className={`text-xs mt-1 ${isPaymentActive ? "text-black font-semibold" : "text-gray-600"}`}
          >
            Payment
          </span>
        </Link>
      </div>
    </div>
  );
}
