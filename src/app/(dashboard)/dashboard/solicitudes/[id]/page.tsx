// src/app/(dashboard)/dashboard/citas/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  updateAppointmentStatus,
  getOccupiedTimeSlots,
} from "@/firebase/appointments";
import {
  FaCheck,
  FaTimes,
  FaWhatsapp,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";

// Generar horarios disponibles (cada 30 minutos de 8:00 a 18:00)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 18; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    slots.push(`${hourStr}:00`);
    if (hour < 18) {
      slots.push(`${hourStr}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const appointmentId = params.id as string;

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(false);
  const [notes, setNotes] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] =
    useState<string[]>(timeSlots);
  const [showReschedule, setShowReschedule] = useState(false);

  useEffect(() => {
    if (action === "approve") {
      setShowReschedule(true);
    }
  }, [action]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const docRef = doc(db, "appointments", appointmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAppointment(data);
          setNotes(data.notes || "");
          setAdminNotes(data.adminNotes || "");
          setStatus(data.status);
          setNewDate(data.appointmentDate || "");
          setNewTime(data.appointmentTime || "");
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

  // Actualizar horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    const fetchOccupiedTimeSlots = async () => {
      if (newDate) {
        try {
          const occupied = await getOccupiedTimeSlots(newDate);
          // Filtrar el horario actual (para no bloquearlo en caso de edición)
          const filteredOccupied = occupied.filter(
            (time) =>
              !(
                appointment &&
                appointment.appointmentDate === newDate &&
                appointment.appointmentTime === time
              )
          );

          // Filtrar horarios disponibles
          const available = timeSlots.filter(
            (slot) => !filteredOccupied.includes(slot)
          );
          setAvailableTimeSlots(available);
        } catch (error) {
          console.error("Error fetching occupied time slots:", error);
        }
      } else {
        setAvailableTimeSlots(timeSlots);
      }
    };

    if (appointment) {
      fetchOccupiedTimeSlots();
    }
  }, [newDate, appointment]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(e.target.value);
    setNewTime(""); // Resetear la hora al cambiar de fecha
  };

  const handleSave = async () => {
    setProcessingAction(true);
    try {
      await updateAppointmentStatus(
        appointmentId,
        status as any,
        notes,
        adminNotes,
        newDate,
        newTime
      );

      alert("Cita actualizada correctamente");
      router.push("/dashboard/citas");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Error al actualizar la cita");
    } finally {
      setProcessingAction(false);
    }
  };

  const handleApprove = async () => {
    if (!newDate || !newTime) {
      alert("Por favor seleccione una fecha y hora para confirmar la cita");
      return;
    }

    setProcessingAction(true);
    try {
      await updateAppointmentStatus(
        appointmentId,
        "confirmed",
        notes,
        adminNotes,
        newDate,
        newTime
      );

      alert("Cita confirmada correctamente");
      router.push("/dashboard/solicitudes");
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Error al confirmar la cita");
    } finally {
      setProcessingAction(false);
    }
  };

  const handleReject = async () => {
    if (window.confirm("¿Está seguro de que desea rechazar esta solicitud?")) {
      setProcessingAction(true);
      try {
        await updateAppointmentStatus(
          appointmentId,
          "rejected",
          notes,
          adminNotes || "Solicitud rechazada por el administrador"
        );

        alert("Solicitud rechazada");
        router.push("/dashboard/solicitudes");
      } catch (error) {
        console.error("Error rejecting appointment:", error);
        alert("Error al rechazar la solicitud");
      } finally {
        setProcessingAction(false);
      }
    }
  };

  const formatPhoneForWhatsApp = (phone: string) => {
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

  const isPending = appointment.status === "pending";

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isPending ? "Revisar Solicitud" : "Detalles de la Cita"}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              router.push(
                isPending ? "/dashboard/solicitudes" : "/dashboard/citas"
              )
            }
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver
          </button>
          {isPending && (
            <>
              <Link
                href={generateWhatsAppLink(
                  appointment.contactNumber,
                  appointment.clientName
                )}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </Link>
              <Link
                href={`tel:${formatPhoneForWhatsApp(appointment.contactNumber)}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <FaPhone className="mr-2" />
                Llamar
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Estado de la solicitud */}
        <div className="p-6 bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Estado:{" "}
                {status === "pending"
                  ? "Pendiente"
                  : status === "confirmed"
                    ? "Confirmada"
                    : status === "completed"
                      ? "Completada"
                      : status === "cancelled"
                        ? "Cancelada"
                        : status === "rejected"
                          ? "Rechazada"
                          : "Desconocido"}
              </h2>
              {appointment.createdAt && (
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
              )}
            </div>

            {!isPending && (
              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded-md px-3 py-2 bg-white"
                  disabled={processingAction}
                >
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="completed">Completada</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="rejected">Rechazada</option>
                </select>
              </div>
            )}
          </div>
        </div>

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

          {showReschedule || !isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha</p>
                <input
                  type="date"
                  value={newDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="border rounded-md px-3 py-2 w-full"
                  disabled={processingAction}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Hora</p>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full"
                  disabled={!newDate || processingAction}
                >
                  <option value="">Seleccionar hora</option>
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Fecha solicitada</p>
                <p className="text-lg font-medium">
                  {appointment.appointmentDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hora solicitada</p>
                <p className="text-lg font-medium">
                  {appointment.appointmentTime}
                </p>
              </div>
            </div>
          )}

          {isPending && !showReschedule && (
            <button
              onClick={() => setShowReschedule(true)}
              className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaCalendarAlt className="mr-1" /> Cambiar fecha/hora
            </button>
          )}

          <div className="mb-4 mt-4">
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
        </div>

        {/* Notas */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Notas del Cliente</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded-md px-3 py-2 w-full h-24"
            placeholder="Notas proporcionadas por el cliente (opcional)"
            disabled={processingAction}
          />
        </div>

        {/* Notas administrativas */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Notas Administrativas</h2>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            className="border rounded-md px-3 py-2 w-full h-24"
            placeholder="Notas internas para el equipo (no visibles para el cliente)"
            disabled={processingAction}
          />
        </div>

        {/* Botones de acción */}
        <div className="p-6 flex justify-end">
          {isPending ? (
            <>
              <button
                onClick={handleReject}
                disabled={processingAction}
                className="flex items-center mr-4 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
              >
                <FaTimes className="mr-2" />
                Rechazar Solicitud
              </button>
              <button
                onClick={handleApprove}
                disabled={processingAction || !newDate || !newTime}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <FaCheck className="mr-2" />
                Confirmar Cita
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              disabled={processingAction}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {processingAction ? "Guardando..." : "Guardar Cambios"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
