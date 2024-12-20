import { useState } from "react";
import Accordion from "@/components/common/Acordion";
import { motion } from "framer-motion";
// Importación de las preguntas frecuentes
import { productosFAQ } from "@/data/productosFAQ";
import { serviciosFAQ } from "@/data/serviciosFAQ";

const AccordionSection = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [showProducts, setShowProducts] = useState(true); // Controla si se muestran productos o servicios

  // Alternar entre productos y servicios
  const toggleFAQs = () => {
    setShowProducts(!showProducts);
    setOpenAccordion(null); // Reinicia el acordeón abierto al cambiar
  };

  // Alternar el acordeón individual
  const toggleAccordion = (index: number) => {
    if (openAccordion === index) {
      return setOpenAccordion(null);
    }
    setOpenAccordion(index);
  };

  return (
    <div className="pb-14 pt-20">
      <div className="container">
        {/* Título y descripción de la sección FAQ */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -50 },
          }}
          className="text-3xl font-bold text-center mb-6"
        >
          Preguntas Frecuentes
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          className="text-lg text-center text-gray-700 mb-8"
        >
          Encuentra respuestas a las dudas más comunes sobre nuestros productos
          y servicios. Si no encuentras lo que buscas, no dudes en contactarnos.
        </motion.p>

        {/* Botón para alternar entre productos y servicios */}
        <button
          className="mb-6 rounded bg-primary px-4 py-2 text-black hover:bg-primary-dark mx-auto block"
          onClick={toggleFAQs}
        >
          {showProducts
            ? "Ver preguntas de servicios"
            : "Ver preguntas de productos"}
        </button>

        {/* Render dinámico: Productos o Servicios */}
        <div>
          {showProducts ? (
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Nuestros productos
              </h3>
              <ul className="dark:bg-componentsBackgroundDark mx-auto max-w-3xl space-y-6 rounded-lg p-2 dark:shadow-2xl">
                {productosFAQ?.map((item, i) => (
                  <li key={item.id}>
                    <Accordion
                      item={item}
                      open={openAccordion === i}
                      toggle={() => toggleAccordion(i)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Nuestros servicios
              </h3>
              <ul className="dark:bg-componentsBackgroundDark mx-auto max-w-3xl space-y-6 rounded-lg p-2 dark:shadow-2xl">
                {serviciosFAQ?.map((item, i) => (
                  <li key={item.id}>
                    <Accordion
                      item={item}
                      open={openAccordion === i}
                      toggle={() => toggleAccordion(i)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
