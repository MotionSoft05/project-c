// components/ProductModal.tsx
import Image from "next/image"; // Importa Image si usas Next.js
import { FC } from "react";
import { motion } from "framer-motion";
interface Product {
  id: number;
  title: string;
  image: string;
  details: string;
  description: string;
  price: string;
}
interface Subcategory {
  id: number;
  title: string;
  image: string;
  products: Product[];
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTitle: string;
  subcategories: Subcategory[]; // Aquí usas la interfaz Subcategory
  onSubcategoryClick: (subcategory: Subcategory) => void;
  onProductClick: (product: Product) => void;
  selectedSubcategory?: Subcategory;
}

const ProductModal: FC<ProductModalProps> = ({
  isOpen,
  onClose,
  categoryTitle,
  subcategories,
  onSubcategoryClick,
  onProductClick,
  selectedSubcategory,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-6 rounded-lg max-w-lg w-11/12  mx-4 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{categoryTitle}</h2>
          <button
            onClick={onClose}
            className="text-xl font-semibold text-gray-500 hover:text-gray-800"
          >
            X
          </button>
        </div>

        <div className="mt-4 overflow-y-auto max-h-[70vh]">
          {selectedSubcategory ? (
            <div>
              <h3 className="text-lg font-semibold">
                {selectedSubcategory.title}
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr className="text-sm leading-normal">
                      <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-gray-600 border-b border-gray-200 text-center sm:text-left">
                        Imagen
                      </th>
                      <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-gray-600 border-b border-gray-200 text-center sm:text-left">
                        Nombre
                      </th>
                      <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-gray-600 border-b border-gray-200 text-center sm:text-left">
                        Descripción
                      </th>
                      <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-gray-600 border-b border-gray-200 text-right">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSubcategory.products.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-100"
                        onClick={() => onProductClick(product)}
                      >
                        <td className="py-2 px-4 border-b border-gray-200 text-center sm:text-left">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={50} // tamaño de la imagen
                            height={50}
                            className="object-cover"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center sm:text-left">
                          {product.title}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center sm:text-left">
                          {product.description}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right">
                          ${product.price} Pesos argentinos
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mt-4">
                {subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="relative w-full h-32 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => onSubcategoryClick(subcategory)}
                  >
                    {/* Imagen de fondo */}
                    {subcategory.image && (
                      <Image
                        src={subcategory.image}
                        alt={subcategory.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    )}

                    {/* Título en el medio */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4">
                      <h4 className="text-lg font-semibold">
                        {subcategory.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
