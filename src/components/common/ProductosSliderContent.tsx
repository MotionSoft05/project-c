// src/components/ProductosInfo.jsx
import React from "react";
import Image from "next/image"; // Importa el componente Image
import { StaticImageData } from "next/image"; // Importa StaticImageData desde next/image
// Define la interfaz Producto para especificar el tipo de las props
interface Producto {
  id: number;
  title: string;
  description: string;
  image: StaticImageData; // Si la imagen es de tipo StaticImageData
}

interface ProductosInfoProps {
  producto: Producto; // Tipamos la prop producto
}

const ProductosInfo: React.FC<ProductosInfoProps> = ({ producto }) => {
  return (
    <div className="relative w-full h-44  rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={producto.image} // Utiliza el atributo `src` como la URL de la imagen
          alt={producto.title} // Asegúrate de tener un `alt` apropiado
          layout="fill" // La imagen ocupa todo el espacio
          objectFit="cover" // La imagen cubre el contenedor
          className="rounded-md"
        />
      </div>
      {/* Descripción corta y botón */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
        <h3 className="text-lg font-semibold mb-2">{producto.title}</h3>
        <p className="text-sm">{producto.description}</p>
      </div>
    </div>
  );
};

export default ProductosInfo;
