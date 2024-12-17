import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { StaticImageData } from "next/image"; // Importa StaticImageData desde next/image

import ServiciosSliderContent from "./ServiciosSliderContent";
import { serviciosData } from "@/data/serviciosData";

// Define la interfaz para un servicio
interface Servicio {
  id: number;
  title: string;
  shortDescription: string; // Cambié 'description' por 'shortDescription'
  detailedDescription: string[]; // Cambié 'longDescription' por 'detailedDescription'
  image: StaticImageData;
}

const ServiciosSlider = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setServicios(serviciosData); // Asumiendo que serviciosData es del tipo Servicio[]
  }, []);

  // Control de autoplay
  const toggleAutoplay = (pause: boolean) => {
    if (swiperRef.current) {
      if (pause) {
        swiperRef.current.swiper.autoplay.stop(); // Pausar autoplay
      } else {
        swiperRef.current.swiper.autoplay.start(); // Reanudar autoplay
      }
    }
  };

  return (
    <section className="bg-gray-50 py-7">
      <div className="container relative">
        <h2 className="text-center text-3xl font-bold mb-6">
          Nuestros Servicios
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
          ref={swiperRef}
        >
          {servicios.map((servicio) => (
            <SwiperSlide key={servicio.id}>
              <ServiciosSliderContent
                servicio={servicio}
                toggleAutoplay={toggleAutoplay} // Pasamos la función para controlar el autoplay
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServiciosSlider;
