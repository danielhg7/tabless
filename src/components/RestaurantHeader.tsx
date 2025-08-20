"use client";

import Image from "next/image";

type RestaurantHeaderProps = {
  backgroundUrl: string;
  logoUrl: string;
  name?: string;
};

export default function RestaurantHeader({
  backgroundUrl,
  logoUrl
}: RestaurantHeaderProps) {
  return (
    <div className="relative w-full">
      {/* Imagen de fondo */}
      <div className="relative w-full h-30">
        <Image
          src={backgroundUrl}
          alt={`${"Restaurant"} background`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Logo circular */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative">
          <Image
            src={logoUrl}
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