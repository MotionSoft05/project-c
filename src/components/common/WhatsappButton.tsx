// src/components/common/WhatsappButton.tsx
"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function WhatsappButton() {
  const [whatsappConfig, setWhatsappConfig] = useState({
    number: "543364003017",
    message: "Hola, me gustaría más información.",
  });

  useEffect(() => {
    const fetchWhatsappConfig = async () => {
      try {
        const docRef = doc(db, "settings", "general");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWhatsappConfig({
            number: data.whatsappNumber || whatsappConfig.number,
            message: data.whatsappMessage || whatsappConfig.message,
          });
        }
      } catch (error) {
        console.error("Error fetching WhatsApp settings:", error);
      }
    };

    fetchWhatsappConfig();
  }, []);

  const encodedMessage = encodeURIComponent(whatsappConfig.message);
  const whatsappUrl = `https://wa.me/${whatsappConfig.number}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  );
}
