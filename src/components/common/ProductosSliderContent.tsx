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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Image
        src={producto.image} // Utiliza el atributo `src` como la URL de la imagen
        alt={producto.title} // Asegúrate de tener un `alt` apropiado
        width={500} // Establece un ancho, ajusta según sea necesario
        height={300} // Establece una altura, ajusta según sea necesario
        className="object-cover rounded-md mb-4" // Mantén las clases CSS
      />
      <h3 className="text-lg font-semibold mb-2">{producto.title}</h3>
      <p className="text-sm text-gray-700">{producto.description}</p>
    </div>
  );
};

export default ProductosInfo;
