"use client"; // Necesario para hooks en Next.js

import { twMerge } from "tailwind-merge";
import useSticky from "@/hooks/useSticky";
import { FaInstagram, FaFacebookF } from "react-icons/fa"; // Importa los íconos de react-icons

export default function Header() {
  const { sticky } = useSticky(150); // Hook para activar sticky después de 150px

  return (
    <header
      className={twMerge(
        "w-full bg-white shadow-md transition-all duration-300", // Estilos base
        sticky
          ? "fixed top-0 left-0 z-50 bg-white shadow-lg py-2" // Estilos cuando está sticky
          : "relative py-3" // Estilos cuando no está sticky
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Carwash</h1>
          <p className="text-sm text-gray-600">
            Estética vehicular y detailing SN
          </p>{" "}
          {/* Descripción pequeña */}
        </div>

        {/* Iconos de redes sociales */}
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/car.wash.sn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" // Reemplaza con tu enlace de Instagram
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-primary transition-all"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/p/car-wash-lavadero-vehicular-olleros-61558018785810/?profile_tab_item_selected=mentions&_rdr" // Reemplaza con tu enlace de Facebook
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-primary transition-all"
          >
            <FaFacebookF size={24} />
          </a>
        </div>
      </div>
    </header>
  );
}
