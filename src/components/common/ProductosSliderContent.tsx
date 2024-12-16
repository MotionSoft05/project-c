// src/components/ProductosInfo.jsx
import React from "react";

export default function ProductosInfo({ producto }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <img
        src={producto.image}
        alt={producto.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{producto.title}</h3>
      <p className="text-sm text-gray-700">{producto.description}</p>
    </div>
  );
}
