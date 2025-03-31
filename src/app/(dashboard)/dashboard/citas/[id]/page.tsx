// src/app/(dashboard)/dashboard/citas/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const docRef = doc(db, "appointments", appointmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAppointment(data);
          setNotes(data.notes || "");
          setStatus(data.status);
        } else {
          alert("No se encontró la cita");
          router.push("/dashboard/citas");
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId, router]);

  const handleSave = async () => {
    try {
      const docRef = doc(db, "appointments", appointmentId);
      await updateDoc(docRef, {
        status,
        notes,
      });

      alert("Cita actualizada correctamente");
      router.push("/dashboard/citas");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Error al actualizar la cita");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-6">
        <p className="text-xl text-red-500">Cita no encontrada</p>
        <button
          onClick={() => router.push("/dashboard/citas")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a citas
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles de la Cita</h1>
        <button
          onClick={() => router.push("/dashboard/citas")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Información del cliente */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">
            Información del Cliente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre completo</p>
              <p className="text-lg font-medium">
                {appointment.clientName} {appointment.clientLastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Número de contacto</p>
              <p className="text-lg font-medium">{appointment.contactNumber}</p>
            </div>
          </div>
        </div>

        {/* Información del vehículo */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">
            Información del Vehículo
          </h2>
          <div>
            <p className="text-sm text-gray-500">Vehículo</p>
            <p className="text-lg font-medium">{appointment.vehicle}</p>
          </div>
        </div>

        {/* Información de la cita */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Detalles de la Cita</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="text-lg font-medium">
                {appointment.appointmentDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora</p>
              <p className="text-lg font-medium">
                {appointment.appointmentTime}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Servicios</p>
            <div className="flex flex-wrap gap-2">
              {appointment.services.map((service: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Estado</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md px-3 py-2 w-full max-w-xs"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmado</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Notas */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Notas</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded-md px-3 py-2 w-full h-32"
            placeholder="Añadir notas (opcional)"
          />
        </div>

        {/* Botones de acción */}
        <div className="p-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
