// data/categoriesData.js
import carwash1 from "@/../public/assets/images/carwash-imagen-default-1.jpg";
import carwash2 from "@/../public/assets/images/carwash-imagen-default-2.jpg";
import carwash3 from "@/../public/assets/images/carwash-imagen-default-3.jpg";
import carwash4 from "@/../public/assets/images/carwash-imagen-default-4.jpg";

export const categoriesData = [
  {
    id: 1,
    title: "Línea Profesional",
    description:
      "Todo lo relacionado con productos avanzados para profesionales del detallado automotriz.",
    image: carwash1,
    products: [
      {
        id: 1,
        title: "Pulidora de Alta Velocidad",
        description:
          "Pulidora profesional para un acabado perfecto en la pintura del vehículo.",
        price: "399.99",
        discountPrice: "299.99",
        image: carwash2,
      },
      {
        id: 2,
        title: "Kit Detallado Profesional",
        description:
          "Kit completo con herramientas y productos para el detallado automotriz de nivel profesional.",
        price: "499.99",
        discountPrice: "399.99",
        image: carwash3,
      },
    ],
  },
  {
    id: 2,
    title: "Limpieza Exterior",
    description:
      "Incluye ceras líquidas, lava autos, selladores cerámicos, revitalizadores de exteriores, y cualquier producto específico para la apariencia exterior.",
    image: carwash2,
    products: [
      {
        id: 1,
        title: "Cera Líquida Rápida",
        description:
          "Cera líquida para un acabado brillante y duradero en la pintura del vehículo.",
        price: "29.99",
        discountPrice: "19.99",
        image: carwash4,
      },
      {
        id: 2,
        title: "Lava Autos Concentrado",
        description:
          "Detergente concentrado ideal para la limpieza de la carrocería de tu vehículo.",
        price: "24.99",
        discountPrice: "18.99",
        image: carwash1,
      },
    ],
  },
  {
    id: 3,
    title: "Limpieza Interior",
    description:
      "Perfumes, aromatizantes, limpiadores, revividor de interiores, y productos similares para el cuidado y mantenimiento del interior del vehículo.",
    image: carwash3,
    products: [
      {
        id: 1,
        title: "Aromatizante Air Fresh",
        description:
          "Aromatizante para el interior del vehículo con fragancia fresca y duradera.",
        price: "15.99",
        discountPrice: "9.99",
        image: carwash2,
      },
      {
        id: 2,
        title: "Limpiador de Interiores Multiusos",
        description:
          "Limpiador eficiente para tapicerías y superficies interiores del vehículo.",
        price: "22.99",
        discountPrice: "17.99",
        image: carwash3,
      },
    ],
  },
  {
    id: 4,
    title: "Accesorios de Limpieza",
    description:
      "Telas finas, paños de microfibra, esponjas, cubiertas (ruedas), y herramientas para limpieza.",
    image: carwash4,
    products: [
      {
        id: 1,
        title: "Paño Microfibra Premium",
        description:
          "Paño de microfibra de alta calidad para la limpieza sin rayar superficies.",
        price: "8.99",
        discountPrice: "6.99",
        image: carwash4,
      },
      {
        id: 2,
        title: "Esponja de Lavado Suave",
        description:
          "Esponja suave para lavado de vehículos, ideal para no dañar la pintura.",
        price: "12.99",
        discountPrice: "9.99",
        image: carwash1,
      },
    ],
  },
  {
    id: 5,
    title: "Aerosoles y Minipresentaciones",
    description:
      "Productos en formato aerosol, minis, o envases pequeños ideales para detalles específicos.",
    image: carwash1,
    products: [
      {
        id: 1,
        title: "Aerosol Limpiador Rápido",
        description:
          "Limpiador rápido en aerosol para uso en superficies duras y detalles finos.",
        price: "10.99",
        discountPrice: "7.99",
        image: carwash2,
      },
      {
        id: 2,
        title: "Mini Cera Protectora",
        description:
          "Cera en formato mini ideal para detalles rápidos y protección extra en superficies.",
        price: "15.99",
        discountPrice: "11.99",
        image: carwash3,
      },
    ],
  },
  {
    id: 6,
    title: "Perfumes y Aromatizantes",
    description:
      "Exclusivo para fragancias diseñadas para autos, ya que suelen ser populares entre los clientes.",
    image: carwash2,
    products: [
      {
        id: 1,
        title: "Aromatizante Fresh Air",
        description:
          "Fragancia fresca para un ambiente agradable en el interior del vehículo.",
        price: "12.99",
        discountPrice: "9.99",
        image: carwash4,
      },
      {
        id: 2,
        title: "Perfume Auto Elegant",
        description:
          "Perfume sofisticado para vehículos con notas de madera y especias.",
        price: "18.99",
        discountPrice: "14.99",
        image: carwash1,
      },
    ],
  },
  {
    id: 7,
    title: "Selladores y Protección",
    description:
      "Selladores líquidos, cerámicos y otros productos diseñados para proteger las superficies del vehículo.",
    image: carwash3,
    products: [
      {
        id: 1,
        title: "Sellador Cerámico",
        description:
          "Sellador cerámico avanzado para una protección duradera de la pintura.",
        price: "59.99",
        discountPrice: "49.99",
        image: carwash2,
      },
      {
        id: 2,
        title: "Protector de Neumáticos",
        description:
          "Protege y da brillo a los neumáticos con este producto especializado.",
        price: "19.99",
        discountPrice: "14.99",
        image: carwash3,
      },
    ],
  },
  {
    id: 8,
    title: "Merchandising",
    description:
      "Productos de marca (ropa, gorras, llaveros, etc.) relacionados con la empresa o productos Toxic Shine.",
    image: carwash4,
    products: [
      {
        id: 1,
        title: "Camiseta Toxic Shine",
        description:
          "Camiseta de algodón con el logo de Toxic Shine, cómoda y elegante.",
        price: "25.99",
        discountPrice: "19.99",
        image: carwash4,
      },
      {
        id: 2,
        title: "Gorra Toxic Shine",
        description:
          "Gorra con el logo de la marca, perfecta para el día a día.",
        price: "15.99",
        discountPrice: "11.99",
        image: carwash1,
      },
    ],
  },
  {
    id: 9,
    title: "Gama Económica o Hogar",
    description:
      "Productos más accesibles o diseñados para limpieza fuera del uso automotriz profesional, si aplicable.",
    image: carwash1,
    products: [
      {
        id: 1,
        title: "Detergente Multiusos",
        description:
          "Detergente eficaz para limpieza en general, ideal para el hogar.",
        price: "6.99",
        discountPrice: "4.99",
        image: carwash2,
      },
      {
        id: 2,
        title: "Limpiador de Vidrios",
        description:
          "Limpiador eficaz para vidrios, ideal para hogar y vehículos.",
        price: "4.99",
        discountPrice: "3.99",
        image: carwash3,
      },
    ],
  },
];
