// src/components/dashboard/Sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaCalendarAlt,
  FaSprayCan,
  FaChartBar,
  FaUsers,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Panel Principal", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Citas", path: "/dashboard/citas", icon: <FaCalendarAlt /> },
    { name: "Productos", path: "/dashboard/productos", icon: <FaSprayCan /> },
    { name: "Clientes", path: "/dashboard/clientes", icon: <FaUsers /> },
    {
      name: "Configuración",
      path: "/dashboard/configuracion",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Carwash Admin</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link href={item.path}>
                <div
                  className={`flex items-center px-4 py-3 ${
                    pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
