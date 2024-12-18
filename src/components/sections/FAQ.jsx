import { useState } from "react";
import Accordion from "@/components/common/Acordion";

// Importación de las preguntas frecuentes
import { productosFAQ } from "@/data/productosFAQ";
import { serviciosFAQ } from "@/data/serviciosFAQ";

const AccordionSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null); // Controla el acordeón abierto
  const [showProducts, setShowProducts] = useState(true); // Controla si se muestran productos o servicios

  // Alternar entre productos y servicios
  const toggleFAQs = () => {
    setShowProducts(!showProducts);
    setOpenAccordion(null); // Reinicia el acordeón abierto al cambiar
  };

  // Alternar el acordeón individual
  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      return setOpenAccordion(null);
    }
    setOpenAccordion(index);
  };

  return (
    <div className="pb-14 pt-20">
      <div className="container">
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
              <h2 className="text-xl font-semibold mb-4">Nuestros productos</h2>
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
              <h2 className="text-xl font-semibold mb-4">Nuestros servicios</h2>
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
