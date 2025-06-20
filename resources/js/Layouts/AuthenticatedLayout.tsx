import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '@/assets/Logo.png'

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // para padding-left dinámico según el ancho del sidebar
  const mainPadding = sidebarOpen ? 'md:pl-56' : 'md:pl-16';

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center h-15 px-6 shadow
             bg-white text-white">
        {/* Toggle sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="text-white focus:outline-none md:block hidden mr-4"
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Logo */}
        <img src="/images/Logo.png" alt='Logo' className=' h-16 w-auto object-contain'/>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`
            bg-white-500 fixed top-16 left-0 bottom-0
            shadow-md flex flex-col justify-between
            transition-all duration-300 ease-in-out 
            ${sidebarOpen ? 'w-56' : 'w-16'}
            overflow-hidden z-20
          `}
        >
          <div>
            {/* Logo reducida cuando el sidebar está abierto */}
            {sidebarOpen}
            <div />

            {/* Navegación */}
            <nav className="flex flex-col gap-2 px-2">
              <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
              <NavLink href={route('solicitud')} icon="📋" text="Solicitud" collapsed={!sidebarOpen} />
              <NavLink href={route('nuevoCliente')} icon="👥" text="Clientes" collapsed={!sidebarOpen} />
              <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
              <NavLink href="#" icon="⚙️" text="Configuración" collapsed={!sidebarOpen} />
            </nav>
          </div>

          {/* User info y logout */}
          <div className="px-2 pb-4">
            {sidebarOpen && (
              <div className="border-t border-slate-200 pt-4">
                <div className="text-sm text-slate-700 mb-2">
                  {auth.user.name}
                </div>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="w-full text-left text-sm text-red-600 hover:underline"
                >
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`
            flex-1 bg-gray-100 min-h-screen transition-all
            duration-300 ease-in-out ${mainPadding}
            pt-6
          `}
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  text,
  collapsed,
}: {
  href: string;
  icon: string;
  text: string;
  collapsed: boolean;
}) {
  const { url } = usePage();
  const isActive = url === href;

  const baseClasses = `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ${
    isActive
      ? 'bg-slate-200 text-blue-700 font-semibold border-l-4 border-blue-600 shadow-md cursor-default select-none'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
  }`;

  const iconSpan = (
    <span className="flex items-center justify-center w-10 h-10 text-lg select-none" style={{ lineHeight: 1 }}>
      {icon}
    </span>
  );

  if (isActive) {
    return (
      <span className={baseClasses} aria-current="page" tabIndex={-1}>
        {iconSpan}
        {!collapsed && <span className="whitespace-nowrap">{text}</span>}
      </span>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {iconSpan}
      {!collapsed && <span className="whitespace-nowrap">{text}</span>}
    </Link>
  );
}
