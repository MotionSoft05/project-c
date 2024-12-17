// En HomeSliderContent.tsx
import React from "react";
import { StaticImageData } from "next/image"; // Asegúrate de importar StaticImageData si usas Next.js
import Image from "next/image"; // Importa el componente Image
import { motion } from "framer-motion"; // Importa motion de framer-motion

// Definir el tipo para slider
interface Slider {
  sliderId: number;
  sliderImage: StaticImageData | string; // Aceptar tanto StaticImageData como string
  sliderVideo?: string; // Opcional, si existe
  sliderTag: string;
  sliderTitle: string;
  sliderDescription: string;
}

interface HomeSliderContentProps {
  slider: Slider;
}

export const HomeSliderContent: React.FC<HomeSliderContentProps> = ({
  slider,
}) => {
  return (
    <li
      className="lg:min-h-screen grid place-items-center  relative"
      id="hero-2"
    >
      <div className="absolute -z-10 h-full w-full overflow-hidden">
        {/* SLIDER IMAGES AND VIDEO */}
        {slider?.sliderImage && (
          <Image
            src={
              typeof slider?.sliderImage === "string"
                ? slider?.sliderImage
                : slider?.sliderImage.src
            } // Accede a .src si es StaticImageData
            alt={slider?.sliderTitle}
            width={1920} // Define un ancho para la imagen
            height={1080} // Define una altura
            className="object-cover h-full w-full object-center"
          />
        )}

        {slider?.sliderVideo && (
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            className="h-full w-full object-cover"
          >
            <source src={slider?.sliderVideo} />
          </video>
        )}
      </div>
      <div className="container h-full sm:py-40 pb-[440px] relative z-10 text-white flex items-center bg-gradient-to-b from-gray-950 to-transparent">
        <div className="max-w-[850px]">
          {/*------------------------ HERO CONTENT START ------------------------*/}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {/* Animación para el Tag */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0 }} // Sin delay para el primer elemento
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }, // Se desplaza desde abajo
              }}
              className="px-5 py-2 border-solid border-3 border-primary rounded-full w-fit md:text-2xl text-xl"
            >
              - {slider?.sliderTag}
            </motion.p>

            {/* Animación para el Title */}
            <motion.h1
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0.3 }} // Añadir delay para el segundo elemento
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              className="lg:text-6xl text-4xl font-bold lg:leading-[70px] flex gap-3"
            >
              {slider?.sliderTitle}
            </motion.h1>

            {/* Animación para la Descripción */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0.6 }} // Añadir más delay para el último elemento
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              className="lg:text-lg mb-6"
            >
              {slider?.sliderDescription}
            </motion.p>
          </motion.div>

          {/*------------------------ HERO CONTENT END ------------------------*/}
        </div>
      </div>
    </li>
  );
};
