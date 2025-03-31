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
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Panel Principal", path: "/dashboard", icon: <FaChartBar /> },
    {
      name: "Solicitudes",
      path: "/dashboard/solicitudes",
      icon: <FaCalendarAlt />,
    },
    { name: "Citas", path: "/dashboard/citas", icon: <FaCalendarAlt /> },
    { name: "Productos", path: "/dashboard/productos", icon: <FaSprayCan /> },
    { name: "Clientes", path: "/dashboard/clientes", icon: <FaUsers /> },
    {
      name: "Configuración",
      path: "/dashboard/configuracion",
      icon: <FaCog />,
    },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out bg-gray-800 text-white h-screen ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h2 className="text-2xl font-bold">Carwash Admin</h2>}
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded hover:bg-gray-700"
        >
          {collapsed ? <FaBars /> : <FaChevronLeft />}
        </button>
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
                  <span className={collapsed ? "mx-auto" : "mr-3"}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.name}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
