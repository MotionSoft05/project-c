import React from "react";

export default function Localizacion() {
  return (
    <section className="py-12 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título con estilo mejorado */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Visítanos en Carwash
        </h2>

        {/* Descripción de contacto */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            ¡No dudes en visitarnos! Aquí tienes nuestra información de
            contacto:
          </p>
          <div className="mt-4 text-gray-800">
            <p className="mb-2">
              <strong>Dirección:</strong> Olleros 733, San Nicolas de los
              Arroyos
            </p>
            <p className="mb-2">
              <strong>Horario:</strong> Lunes a Viernes - 9:00 AM a 6:00 PM
            </p>
            <p>
              <strong>Teléfono:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +54 9 336 452-2835
              </a>
            </p>
          </div>
        </div>

        {/* Mapa con estilo */}
        <div className="relative w-full h-[600px] mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d294.6771393164028!2d-60.24060380728075!3d-33.32165831217871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1734375469959!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
