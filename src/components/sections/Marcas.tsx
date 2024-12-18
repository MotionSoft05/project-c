import Image from "next/image";
import Toxic from "@/../public/assets/images/Toxic.png";
import { motion, useAnimation } from "framer-motion";

const Marcas = () => {
  const controls = useAnimation(); // Animaciones controladas

  const handleLogoClick = () => {
    controls.start({
      scale: 1.1, // Aumenta un 10% el tamaño del logo
      transition: { duration: 0.3 },
    });

    // Vuelve al tamaño original después de la animación
    setTimeout(() => {
      controls.start({ scale: 1 });
    }, 300);
  };

  return (
    <div className="relative flex flex-col w-full items-center px-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
        Marcas con las que trabajamos
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="flex w-full max-w-xl mb-6 items-center justify-center"
      >
        <div className="flex flex-col w-3/4 pr-4">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 },
            }}
            className="text-xl font-semibold text-gray-800 mb-2"
          >
            Toxic Shine
          </motion.h3>
          <motion.p
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            className="text-sm text-gray-700 mb-4"
          >
            Marca líder en Argentina dedicada al cuidado automotor. Ofrecemos
            productos 100% biodegradables y de diseño superior, con más de 90
            opciones para tu vehículo.
          </motion.p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 100 },
          }}
          className="h-24 flex items-center justify-center w-24"
        >
          <motion.div
            animate={controls}
            onClick={handleLogoClick} // Evento de clic en el logo
            className="cursor-pointer"
          >
            <Image
              src={Toxic}
              alt="Toxic Shine Logo"
              width={100}
              height={100}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="w-full max-w-xl"
      >
        <motion.h4
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          className="text-lg font-semibold text-gray-800 mb-2"
        >
          ¿Por qué Toxic Shine?
        </motion.h4>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -50 },
          }}
          className="list-disc pl-4 text-sm text-gray-700 mb-4"
        >
          <li>Más de 90 productos para el cuidado del automóvil.</li>
          <li>100% biodegradables y hechos en Argentina.</li>
          <li>Envases coleccionables y diseños innovadores.</li>
        </motion.ul>

        <motion.h4
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          className="text-lg font-semibold text-gray-800 mb-2"
        >
          Colaboración con Carwash
        </motion.h4>

        <motion.p
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          className="text-sm text-gray-700"
        >
          Carwash es un socio clave en la distribución de los productos Toxic
          Shine en San Nicolas, ofreciendo kits especializados para un lavado y
          detailing de alta calidad.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Marcas;
