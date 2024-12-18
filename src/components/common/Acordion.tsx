import { Collapse } from "react-collapse";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

// Definir los tipos para las props que el componente Accordion recibirá
interface AccordionProps {
  item: {
    id: number;
    title: string;
    description: string;
  };
  toggle: () => void; // Función para alternar la apertura/cierre
  open: boolean; // Estado que indica si el acordeón está abierto
  withTag?: boolean; // Prop optional para decidir si usar etiquetas en el contenido
}

const Accordion: React.FC<AccordionProps> = ({ item, toggle, open }) => {
  // Variantes de animación para framer-motion
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full"
    >
      {/* Header section of the accordion */}
      <div
        className={twMerge(
          "flex cursor-pointer items-center justify-between gap-6 pb-1 transition-colors hover:text-primary hover:opacity-100 dark:text-textDarkColor dark:hover:text-primary",
          open ? "text-primary opacity-100 dark:text-primary" : "opacity-70"
        )}
        onClick={toggle}
      >
        {/* Title of the accordion item, which can be clicked to toggle open/close */}
        <h4 className="cursor-pointer border-b border-solid border-inherit text-xl font-medium">
          {item?.title}
        </h4>

        {/* Button to toggle open/close the accordion */}
        <button className="text-2xl">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Content of the accordion, displayed when it's open */}
      <Collapse isOpened={open}>
        {/* Description text */}
        <p className="max-w-[980px] pt-3 text-justify dark:text-textDarkColor lg:text-lg">
          {item?.description}
        </p>
      </Collapse>
    </motion.div>
  );
};

export default Accordion;
