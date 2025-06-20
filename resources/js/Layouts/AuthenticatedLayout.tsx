import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarWidth = sidebarOpen ? 'w-56' : 'w-16';
  const mainMargin = sidebarOpen ? 'md:ml-56' : 'md:ml-16';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 shadow-md flex flex-col transition-width duration-300 ease-in-out overflow-hidden ${sidebarWidth}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          {!sidebarOpen ? (
            <span className="text-xl font-bold text-blue-600">KualiFin</span>
          ) : (
            <span className="text-lg font-bold text-blue-600">KualiFin</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="text-slate-600 focus:outline-none"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
          <NavLink href={route('solicitud')} icon="📋" text="Solicitud" collapsed={!sidebarOpen} />
          <NavLink href="#" icon="👥" text="Clientes" collapsed={!sidebarOpen} />
          <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
          <NavLink href="#" icon="⚙️" text="Configuración" collapsed={!sidebarOpen} />
        </nav>

        {/* User Info */}
        <div className="px-4 py-3 border-t border-slate-200">
          <p className="text-sm text-slate-700 truncate">{auth?.user?.name}</p>
          <p className="text-xs text-slate-500 truncate">Administrador</p>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="mt-2 w-full text-xs text-left text-blue-600 hover:underline"
          >
            Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className={`${mainMargin} flex-1 flex flex-col transition-margin duration-300 ease-in-out`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white flex items-center justify-start gap-4 px-6 py-4 shadow z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <span className="text-xl font-semibold">KualiFin</span>
        </header>

        {/* Page content */}
        <main className="mt-16 p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, icon, text, collapsed }: { href: string; icon: string; text: string; collapsed: boolean }) {
  const { url } = usePage();
  const isActive = url === href;
  const baseClasses = `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
    isActive
      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`;

  return isActive ? (
    <span className={baseClasses} aria-current="page">
      <span className="text-lg w-6 inline-block">{icon}</span>
      {!collapsed && <span className="ml-3">{text}</span>}
    </span>
  ) : (
    <Link href={href} className={baseClasses}>
      <span className="text-lg w-6 inline-block">{icon}</span>
      {!collapsed && <span className="ml-3">{text}</span>}
    </Link>
  );
}
