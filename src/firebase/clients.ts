// src/firebase/clients.ts
import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

// Types
export interface ClientData {
  id?: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  vehicle: string;
  notes?: string;
  createdAt?: Date;
}

// Get all clients
export const getClients = async () => {
  try {
    const q = query(
      collection(db, "clients"),
      orderBy("lastName"),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting clients:", error);
    throw error;
  }
};

// Get client by ID
export const getClientById = async (clientId: string) => {
  try {
    const docRef = doc(db, "clients", clientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting client:", error);
    throw error;
  }
};

// Add new client
export const addClient = async (clientData: ClientData) => {
  try {
    const docRef = await addDoc(collection(db, "clients"), {
      ...clientData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

// Update client
export const updateClient = async (
  clientId: string,
  clientData: Partial<ClientData>
) => {
  try {
    await updateDoc(doc(db, "clients", clientId), clientData);
    return true;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

// Delete client
export const deleteClient = async (clientId: string) => {
  try {
    await deleteDoc(doc(db, "clients", clientId));
    return true;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

// Search clients by name, lastName or email
export const searchClients = async (searchTerm: string) => {
  try {
    const q = query(
      collection(db, "clients"),
      orderBy("lastName"),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);

    // Client-side filtering for simple search functionality
    const searchLower = searchTerm.toLowerCase();

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((client: any) => {
        return (
          client.name.toLowerCase().includes(searchLower) ||
          client.lastName.toLowerCase().includes(searchLower) ||
          (client.email && client.email.toLowerCase().includes(searchLower))
        );
      });
  } catch (error) {
    console.error("Error searching clients:", error);
    throw error;
  }
};
