// src/firebase/appointments.ts
import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// Tipos
export interface AppointmentData {
  clientName: string;
  clientLastName: string;
  contactNumber: string;
  vehicle: string;
  appointmentDate: string;
  appointmentTime: string;
  services: string[];
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rejected";
  createdAt?: any;
  notes?: string;
  adminNotes?: string;
  ipAddress?: string; // Para prevención de spam
  lastSubmission?: any; // Para prevención de spam
}

// Añadir una nueva cita
export const addAppointment = async (
  appointmentData: AppointmentData,
  ipAddress: string
) => {
  try {
    // Verificar si hay envíos recientes desde la misma IP (anti-spam)
    const recentSubmission = await checkRecentSubmission(ipAddress);
    if (recentSubmission) {
      throw new Error(
        "Por favor espere unos minutos antes de enviar otra solicitud"
      );
    }

    // Verificar si la fecha y hora ya están reservadas
    const isTimeSlotAvailable = await checkTimeSlotAvailability(
      appointmentData.appointmentDate,
      appointmentData.appointmentTime
    );

    if (!isTimeSlotAvailable) {
      throw new Error(
        "El horario seleccionado ya no está disponible. Por favor elija otro."
      );
    }

    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      createdAt: serverTimestamp(),
      status: "pending",
      ipAddress: ipAddress,
      lastSubmission: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};

// Verificar si hay envíos recientes desde la misma IP (anti-spam)
const checkRecentSubmission = async (ipAddress: string) => {
  try {
    // Buscar envíos en los últimos 5 minutos desde la misma IP
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    const q = query(
      collection(db, "appointments"),
      where("ipAddress", "==", ipAddress),
      where("lastSubmission", ">=", fiveMinutesAgo)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking recent submission:", error);
    // En caso de error, permitir el envío
    return false;
  }
};

// Verificar si un horario está disponible
export const checkTimeSlotAvailability = async (date: string, time: string) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("appointmentDate", "==", date),
      where("appointmentTime", "==", time),
      where("status", "in", ["confirmed", "pending"])
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // Disponible si no hay citas
  } catch (error) {
    console.error("Error checking time slot availability:", error);
    throw error;
  }
};

// Obtener todos los horarios ocupados para una fecha
export const getOccupiedTimeSlots = async (date: string) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("appointmentDate", "==", date),
      where("status", "in", ["confirmed", "pending"])
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data().appointmentTime);
  } catch (error) {
    console.error("Error getting occupied time slots:", error);
    throw error;
  }
};

// Obtener todas las citas
export const getAppointments = async () => {
  try {
    const q = query(
      collection(db, "appointments"),
      orderBy("appointmentDate", "asc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting appointments:", error);
    throw error;
  }
};

// Obtener citas por fecha
export const getAppointmentsByDate = async (date: string) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("appointmentDate", "==", date),
      orderBy("appointmentTime", "asc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting appointments by date:", error);
    throw error;
  }
};

// Obtener citas pendientes
export const getPendingAppointments = async () => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting pending appointments:", error);
    throw error;
  }
};

// Actualizar estado de una cita
export const updateAppointmentStatus = async (
  appointmentId: string,
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rejected",
  notes?: string,
  adminNotes?: string,
  newDate?: string,
  newTime?: string
) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    const updateData: any = { status };

    if (notes) {
      updateData.notes = notes;
    }

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    if (newDate) {
      updateData.appointmentDate = newDate;
    }

    if (newTime) {
      updateData.appointmentTime = newTime;
    }

    await updateDoc(appointmentRef, updateData);
    return true;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

// Eliminar una cita
export const deleteAppointment = async (appointmentId: string) => {
  try {
    await deleteDoc(doc(db, "appointments", appointmentId));
    return true;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};
