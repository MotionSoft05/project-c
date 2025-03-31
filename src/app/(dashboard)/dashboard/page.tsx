// src/app/(dashboard)/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/firebase/auth";
import { getAppointments } from "@/firebase/appointments";
import { getPendingAppointments } from "@/firebase/appointments";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

// Definición de interfaz para las citas
interface Appointment {
  id: string;
  clientName: string;
  clientLastName: string;
  contactNumber: string;
  vehicle: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rejected";
  services: string[];
}

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    rejected: 0,
    total: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todas las citas
        const appointmentsData = (await getAppointments()) as Appointment[];
        setAppointments(appointmentsData);

        // Obtener solicitudes pendientes
        const pendingData = (await getPendingAppointments()) as Appointment[];
        setPendingRequests(pendingData);

        // Calcular estadísticas
        const pending = appointmentsData.filter(
          (app) => app.status === "pending"
        ).length;
        const confirmed = appointmentsData.filter(
          (app) => app.status === "confirmed"
        ).length;
        const completed = appointmentsData.filter(
          (app) => app.status === "completed"
        ).length;
        const cancelled = appointmentsData.filter(
          (app) => app.status === "cancelled"
        ).length;
        const rejected = appointmentsData.filter(
          (app) => app.status === "rejected"
        ).length;

        setStats({
          pending,
          confirmed,
          completed,
          cancelled,
          rejected,
          total: appointmentsData.length,
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Carwash</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Notificación de solicitudes pendientes */}
      {pendingRequests.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaBell className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Tienes <strong>{pendingRequests.length}</strong> solicitudes
                pendientes por revisar
              </p>
            </div>
            <div className="ml-auto">
              <Link
                href="/dashboard/solicitudes"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Ver solicitudes
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Confirmadas</h3>
          <p className="text-3xl font-bold text-green-500">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Completadas</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Canceladas</h3>
          <p className="text-3xl font-bold text-red-500">
            {stats.cancelled + stats.rejected}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total</h3>
          <p className="text-3xl font-bold text-gray-700">{stats.total}</p>
        </div>
      </div>

      {/* Solicitudes pendientes (vista previa) */}
      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Solicitudes Pendientes</h2>
            <Link
              href="/dashboard/solicitudes"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Ver todas
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha/Hora Solicitada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingRequests.slice(0, 3).map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.clientName} {request.clientLastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.contactNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.vehicle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.appointmentDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.appointmentTime}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {request.services
                          .slice(0, 2)
                          .map((service: string, i: number) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                            >
                              {service}
                            </span>
                          ))}
                        {request.services.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{request.services.length - 2} más
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/citas/${request.id}?action=approve`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Revisar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Citas recientes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Citas Recientes</h2>
          <Link
            href="/dashboard/citas"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Ver todas
          </Link>
        </div>

        {appointments.filter((app) => app.status === "confirmed").length ===
        0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay citas confirmadas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments
                  .filter((app) => app.status === "confirmed")
                  .slice(0, 5)
                  .map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.clientName} {appointment.clientLastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.contactNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.vehicle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.appointmentDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.appointmentTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            appointment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : appointment.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status === "pending"
                            ? "Pendiente"
                            : appointment.status === "confirmed"
                              ? "Confirmado"
                              : appointment.status === "completed"
                                ? "Completado"
                                : "Cancelado"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/dashboard/citas/${appointment.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
