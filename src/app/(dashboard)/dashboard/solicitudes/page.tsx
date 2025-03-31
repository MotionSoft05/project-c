// src/app/(dashboard)/dashboard/solicitudes/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPendingAppointments,
  updateAppointmentStatus,
} from "@/firebase/appointments";
import {
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaEdit,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

export default function PendingAppointmentsPage() {
  const [pendingAppointments, setPendingAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    try {
      setLoading(true);
      const appointments = await getPendingAppointments();
      setPendingAppointments(appointments);
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (processingId) return;

    setProcessingId(id);
    try {
      await updateAppointmentStatus(id, "confirmed");
      // Actualizar la lista
      setPendingAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== id)
      );
      alert("Solicitud confirmada con éxito");
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Error al confirmar la solicitud");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (processingId) return;

    if (window.confirm("¿Está seguro de que desea rechazar esta solicitud?")) {
      setProcessingId(id);
      try {
        await updateAppointmentStatus(
          id,
          "rejected",
          undefined,
          "Solicitud rechazada por el administrador"
        );
        // Actualizar la lista
        setPendingAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app.id !== id)
        );
        alert("Solicitud rechazada");
      } catch (error) {
        console.error("Error rejecting appointment:", error);
        alert("Error al rechazar la solicitud");
      } finally {
        setProcessingId(null);
      }
    }
  };

  const formatPhoneForWhatsApp = (phone: string) => {
    // Quitar espacios, +, guiones y paréntesis
    return phone.replace(/\s+/g, "").replace(/[+()-]/g, "");
  };

  const generateWhatsAppLink = (phone: string, name: string) => {
    const formattedPhone = formatPhoneForWhatsApp(phone);
    const message = encodeURIComponent(
      `Hola ${name}, nos comunicamos de Carwash para confirmar tu solicitud de lavado.`
    );
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <span className="ml-3">Cargando solicitudes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Solicitudes Pendientes</h1>

      {pendingAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No hay solicitudes pendientes.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pendingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {appointment.clientName} {appointment.clientLastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Solicitado el{" "}
                    {new Date(
                      appointment.createdAt.toDate()
                    ).toLocaleDateString()}{" "}
                    a las{" "}
                    {new Date(
                      appointment.createdAt.toDate()
                    ).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={generateWhatsAppLink(
                      appointment.contactNumber,
                      appointment.clientName
                    )}
                    target="_blank"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    title="Contactar por WhatsApp"
                  >
                    <FaWhatsapp />
                  </Link>
                  <Link
                    href={`tel:${formatPhoneForWhatsApp(appointment.contactNumber)}`}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    title="Llamar"
                  >
                    <FaPhone />
                  </Link>
                  <Link
                    href={`/dashboard/citas/${appointment.id}`}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    title="Editar"
                  >
                    <FaEdit />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Vehículo
                    </h3>
                    <p className="text-base">{appointment.vehicle}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Contacto
                    </h3>
                    <p className="text-base">{appointment.contactNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Fecha solicitada
                    </h3>
                    <p className="text-base">{appointment.appointmentDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Hora solicitada
                    </h3>
                    <p className="text-base">{appointment.appointmentTime}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Servicios solicitados
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {appointment.services.map(
                      (service: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {service}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleReject(appointment.id)}
                    disabled={processingId === appointment.id}
                    className="flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                  >
                    <FaTimes className="mr-2" />
                    Rechazar
                  </button>
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/citas/${appointment.id}?action=approve`
                      )
                    }
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Revisar y Programar
                  </button>
                  <button
                    onClick={() => handleApprove(appointment.id)}
                    disabled={processingId === appointment.id}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <FaCheck className="mr-2" />
                    Confirmar
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
