// src/app/(dashboard)/dashboard/clientes/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getClientById, updateClient } from "@/firebase/clients";

// Define the Client interface to match the expected structure
interface Client {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  vehicle: string;
  notes: string;
  [key: string]: any; // To allow for additional properties
}

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    vehicle: "",
    notes: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const client = (await getClientById(clientId)) as Client;
        if (client) {
          setFormData({
            name: client.name || "",
            lastName: client.lastName || "",
            phone: client.phone || "",
            email: client.email || "",
            vehicle: client.vehicle || "",
            notes: client.notes || "",
          });
        } else {
          alert("Cliente no encontrado");
          router.push("/dashboard/clientes");
        }
      } catch (error) {
        console.error("Error fetching client:", error);
        alert("Error al cargar los datos del cliente");
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateClient(clientId, {
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        vehicle: formData.vehicle,
        notes: formData.notes,
      });

      alert("Cliente actualizado correctamente");
      router.push("/dashboard/clientes");
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Error al actualizar el cliente");
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
        <h1 className="text-2xl font-bold">Editar Cliente</h1>
        <button
          onClick={() => router.push("/dashboard/clientes")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre*
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

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono*
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Vehículo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehículo*
            </label>
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Marca y modelo"
              required
            />
          </div>

          {/* Notas */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md h-32"
              placeholder="Información adicional sobre el cliente"
            />
          </div>

          {/* Botón de guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
