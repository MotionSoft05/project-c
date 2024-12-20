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
  toggleAutoplay: (pause: boolean) => void;
}

const ServiciosSliderContent: React.FC<ServiciosInfoProps> = ({
  servicio,
  toggleAutoplay,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleDescription = () => {
    setShowMore((prev) => !prev);
    toggleAutoplay(!showMore);
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden">
      {/* Imagen del servicio */}
      <div className="relative w-full h-full">
        <Image
          src={servicio.image}
          alt={servicio.title}
          layout="fill" // La imagen ocupa todo el espacio
          objectFit="cover" // La imagen cubre el contenedor
          className="rounded-md"
        />
      </div>

      {/* Descripción corta y botón */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
        <h3 className="text-lg font-semibold mb-2">{servicio.title}</h3>
        <p className="text-sm">{servicio.shortDescription}</p>
        <button
          onClick={toggleDescription}
          className="mt-2 text-blue-300 hover:text-blue-400 transition-colors"
        >
          {showMore ? "" : "Ver más"}
        </button>
      </div>

      {/* Descripción larga con animación */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col justify-center text-white z-10 transition-transform duration-500 ease-in-out ${
          showMore ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <button
          onClick={toggleDescription}
          className="flex text-3xl font-bold text-gray-300 hover:text-white"
        >
          &times;
        </button>
        <div className="overflow-auto">
          <h3 className="text-xl font-bold mb-4">{servicio.title}</h3>
          {servicio.detailedDescription.map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiciosSliderContent;
