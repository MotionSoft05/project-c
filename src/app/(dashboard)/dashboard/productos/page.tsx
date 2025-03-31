// src/app/(dashboard)/dashboard/productos/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/firebase/products";
import Link from "next/link";
import Image from "next/image";

// Definición de interfaz para los productos
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image?: string;
  stock?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = (await getProducts()) as Product[];
        setProducts(productsData);

        // Extraer categorías únicas
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((product) => product.category === categoryFilter);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <Link href="/dashboard/productos/nuevo">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Añadir Producto
          </button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <label className="mr-3">Filtrar por categoría:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="all">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No hay productos que coincidan con el filtro seleccionado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Sin imagen</p>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ${product.discountPrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  {product.stock !== undefined && (
                    <span
                      className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Sin stock"}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <Link href={`/dashboard/productos/${product.id}`}>
                    <button className="text-blue-600 hover:text-blue-900">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
