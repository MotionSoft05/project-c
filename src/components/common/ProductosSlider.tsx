// src/components/ProductosSlider.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { StaticImageData } from "next/image"; // Importa StaticImageData desde next/image
import ProductosInfo from "./ProductosSliderContent";
import { productosData } from "@/data/productosData";

// Define el tipo para un producto
interface Producto {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const ProductosSlider = () => {
  // Usa el tipo Producto[] para el estado de productos
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    setProductos(productosData); // Aquí no habrá problema con el tipo
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container relative">
        <h2 className="text-center text-3xl font-bold mb-6">
          Nuestros Productos
        </h2>

        {/* SLIDER */}
        <Swiper
          direction="horizontal"
          speed={1000}
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          keyboard={{ enabled: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            1100: { slidesPerView: 3 },
            600: { slidesPerView: 2 },
          }}
          loop={true}
          modules={[Autoplay, Keyboard, Navigation]}
        >
          {productos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductosInfo producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductosSlider;
