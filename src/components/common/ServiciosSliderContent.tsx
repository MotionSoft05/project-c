// src/components/ServiciosInfo.jsx
import React from "react";
import Image from "next/image"; // Asegúrate de importar `Image` desde Next.js

export default function ServiciosInfo({ servicio }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="py-48">
        <Image
          src={servicio.image} // Usar Image para manejar la imagen de manera óptima
          alt={servicio.title}
          width={500} // Define el ancho (ajústalo según sea necesario)
          height={200} // Define la altura (ajústalo según sea necesario)
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">{servicio.title}</h3>
      <p className="text-sm text-gray-700">{servicio.description}</p>
    </div>
  );
}
