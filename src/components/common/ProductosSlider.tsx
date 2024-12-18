import Image from "next/image"; // Importa Image si usas Next.js
import { useState } from "react";
import ProductModal from "./ProductosModal";
import { categoriesData } from "@/data/productosData";
import { motion } from "framer-motion";
const CategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    categoryTitle: "",
    subcategories: [],
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);

  const openModal = (category: any) => {
    setModalContent({
      categoryTitle: category.title,
      subcategories: category.subcategories,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory: any) => {
    setSelectedSubcategory(subcategory);
  };

  const handleProductClick = (product: any) => {
    alert(`Producto seleccionado: ${product.title}`);
  };

  return (
    <div>
      <div className="text-center mb-10">
        {/* Título principal con animación */}

        <motion.h2
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -50 },
          }}
          className="text-3xl md:text-4xl font-bold mb-3 text-gray-800"
        >
          Nuestros Productos
        </motion.h2>
        {/* Breve descripción con estilo más sutil */}

        <motion.p
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Descubre nuestra amplia gama de productos de alta calidad, diseñados
          para satisfacer tus necesidades de cuidado, mantenimiento y mejora de
          tu vehículo.
        </motion.p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoriesData.map((category) => (
          <motion.div
            key={category.id}
            className="relative w-full h-[250px] rounded-lg shadow-md cursor-pointer overflow-hidden group"
            onClick={() => openModal(category)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            {/* Imagen de fondo */}
            {category.image && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            )}

            {/* Gradiente y título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg font-semibold"
              >
                {category.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs"
              >
                {category.description || "Explora esta categoría"}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        categoryTitle={modalContent.categoryTitle}
        subcategories={modalContent.subcategories}
        onSubcategoryClick={handleSubcategoryClick}
        onProductClick={handleProductClick}
        selectedSubcategory={selectedSubcategory}
      />
    </div>
  );
};

export default CategoryList;
