// src/firebase/appointments.ts
import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  Timestamp,
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: Date;
  notes?: string;
}

// Añadir una nueva cita
export const addAppointment = async (appointmentData: AppointmentData) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      createdAt: new Date(),
      status: "pending",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding appointment:", error);
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

// Actualizar estado de una cita
export const updateAppointmentStatus = async (
  appointmentId: string,
  status: "pending" | "confirmed" | "completed" | "cancelled",
  notes?: string
) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    const updateData: { status: string; notes?: string } = { status };

    if (notes) {
      updateData.notes = notes;
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
