// src/app/(dashboard)/dashboard/productos/[id]/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { updateProduct } from "@/firebase/products";
import Image from "next/image";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
  });

  const [currentImage, setCurrentImage] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            category: data.category || "",
            description: data.description || "",
            price: data.price || "",
            discountPrice: data.discountPrice || "",
            stock: data.stock?.toString() || "",
          });

          if (data.image) {
            setCurrentImage(data.image);
          }

          // Si la categoría no está en la lista predefinida
          if (data.category && !predefinedCategories.includes(data.category)) {
            setNewCategory(data.category);
            setFormData((prev) => ({ ...prev, category: "other" }));
          }
        } else {
          alert("No se encontró el producto");
          router.push("/dashboard/productos");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

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

  // src/app/(dashboard)/dashboard/productos/[id]/page.tsx (continuación)
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
    setSaving(true);

    try {
      const category =
        formData.category === "other" ? newCategory : formData.category;

      await updateProduct(
        productId,
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

      alert("Producto actualizado correctamente");
      router.push("/dashboard/productos");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error al actualizar el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Editar Producto</h1>
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

            {currentImage && !imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Imagen actual:</p>
                <div className="h-48 w-48 relative">
                  <Image
                    src={currentImage}
                    alt="Imagen actual"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
              >
                {currentImage ? "Cambiar imagen" : "Seleccionar imagen"}
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
                  : "Ningún archivo nuevo seleccionado"}
              </span>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Nueva imagen:</p>
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
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {saving ? "Guardando..." : "Actualizar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
