"use client"; // Necesario para hooks en Next.js

import { twMerge } from "tailwind-merge";
import useSticky from "@/hooks/useSticky";

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
        <h1 className="text-xl font-bold">Carwash</h1>
      </div>
    </header>
  );
}
