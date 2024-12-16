"use client";
import React from "react";
import LavadoForm from "@/components/sections/LavadosForm";
import ServiciosScroll from "@/components/sections/Servicios";
import Testimonios from "@/components/sections/Testimonios";

export default function Home() {
  return (
    <>
      {/* Secciones */}
      <section id="lavado" className="py-20 bg-gray-50">
        <LavadoForm />
      </section>

      <section id="servicios" className="py-20 bg-white">
        <ServiciosScroll />
      </section>

      <section id="testimonios" className="py-20 bg-gray-50">
        <Testimonios />
      </section>
    </>
  );
}
