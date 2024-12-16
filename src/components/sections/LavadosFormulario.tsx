// import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { heroSliderData } from "@/data/homeSliderData";
import { HomeSliderContent } from "@/components/common/HomeSliderContent";

const LavadosFormulario = () => {
  return (
    <div className="relative w-full">
      {/* SLIDER BACKGROUND */}
      <Swiper
        direction="horizontal"
        effect="fade"
        speed={1000}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        // onSlideChange={handleSlideChange}
        modules={[Autoplay, Keyboard, EffectFade, Pagination]}
      >
        {heroSliderData.map((slider, i) => (
          <SwiperSlide key={i}>
            <HomeSliderContent slider={slider} />
          </SwiperSlide>
        ))}

        <div className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <div className="bg-gray-400 bg-opacity-30 rounded-lg p-6 text-black max-w-xl mx-auto">
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input-style"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="input-style"
                />
              </div>
              <input
                type="text"
                placeholder="Número de contacto"
                className="input-style w-full mb-4"
              />
              <input
                type="text"
                placeholder="Vehículo: Marca y Modelo"
                className="input-style w-full mb-4"
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="date" className="input-style" />
                <input type="time" className="input-style" />
              </div>
              <textarea
                placeholder="Servicio"
                className="input-style w-full mb-4"
              ></textarea>
              <button className="btn btn-primary w-full">
                Enviar petición de lavado
              </button>
            </form>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default LavadosFormulario;
