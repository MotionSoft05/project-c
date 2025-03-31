// src/app/(dashboard)/dashboard/productos/nuevo/page.tsx
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/firebase/products";

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Lista predefinida de categorías
  const predefinedCategories = [
    "CERAS LÍQUIDAS",
    "LAVA AUTOS",
    "LIMPIADORES",
    "REVIVIDOR DE INTERIORES",
    "REVITALIZADOR DE EXTERIORES",
    "LÍNEA PROFESIONAL",
    "ENVASES",
    "AEROSOLES",
    "PERFUMES",
    "AROMATIZANTES",
    "SELLADORES",
    "ACCESORIOS DE LIMPIEZA",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Crear preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const category =
        formData.category === "other" ? newCategory : formData.category;

      await addProduct(
        {
          name: formData.name,
          category,
          description: formData.description,
          price: formData.price,
          discountPrice: formData.discountPrice || undefined,
          stock: formData.stock ? parseInt(formData.stock) : undefined,
        },
        selectedFile || undefined
      );

      alert("Producto añadido correctamente");
      router.push("/dashboard/productos");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error al añadir el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Añadir Nuevo Producto</h1>
        <button
          onClick={() => router.push("/dashboard/productos")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nombre del producto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del producto*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Seleccionar categoría</option>
                {predefinedCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="other">Otra categoría</option>
              </select>

              {formData.category === "other" && (
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md mt-2"
                  placeholder="Escribe la nueva categoría"
                  required
                />
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio*
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="ej: 5000"
                required
              />
            </div>

            {/* Precio con descuento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio con descuento
              </label>
              <input
                type="text"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="ej: 4500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="ej: 10"
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del producto
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
              >
                Seleccionar imagen
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <span className="text-sm text-gray-500">
                {selectedFile
                  ? selectedFile.name
                  : "Ningún archivo seleccionado"}
              </span>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
                <div className="h-48 w-48 relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Botón de guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? "Guardando..." : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
