import { FaWhatsapp } from "react-icons/fa"; // Icono de WhatsApp
import Link from "next/link";

export default function WhatsappButton() {
  const whatsappNumber = "543364003017"; // Número con código de país (ej: +52)
  const message = encodeURIComponent("Hola, me gustaría más información."); // Mensaje predeterminado

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  );
}
