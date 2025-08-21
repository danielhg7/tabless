"use client";

import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import defaultLogo from "@/public/default-restaurant-logo.png";
import defaultBackgroundImage from "@/public/default-restaurant-background-image.png";

export default function RestaurantHeader() {

  const {restaurant} = useRestaurant();

  console.log("Restaurant in Header: ", restaurant)

  return (
    <div className="relative w-full">
      {/* Imagen de fondo */}
      <div className="relative w-full h-30">
        <Image
          src={restaurant?.backgroundImage ? restaurant?.backgroundImage : defaultBackgroundImage}
          alt={`${"Restaurant"} background`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          objectPosition="100% 68%"
        />
      </div>

      {/* Logo circular */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative">
          <Image
            src={restaurant?.logo ? restaurant?.logo : defaultLogo}
            alt={`${"Restaurant"} logo`}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}