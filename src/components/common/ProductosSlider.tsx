// src/components/ProductosSlider.jsx
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";

import ProductosInfo from "./ProductosSliderContent";
import { productosData } from "@/data/productosData";

const ProductosSlider = () => {
  const [productos, setProductos] = useState([]);
  const productosSwiperRef = useRef();

  useEffect(() => {
    setProductos(productosData);
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
          onBeforeInit={(swiper) => {
            productosSwiperRef.current = swiper;
          }}
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
