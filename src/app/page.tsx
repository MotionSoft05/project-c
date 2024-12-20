"use client";
import React from "react";
import LavadosFormulario from "@/components/sections/LavadosFormulario";
import Marcas from "@/components/sections/Marcas";
import Servicios from "@/components/sections/Servicios";
import Testimonios from "@/components/sections/Testimonios";
import WhatsappButton from "@/components/common/WhatsappButton";
import Productos from "@/components/sections/Productos";
import Localizacion from "@/components/sections/Localizacion";
import FAQ from "@/components/sections/FAQ";
export default function Home() {
  return (
    <>
      {/* Secciones */}
      <section id="lavado" className=" bg-gray-50">
        <LavadosFormulario />
      </section>

      <section id="lavado" className=" bg-gray-50">
        <Marcas />
      </section>
      {/* <section id="lavado" className=" bg-gray-50">
        <LavadoForm />
      </section> */}

      <section id="servicios" className=" bg-gray-50">
        <Servicios />
      </section>
      <section id="servicios" className=" bg-gray-50">
        <Productos />
      </section>
      <section id="testimonios" className=" bg-gray-50">
        <FAQ />
      </section>
      <section id="testimonios" className=" bg-gray-50">
        <Testimonios />
      </section>
      <section id="testimonios" className=" bg-gray-50">
        <Localizacion />
      </section>
      {/* Botón flotante de WhatsApp */}
      <WhatsappButton />
    </>
  );
}
