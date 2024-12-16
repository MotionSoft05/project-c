"use client";
import React from "react";
import LavadoForm from "@/components/sections/LavadosForm";
import ServiciosScroll from "@/components/sections/Servicios";
import Testimonios from "@/components/sections/Testimonios";
import WhatsappButton from "@/components/common/WhatsappButton";
export default function Home() {
  return (
    <>
      {/* Secciones */}
      <section id="lavado" className=" bg-gray-50">
        <LavadoForm />
      </section>

      <section id="servicios" className=" bg-white">
        <ServiciosScroll />
      </section>

      <section id="testimonios" className=" bg-gray-50">
        <Testimonios />
      </section>
      {/* Botón flotante de WhatsApp */}
      <WhatsappButton />
    </>
  );
}
