import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface AuthenticatedLayoutProps extends PropsWithChildren {
  header?: ReactNode;
}

export default function AuthenticatedLayout({
  header,
  children,
}: AuthenticatedLayoutProps) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // padding dinámico en desktop según ancho del sidebar
  const desktopPadding = sidebarOpen ? 'md:pl-64' : 'md:pl-20';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Header limpio y profesional */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center w-full">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="mr-4 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <img 
              src="/images/Logo.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain" 
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-blue-600">
                KualiFin
              </h1>
              <p className="text-xs text-slate-500 font-medium">Sistema de Créditos</p>
            </div>
          </div>

          {/* User info en header */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-slate-700">{auth.user.name}</p>
              <p className="text-xs text-slate-500">Bienvenido de vuelta</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {auth.user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Header secundario si existe */}
      {header && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          {header}
        </div>
      )}

      {/* Backdrop para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`flex flex-1 pt-${header ? '24' : '16'}`}>
        {/* Sidebar optimizado */}
        <aside
          className={`
            fixed top-${header ? '24' : '16'} bottom-0 left-0 z-40 
            bg-white shadow-lg border-r border-slate-200
            flex flex-col justify-between
            transition-transform duration-200 ease-out
            ${sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
          `}
        >
          <nav className="flex flex-col gap-1 px-3 mt-6">
            <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
            <NavLink href={route('solicitud')} icon="📋" text="Nueva Solicitud" collapsed={!sidebarOpen} />
            <NavLink href={route('nuevoCliente')} icon="👥" text="Nuevo Cliente" collapsed={!sidebarOpen} />
            <NavLink href={route('panelRevision')} icon="🔍" text="Panel de Revisión" collapsed={!sidebarOpen} />
            <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
            <NavLink href={route('recreditoClientes')} icon="🔄" text="Recrédito Clientes" collapsed={!sidebarOpen} />
            <NavLink href={route('AdminDashboard')} icon="🧑‍💼" text="Panel Administrativo" collapsed={!sidebarOpen} />
          </nav>

          {/* User section en sidebar */}
          {sidebarOpen && (
            <div className="px-3 pb-6 border-t border-slate-200 mt-4">
              <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{auth.user.name}</p>
                    <p className="text-xs text-slate-500">Usuario activo</p>
                  </div>
                </div>
                
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
                >
                  <span className="text-base">🚪</span>
                  <span>Cerrar sesión</span>
                </Link>
              </div>
            </div>
          )}
        </aside>

        {/* Contenido principal */}
        <main
          className={`
            flex-1 min-h-screen
            transition-all duration-200 ease-out
            pl-0 ${desktopPadding} pr-4
            ${header ? 'pt-16' : 'pt-0'}
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
  
  return (
    <div className="relative">
      {isActive ? (
        <span 
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold bg-blue-600 text-white border-l-4 border-blue-800"
          aria-current="page"
        >
          <span className="flex items-center justify-center w-8 h-8 text-lg bg-white/20 rounded-lg">
            {icon}
          </span>
          {!collapsed && (
            <span className="whitespace-nowrap font-semibold">
              {text}
            </span>
          )}
        </span>
      ) : (
        <Link 
          href={href} 
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-150"
        >
          <span className="flex items-center justify-center w-8 h-8 text-lg bg-slate-100 rounded-lg">
            {icon}
          </span>
          {!collapsed && (
            <span className="whitespace-nowrap font-medium">
              {text}
            </span>
          )}
        </Link>
      )}
    </div>
  );
}