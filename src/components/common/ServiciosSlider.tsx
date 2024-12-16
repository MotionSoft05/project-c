import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { StaticImageData } from "next/image"; // Importa StaticImageData desde next/image

import ServiciosInfo from "./ServiciosSliderContent";
import { serviciosData } from "@/data/serviciosData";

// Define la interfaz para un servicio
interface Servicio {
  id: number;
  title: string;
  description: string;
  image: StaticImageData; // Cambia el tipo de 'string' a 'StaticImageData'
}

const ServiciosSlider = () => {
  // Inicializar el estado con el tipo de 'Servicio'
  const [servicios, setServicios] = useState<Servicio[]>([]);
  // const serviciosSwiperRef = useRef();

  useEffect(() => {
    setServicios(serviciosData); // Asumiendo que serviciosData es del tipo Servicio[]
  }, []);

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
          // onBeforeInit={(swiper) => {
          //   serviciosSwiperRef.current = swiper;
          // }}
        >
          {servicios.map((servicio) => (
            <SwiperSlide key={servicio.id}>
              <ServiciosInfo servicio={servicio} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServiciosSlider;
