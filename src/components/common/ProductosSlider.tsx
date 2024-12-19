import Image from "next/image";
import { useState } from "react";
import { categoriesData } from "@/data/productosData";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";
import CarwashVenta from "../../../public/assets/images/CarWashVenta.jpg";
const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {/* Encabezado con rectángulo */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -50 },
        }}
        className="relative w-full h-28 bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-10"
      >
        <Image
          src={CarwashVenta}
          alt="Productos Header"
          layout="fill"
          objectFit="cover"
          className=""
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-2"
          >
            Nuestros Productos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-md md:text-xl max-w-3xl"
          >
            Descubre nuestra amplia gama de productos diseñados para el cuidado,
            mantenimiento y mejora de tu vehículo.
          </motion.p>
        </div>
      </motion.div>
      {/* Slider de Categorías */}
      {/* Texto introductorio para el slider de categorías */}
      <h2 className="text-xl text-black md:text-4xl font-bold mb-2">
        Categorías disponibles
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mb-10"
      >
        {categoriesData.map((category) => (
          <SwiperSlide key={category.id}>
            <motion.div
              className="relative w-full h-16 rounded-lg shadow-md cursor-pointer overflow-hidden group mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              animate={
                selectedCategory.id === category.id
                  ? { scale: 5, y: -10 } // Más grande y elevado
                  : { scale: 1, y: 0 }
              }
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              onClick={() => handleCategorySelect(category)} // Cuando se selecciona una categoría
            >
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

              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white overflow-hidden">
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-lg font-semibold truncate"
                  title={category.title} // Tooltip para texto truncado
                >
                  {category.title}
                </motion.h3>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Aca quiero que este la descipcion de la caterogioa que se selecciono */}
      {selectedCategory && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
          className="my-6 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory.title}
          </h2>
          <p className="text-gray-600">{selectedCategory.description}</p>
        </motion.div>
      )}
      {/* Slider de Productos */}
      {selectedCategory && (
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -50 },
            }}
          >
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {selectedCategory.products.map((product) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    className="relative w-full h-64  rounded-lg shadow-md overflow-hidden mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                  >
                    {/* Imagen de producto */}
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Detalles del producto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white">
                      <h4 className="text-lg font-semibold">{product.title}</h4>
                      <p className="text-xs">{product.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        {/* Condición para mostrar el precio de descuento */}
                        {product.discountPrice ? (
                          <>
                            <span className="text-xl font-bold">
                              ${product.discountPrice}
                            </span>
                            <span className="text-sm line-through text-gray-400">
                              ${product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
