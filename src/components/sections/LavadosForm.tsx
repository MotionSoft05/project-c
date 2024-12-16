import React from "react";

export default function LavadosForm() {
  return (
    <div className="container mx-auto p-6 shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Pedi tu lavado de auto</h2>
      <p className="mb-6">Texto de como este es un buen lavadero de auto</p>
      <form>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Apellido"
            className="p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Número de contacto"
            className="p-2 border rounded col-span-2"
          />
        </div>
        <input
          type="text"
          placeholder="Vehículo: Marca y Modelo"
          className="p-2 border rounded w-full mb-4"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="date" className="p-2 border rounded" />
          <input type="time" className="p-2 border rounded" />
        </div>
        <textarea
          placeholder="Servicio"
          className="p-2 border rounded w-full mb-4"
        ></textarea>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Enviar petición de lavado
        </button>
      </form>
    </div>
  );
}
