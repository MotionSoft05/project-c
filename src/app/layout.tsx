import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

// Importa componentes comunes
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Importar la fuente Oxanium
const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carwash App",
  description: "Sistema avanzado para gestión de lavado de autos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.variable} antialiased bg-gray-100 text-gray-900`}
      >
        {/* Header común */}
        <Header />

        {/* Contenido dinámico */}
        <main className="">{children}</main>

        {/* Footer común */}
        <Footer />
      </body>
    </html>
  );
}
