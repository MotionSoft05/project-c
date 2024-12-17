// src/data/serviciosData.js

import carwash1 from "@/../public/assets/images/carwash-imagen-default-1.jpg";
import carwash2 from "@/../public/assets/images/carwash-imagen-default-2.jpg";
import carwash3 from "@/../public/assets/images/carwash-imagen-default-3.jpg";
import carwash4 from "@/../public/assets/images/carwash-imagen-default-4.jpg";

export const serviciosData = [
  {
    id: 1,
    title: "Lavado Premium 💎",
    shortDescription:
      "Lavado completo exterior e interior, con protección UV y más.",
    detailedDescription: [
      "Autos desde $15.000",
      "Incluye:",
      "- Lavado completo exterior e interior.",
      "- Aspirado y detallado del interior.",
      "- Aplicación de reavivadores con protección UV.",
      "- Tratamiento para cubiertas y alfombras de goma.",
      "Importante:",
      "- El precio puede variar según el estado del vehículo y los productos adicionales que se necesiten.",
      "- Limpieza de tapizado opcional (consultar).",
      "- Productos utilizados: Toxic Shine ☠.",
    ],
    image: carwash1,
  },
  {
    id: 2,
    title: "Lavado Artesanal ✨",
    shortDescription:
      "Lavado exterior con productos Toxic Shine, cera premium y más.",
    detailedDescription: [
      "Autos desde $30.000",
      "Incluye:",
      "- Lavado exterior con productos Toxic Shine.",
      "- Aplicación de protección UV.",
      "- Aplicación de cera premium para mayor brillo y protección.",
      "Importante:",
      "- El precio puede variar según el estado del vehículo.",
    ],
    image: carwash2,
  },
  {
    id: 3,
    title: "Servicios Adicionales 🛠",
    shortDescription:
      "Accesorios y servicios adicionales para un detalle completo.",
    detailedDescription: [
      "Servicios disponibles:",
      "- Limpieza de tapizados.",
      "- Limpieza de motor.",
      "- Pulido de ópticas.",
      "- Abrillantado exterior.",
      "- Otros servicios de detallado profesional (consultar).",
    ],
    image: carwash3,
  },
  {
    id: 4,
    title: "Camionetas 🛻",
    shortDescription:
      "Presupuestos personalizados según el trabajo solicitado.",
    detailedDescription: [
      "Presupuestos especiales para camionetas, según el trabajo solicitado por el cliente.",
      "Consúltanos para más detalles.",
    ],
    image: carwash4,
  },
  {
    id: 5,
    title: "Punto de Venta Toxic Shine ☠",
    shortDescription: "Somos punto de venta oficial de productos Toxic Shine.",
    detailedDescription: [
      "Llevá la calidad profesional de Toxic Shine a tu hogar.",
      "Consúltanos para más información sobre los productos.",
    ],
    image: carwash1, // Puedes asignar la imagen que desees aquí
  },
];
