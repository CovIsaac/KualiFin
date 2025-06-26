import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // padding dinámico en desktop según ancho del sidebar
  const desktopPadding = sidebarOpen ? 'md:pl-56' : 'md:pl-16';

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center h-16 px-6 bg-white shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="text-slate-800 focus:outline-none mr-4"
        >
          {sidebarOpen ? (
            /* icono cerrar */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            /* icono abrir */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>

        <img src="/images/Logo.png" alt="Logo" className="h-10 w-auto object-contain" />
      </header>

      {/* Backdrop sólo en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-16 bottom-0 left-0 z-40 bg-white shadow-md flex flex-col justify-between overflow-hidden

            /* móvil: deslizante */
            transition-transform duration-200 ease-out
            ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}

            /* desktop: ancho animado, sin transform */
            md:translate-x-0
            md:transition-all md:duration-200 md:ease-out
            ${sidebarOpen ? 'md:w-56' : 'md:w-16'}
          `}
        >
          <nav className="flex flex-col gap-2 px-2 mt-4">
            <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
            <NavLink href={route('solicitud')}  icon="📋" text="Solicitud"  collapsed={!sidebarOpen} />
            <NavLink href={route('nuevoCliente')} icon="👥" text="Clientes" collapsed={!sidebarOpen} />
            <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
            <NavLink href="#" icon="⚙️" text="Configuración" collapsed={!sidebarOpen} />
          </nav>

          {sidebarOpen && (
            <div className="px-2 pb-4 border-t border-slate-200">
              <div className="mt-4 text-sm text-slate-700">{auth.user.name}</div>
              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="mt-2 w-full text-left text-sm text-red-600 hover:underline"
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </aside>

        {/* Contenido principal */}
        <main
          className={`
            flex-1 bg-gray-100 min-h-screen
            transition-all duration-200 ease-out
            pl-0 ${desktopPadding} pr-4
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
  const base = `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition duration-150 ${
    isActive
      ? 'bg-slate-200 text-blue-700 font-semibold border-l-4 border-blue-600 shadow-md'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`;
  return isActive ? (
    <span className={base} aria-current="page">
      <span className="flex items-center justify-center w-10 h-10 text-lg">{icon}</span>
      {!collapsed && <span className="whitespace-nowrap">{text}</span>}
    </span>
  ) : (
    <Link href={href} className={base}>
      <span className="flex items-center justify-center w-10 h-10 text-lg">{icon}</span>
      {!collapsed && <span className="whitespace-nowrap">{text}</span>}
    </Link>
  );
}
