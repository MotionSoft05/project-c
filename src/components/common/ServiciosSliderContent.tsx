import React, { useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface Servicio {
  id: number;
  title: string;
  shortDescription: string;
  detailedDescription: string[];
  image: StaticImageData;
}

interface ServiciosInfoProps {
  servicio: Servicio;
  toggleAutoplay: (pause: boolean) => void; // Asegúrate de que esta función esté definida correctamente
}

const ServiciosSliderContent: React.FC<ServiciosInfoProps> = ({
  servicio,
  toggleAutoplay,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleDescription = () => {
    setShowMore((prev) => !prev);
    // Pausar o reanudar autoplay dependiendo del estado de la descripción
    toggleAutoplay(!showMore);
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md">
      {/* Imagen del servicio */}
      <div className="py-48">
        <Image
          src={servicio.image}
          alt={servicio.title}
          width={500}
          height={200}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      </div>

      {/* Título del servicio */}
      <h3 className="text-lg font-semibold mb-2">{servicio.title}</h3>

      {/* Descripción corta */}
      <p className="text-sm text-gray-700">{servicio.shortDescription}</p>

      {/* Botón para mostrar la descripción larga */}
      <button
        onClick={toggleDescription}
        className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        {showMore ? "" : "Ver más"}
      </button>

      {/* Descripción larga (se muestra cuando `showMore` es true) */}
      {showMore && (
        <div className="absolute inset-0 bg-black bg-opacity-60 w-full h-full rounded-md flex flex-col justify-center text-white p-4 z-10">
          {/* Botón de cerrar (X) en la esquina superior izquierda */}
          <button
            onClick={toggleDescription}
            className="absolute top-4 left-4 text-3xl font-bold text-white hover:text-gray-300"
          >
            &times;
          </button>
          <div className="overflow-auto h-full">
            <h3 className="text-xl font-semibold mt-8">{servicio.title}</h3>
            <p className="text-base">{servicio.detailedDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosSliderContent;
