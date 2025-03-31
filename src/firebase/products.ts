// src/firebase/products.ts
import { db, storage } from "./config";
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
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Interfaces
export interface ProductData {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: string;
  discountPrice?: string;
  image?: string;
  stock?: number;
}

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("category"),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category: string) => {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};

// Añadir un nuevo producto
export const addProduct = async (
  productData: ProductData,
  imageFile?: File
) => {
  try {
    let imageUrl = "";

    // Si hay imagen, subirla a Storage
    if (imageFile) {
      const storageRef = ref(
        storage,
        `products/${Date.now()}_${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      image: imageUrl || productData.image || "",
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (
  productId: string,
  productData: Partial<ProductData>,
  imageFile?: File
) => {
  try {
    let updateData = { ...productData };

    // Si hay una nueva imagen, subirla y actualizar la URL
    if (imageFile) {
      // Obtener la URL de la imagen anterior
      const productDoc = await getDoc(doc(db, "products", productId));
      const oldImageUrl = productDoc.data()?.image;

      // Subir la nueva imagen
      const storageRef = ref(
        storage,
        `products/${Date.now()}_${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);
      const newImageUrl = await getDownloadURL(storageRef);

      // Actualizar datos con la nueva URL
      updateData.image = newImageUrl;

      // Eliminar la imagen anterior si existe
      if (oldImageUrl) {
        try {
          const oldImageRef = ref(storage, oldImageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.warn("Error deleting old image:", error);
        }
      }
    }

    // Actualizar documento
    await updateDoc(doc(db, "products", productId), updateData);
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId: string) => {
  try {
    // Obtener la URL de la imagen
    const productDoc = await getDoc(doc(db, "products", productId));
    const imageUrl = productDoc.data()?.image;

    // Eliminar la imagen de Storage si existe
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.warn("Error deleting image:", error);
      }
    }

    // Eliminar el documento
    await deleteDoc(doc(db, "products", productId));
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
