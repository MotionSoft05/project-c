// src/data/serviciosData.js

// import carwash1 from "@/../public/assets/images/carwash-imagen-default-1.jpg";
// import carwash2 from "@/../public/assets/images/carwash-imagen-default-2.jpg";
import carwash3 from "@/../public/assets/images/carwash-imagen-default-3.jpg";
import carwash4 from "@/../public/assets/images/carwash-imagen-default-4.jpg";
// import carwashLimpiezaExterior from "@/../public/assets/images/CarWashLimpiezaExterior.jpg";
import carwashLimpiezaExterior2 from "@/../public/assets/images/CarWashLimpiezaExterior2.jpg";
import carwashLimpiezaInterior from "@/../public/assets/images/CarWashLimpiezaInterior.jpg";
// import carwashPerfumes from "@/../public/assets/images/CarWashPerfumes.jpg";
import carwashProductosEstante from "@/../public/assets/images/CarWashProductosEstante.jpg";
import carwashVenta from "@/../public/assets/images/CarWashVenta.jpg";

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
    image: carwashLimpiezaInterior,
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
    image: carwashLimpiezaExterior2,
  },
  {
    id: 3,
    title: "Servicios Adicionales 🛠",
    shortDescription:
      "Complementa tu vehículo con un detallado profesional completo.",
    detailedDescription: [
      "Nuestros servicios adicionales están diseñados para llevar tu vehículo al siguiente nivel de cuidado y apariencia:",
      "- **Limpieza de tapizados**: Eliminación profunda de manchas y olores para interiores impecables.",
      "- **Limpieza de motor**: Desengrasado y detallado para un motor reluciente y funcional.",
      "- **Pulido de ópticas**: Recupera la claridad y brillo de tus faros para una mejor visibilidad.",
      "- **Abrillantado exterior**: Realza el color y brillo de la pintura con técnicas de abrillantado avanzadas.",
      "- **Otros servicios**: Personaliza tu experiencia con detallados específicos. ¡Consúltanos!",
      "Tu auto merece la mejor atención, y nosotros lo garantizamos.",
    ],
    image: carwash3,
  },
  {
    id: 4,
    title: "Camionetas 🛻",
    shortDescription:
      "Atención personalizada y profesional para camionetas de todo tipo.",
    detailedDescription: [
      "Sabemos que las camionetas requieren un cuidado especial debido a su tamaño y uso intensivo.",
      "- **Presupuestos personalizados**: Adaptamos nuestros servicios a las necesidades específicas de tu camioneta.",
      "- **Trabajo detallado**: Desde el lavado exterior hasta la limpieza profunda del interior y servicios avanzados de protección.",
      "- **Compromiso con la calidad**: Utilizamos productos de alta gama y técnicas profesionales para resultados sobresalientes.",
      "Solicitá tu presupuesto y llevá tu camioneta al nivel de brillo y protección que merece.",
    ],
    image: carwash4,
  },
  {
    id: 5,
    title: "Punto de Venta Toxic Shine ☠",
    shortDescription:
      "Llevá los mejores productos de cuidado automotriz a tu casa.",
    detailedDescription: [
      "Como punto de venta oficial de **Toxic Shine**, ofrecemos productos premium para el cuidado y detallado de tu vehículo.",
      "- **Calidad profesional**: Productos utilizados por expertos en el sector automotriz.",
      "- **Variedad de opciones**: Desde ceras, limpiadores hasta accesorios para el cuidado exterior e interior.",
      "- **Resultados garantizados**: Mantén tu auto limpio, brillante y protegido por más tiempo.",
      "Consultanos para conocer nuestra gama de productos y llevá la experiencia Toxic Shine a tu hogar.",
    ],
    image: carwashProductosEstante,
  },

  {
    id: 6,
    title: "Eventos y Reuniones 🚗✨",
    shortDescription:
      "Venta de productos Toxic Shine en reuniones y eventos de fanáticos de autos.",
    detailedDescription: [
      "Nos especializamos en la venta de productos Toxic Shine durante eventos automovilísticos, reuniones de clubes y exposiciones.",
      "Detalles del servicio:",
      "- Presentación y venta de toda la gama de productos Toxic Shine.",
      "- Demostraciones en vivo de productos de limpieza y cuidado automotriz.",
      "- Asesoramiento personalizado para el mantenimiento de tu vehículo.",
      "Participamos en eventos locales y nacionales, llevando la calidad profesional de Toxic Shine directamente a los fanáticos de los autos.",
      "¡Consultanos para coordinar nuestra participación en tu evento o club!",
    ],
    image: carwashVenta, // Imagen representativa del evento
  },
];
