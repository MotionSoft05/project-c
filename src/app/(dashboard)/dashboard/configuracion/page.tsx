// src/app/(dashboard)/dashboard/configuracion/page.tsx
"use client";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "Carwash",
    address: "Olleros 733, San Nicolas de los Arroyos",
    phone: "+54 9 336 452-2835",
    workingHours: "Lunes a Viernes - 9:00 AM a 6:00 PM",
    instagramUrl: "https://www.instagram.com/car.wash.sn",
    facebookUrl:
      "https://www.facebook.com/p/car-wash-lavadero-vehicular-olleros-61558018785810",
    whatsappNumber: "543364003017",
    whatsappMessage: "Hola, me gustaría más información.",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "general");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSettings({ ...settings, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(doc(db, "settings", "general"), settings);
      alert("Configuración guardada correctamente");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error al guardar la configuración");
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
      <h1 className="text-2xl font-bold mb-6">Configuración General</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nombre del negocio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del negocio
              </label>
              <input
                type="text"
                name="businessName"
                value={settings.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Horario de trabajo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de trabajo
              </label>
              <input
                type="text"
                name="workingHours"
                value={settings.workingHours}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">Redes Sociales</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de Instagram
              </label>
              <input
                type="text"
                name="instagramUrl"
                value={settings.instagramUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de Facebook
              </label>
              <input
                type="text"
                name="facebookUrl"
                value={settings.facebookUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">
            Configuración de WhatsApp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Número de WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de WhatsApp (sin espacios ni símbolos)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Ej: 5491123456789"
              />
            </div>

            {/* Mensaje predeterminado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje predeterminado
              </label>
              <textarea
                name="whatsappMessage"
                value={settings.whatsappMessage}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md h-20"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {saving ? "Guardando..." : "Guardar configuración"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
