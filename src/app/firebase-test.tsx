// src/app/firebase-test.tsx
"use client";
import { useEffect, useState } from "react";
// Solo importamos las funciones que realmente usamos
import { addAppointment } from "@/firebase/appointments";

export default function FirebaseTest() {
  const [message, setMessage] = useState("Probando conexión con Firebase...");

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Intenta añadir un documento de prueba
        // Asumiendo que addAppointment requiere 2 argumentos (datos y un ID o userID)
        // Enviamos null o string vacío como segundo argumento
        const testId = await addAppointment(
          {
            clientName: "Test",
            clientLastName: "User",
            contactNumber: "123456789",
            vehicle: "Test Car",
            appointmentDate: "2025-04-01",
            appointmentTime: "10:00",
            services: ["Lavado básico"],
            status: "pending",
          },
          "" // Este es el segundo argumento requerido, podría ser un userID o similar
        );

        if (testId) {
          setMessage(
            "¡Conexión con Firebase exitosa! ID del documento: " + testId
          );
        }
      } catch (error: any) {
        setMessage("Error al conectar con Firebase: " + error.message);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Test de Firebase</h1>
      <p>{message}</p>
    </div>
  );
}
