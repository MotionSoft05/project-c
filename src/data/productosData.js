// data/categoriesData.js
import carwash1 from "@/../public/assets/images/carwash-imagen-default-1.jpg";
import carwash2 from "@/../public/assets/images/carwash-imagen-default-2.jpg";
import carwash3 from "@/../public/assets/images/carwash-imagen-default-3.jpg";
import carwash4 from "@/../public/assets/images/carwash-imagen-default-4.jpg";

// Función para generar precios aleatorios entre un rango (por ejemplo, 100 a 500)
const getRandomPrice = () => (Math.random() * (500 - 100) + 100).toFixed(2);

export const categoriesData = [
  {
    id: 1,
    title: "Cuidado y Limpieza",
    description: "Productos para la limpieza interior y exterior del vehículo.",
    image: carwash1,
    subcategories: [
      {
        id: 1,
        title: "Aerosoles y Limpiadores",
        description:
          "Aerosoles y limpiadores especializados para el interior y exterior del vehículo.",
        image: carwash2,
        products: [
          {
            id: 1,
            title: "Aerosol Limpiador de Interiores",
            image: carwash2,
            details: "Aerosol para limpieza rápida de interiores.",
            description:
              "Ideal para limpiar plásticos, cuero y otras superficies del interior del auto.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 2,
            title: "Limpiador de Tapicerías",
            image: carwash3,
            details: "Limpiador de tapicerías en spray.",
            description:
              "Eliminación de manchas y suciedad de telas y alfombras de los autos.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 3,
            title: "Limpiador de Tapicerías",
            image: carwash3,
            details: "Limpiador de tapicerías en spray.",
            description:
              "Eliminación de manchas y suciedad de telas y alfombras de los autos.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 4,
            title: "Limpiador de Tapicerías",
            image: carwash3,
            details: "Limpiador de tapicerías en spray.",
            description:
              "Eliminación de manchas y suciedad de telas y alfombras de los autos.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 5,
            title: "Limpiador de Tapicerías",
            image: carwash3,
            details: "Limpiador de tapicerías en spray.",
            description:
              "Eliminación de manchas y suciedad de telas y alfombras de los autos.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
      {
        id: 2,
        title: "Lava Autos y Revividor de Interiores",
        description:
          "Shampoo para autos y productos revitalizadores para interiores.",
        image: carwash3,
        products: [
          {
            id: 1,
            title: "Shampoo para Autos",
            image: carwash4,
            details: "Shampoo de alta calidad para lavado exterior.",
            description:
              "Limpieza profunda para dejar el auto impecable y brillante.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 2,
            title: "Revividor de Plásticos",
            image: carwash4,
            details: "Revividor para plásticos del interior y exterior.",
            description:
              "Restaurador y revitalizador de piezas de plástico para un acabado nuevo.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Protección y Sellado",
    description: "Selladores y ceras para proteger la pintura y superficies.",
    image: carwash1,
    subcategories: [
      {
        id: 1,
        title: "Selladores Líquidos y Cerámicos",
        description:
          "Selladores líquidos y cerámicos para mayor protección y duración.",
        image: carwash2,
        products: [
          {
            id: 1,
            title: "Sellador para Pintura",
            image: carwash2,
            details: "Sellador líquido para protección de pintura.",
            description:
              "Prolonga la vida de la pintura y ofrece resistencia al agua y suciedad.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 2,
            title: "Sellador Cerámico para Rines",
            image: carwash3,
            details: "Sellador cerámico para proteger los rines.",
            description:
              "Sellado de alta resistencia para rines, protegiendo contra la suciedad y desgaste.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
      {
        id: 2,
        title: "Ceras y Productos Cerámicos",
        description:
          "Ceras y productos cerámicos para un acabado perfecto y duradero.",
        image: carwash3,
        products: [
          {
            id: 1,
            title: "Cera Cerámica para Autos",
            image: carwash4,
            details: "Cera cerámica para auto.",
            description:
              "Cera de alta calidad que proporciona un acabado brillante y duradero.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Aromatización",
    description: "Aromatizantes y perfumes para vehículos.",
    image: carwash1,
    subcategories: [
      {
        id: 1,
        title: "Aromatizantes de Interiores",
        description:
          "Aromatizantes especialmente diseñados para interiores de autos.",
        image: carwash2,
        products: [
          {
            id: 1,
            title: "Aromatizante para Autos",
            image: carwash2,
            details: "Aromatizante fresco para interiores de vehículos.",
            description:
              "Aromatiza y refresca el ambiente dentro del auto con una fragancia duradera.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
      {
        id: 2,
        title: "Aromatizantes de Ambientes",
        description: "Aromatizantes para automóviles y ambientes en general.",
        image: carwash3,
        products: [
          {
            id: 1,
            title: "Perfume para Vehículos de Larga Distancia",
            image: carwash3,
            details: "Perfume para vehículos con fragancia duradera.",
            description:
              "Ideal para mantener el aroma fresco durante largos viajes.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Accesorios",
    description: "Accesorios para el mantenimiento vehicular.",
    image: carwash1,
    subcategories: [
      {
        id: 1,
        title: "Cubiertas y Telas de Limpieza",
        image: carwash2,
        description:
          "Cubiertas para protección y telas especializadas para limpieza.",
        products: [
          {
            id: 1,
            title: "Cubierta de Rueda para Protección",
            image: carwash2,
            details: "Cubierta de rueda para protección contra suciedad.",
            description:
              "Protege las ruedas del vehículo de la suciedad y desgaste.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 2,
            title: "Tela de Microfibra para Secado",
            image: carwash3,
            details: "Tela de microfibra para secado de autos.",
            description:
              "Secado rápido y sin rayas para mantener el auto impecable.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
      {
        id: 2,
        title: "Productos Especializados",
        description:
          "Productos de limpieza y mantenimiento especializado para vehículos.",
        image: carwash3,
        products: [
          {
            id: 1,
            title: "Detergente Líquido de Uso Pesado",
            image: carwash4,
            details: "Detergente líquido para uso pesado.",
            description:
              "Eliminación de manchas y suciedad resistente en superficies de autos.",
            price: getRandomPrice(), // Precio aleatorio
          },
          {
            id: 2,
            title: "Desinfectante de Alta Concentración",
            image: carwash4,
            details: "Desinfectante para interiores del auto.",
            description:
              "Desinfectante de alta concentración para eliminar bacterias y malos olores.",
            price: getRandomPrice(), // Precio aleatorio
          },
        ],
      },
    ],
  },
];
