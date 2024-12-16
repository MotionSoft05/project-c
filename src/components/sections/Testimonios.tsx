import React from "react";
import { testimoniosData } from "@/data/testimoniosData"; // Importa los datos
import { Swiper, SwiperSlide } from "swiper/react"; // Importar Swiper y SwiperSlide

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Testimonios() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
          <div className="w-full lg:w-2/5">
            <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-8">
              Confia en la{" "}
              <span className=" text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-violet-600">
                opinión{" "}
              </span>
              de nuestros clientes
            </h2>
            {/* Slider controls */}
            <div className="flex items-center justify-center lg:justify-start gap-10">
              {/* Puedes mantener los controles prev/next aquí si quieres */}
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            {/* Slider wrapper */}
            <div className="swiper mySwiper">
              <Swiper
                direction="horizontal"
                effect="fade"
                speed={1000}
                slidesPerView={1}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                modules={[Autoplay, Pagination, EffectFade]}
                pagination={{ clickable: true }} // Habilita la paginación si la deseas
              >
                {testimoniosData.map((testimonial) => (
                  <SwiperSlide
                    key={testimonial.id}
                    className="group bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 hover:border-indigo-600"
                  >
                    <div className="flex items-center gap-5 mb-5 sm:mb-9">
                      <div className="grid gap-1">
                        <h5 className="text-gray-900 font-medium transition-all duration-500">
                          {testimonial.name}
                        </h5>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 leading-6 transition-all duration-500 min-h-24 group-hover:text-gray-800">
                      {testimonial.feedback}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
