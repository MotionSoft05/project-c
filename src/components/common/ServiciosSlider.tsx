import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { StaticImageData } from "next/image"; // Importa StaticImageData desde next/image
import { motion } from "framer-motion";
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
    <section className="-50 pt-7">
      <div className="container relative">
        <div className="text-center mb-10">
          {/* Título principal con animación */}

          <motion.h2
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 },
            }}
            className="text-3xl md:text-4xl font-bold mb-3 text-gray-800"
          >
            Nuestros Servicios
          </motion.h2>
          {/* Breve descripción con estilo más sutil */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: 0.6 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Ofrecemos soluciones personalizadas para el cuidado, limpieza y
            detallado de tu vehículo.
          </motion.p>
        </div>

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
          className="shadow-lg"
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
