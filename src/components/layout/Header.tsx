import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Carwash</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <a href="/api/lavados" className="text-blue-600 hover:underline">
                Lavados
              </a>
            </li>
            <li>
              <a href="/api/peticion" className="text-blue-600 hover:underline">
                Peticiones
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
