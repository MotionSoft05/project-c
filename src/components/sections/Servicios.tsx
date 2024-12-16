import React from "react";

export default function Servicios() {
  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Marcas con las que trabajamos</h2>
      <div className="bg-gray-200 h-24 mb-6 flex items-center justify-center">
        <p>Marcas con las que trabajan</p>
      </div>
      <div className="h-60 overflow-x-auto bg-gray-100 mb-6">
        <p className="text-center p-6">Scroll de los servicios</p>
      </div>
      <div className="h-40 overflow-x-auto bg-gray-100">
        <p className="text-center p-6">Scroll de los productos</p>
      </div>
    </div>
  );
}
