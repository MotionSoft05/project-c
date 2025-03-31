// src/firebase/createAdmin.ts
import { registerAdmin } from "./auth";

export const createDefaultAdmin = async () => {
  try {
    // Usa variables de entorno para las credenciales
    const email = process.env.NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL;
    const password = process.env.NEXT_PUBLIC_DEFAULT_ADMIN_PASSWORD;
    const name = process.env.NEXT_PUBLIC_DEFAULT_ADMIN_NAME;

    if (!email || !password || !name) {
      console.error("Admin credentials not found in environment variables");
      return;
    }

    await registerAdmin(email, password, name);
    console.log("Default admin account created successfully");
  } catch (error: any) {
    // Si el error es porque el usuario ya existe, no hacer nada
    if (error.code === "auth/email-already-in-use") {
      console.log("Admin account already exists");
    } else {
      console.error("Error creating admin account:", error);
    }
  }
};
