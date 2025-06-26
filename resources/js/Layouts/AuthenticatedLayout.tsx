import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // padding dinámico en desktop según ancho del sidebar
  const desktopPadding = sidebarOpen ? 'md:pl-64' : 'md:pl-20';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans text-slate-800 flex flex-col relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header súper moderno */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-blue-500/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="group relative p-2 text-slate-700 hover:text-blue-600 focus:outline-none transition-all duration-300 hover:bg-blue-50 rounded-xl"
          >
            <div className="relative w-6 h-6">
              {sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300 group-hover:rotate-90" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/images/Logo.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
          </div>
        </div>

        {/* Usuario info en header */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-700">{auth.user.name}</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              {auth.user.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Backdrop mejorado para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 pt-16">
        {/* Sidebar súper moderno */}
        <aside
          className={`
            fixed top-16 bottom-0 left-0 z-40 bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-500/20 
            flex flex-col justify-between overflow-hidden border-r border-white/20

            /* móvil: deslizante */
            transition-all duration-300 ease-out
            ${sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'}

            /* desktop: ancho animado, sin transform */
            md:translate-x-0
            md:transition-all md:duration-300 md:ease-out
            ${sidebarOpen ? 'md:w-64' : 'md:w-20'}
          `}
        >
          {/* Decoración del sidebar */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-indigo-100/50 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <nav className="relative flex flex-col gap-2 px-3 mt-6">
            <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
            <NavLink href={route('solicitud')} icon="📋" text="Solicitud" collapsed={!sidebarOpen} />
            <NavLink href={route('nuevoCliente')} icon="👥" text="Clientes" collapsed={!sidebarOpen} />
            <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
            <NavLink href="#" icon="⚙️" text="Configuración" collapsed={!sidebarOpen} />
          </nav>

          {/* Footer del sidebar mejorado */}
          {sidebarOpen && (
            <div className="relative px-4 pb-6 border-t border-white/20 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
              <div className="mt-4 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">{auth.user.name}</div>
                    <div className="text-xs text-slate-500">En línea</div>
                  </div>
                </div>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <span>🚪</span>
                  Cerrar sesión
                </Link>
              </div>
            </div>
          )}
        </aside>

        {/* Contenido principal con efectos */}
        <main
          className={`
            flex-1 bg-transparent min-h-screen relative z-10
            transition-all duration-300 ease-out
            pl-0 ${desktopPadding} pr-4
          `}
          tabIndex={-1}
        >
          <div className="relative">
            {children}
          </div>
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
  
  const baseClasses = `
    group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium 
    transition-all duration-300 overflow-hidden
    ${isActive
      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105'
      : 'text-slate-700 hover:text-blue-700 hover:bg-white/60 hover:shadow-md hover:scale-102'
    }
  `;

  const content = (
    <>
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <span className={`
        flex items-center justify-center w-10 h-10 text-lg rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-white/20 backdrop-blur-sm shadow-lg' 
          : 'group-hover:bg-blue-50 group-hover:scale-110'
        }
      `}>
        {icon}
      </span>
      
      {!collapsed && (
        <span className="whitespace-nowrap font-semibold tracking-wide">
          {text}
        </span>
      )}
      
      {/* Indicador activo */}
      {isActive && (
        <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      )}
    </>
  );

  return isActive ? (
    <span className={baseClasses} aria-current="page">
      {content}
    </span>
  ) : (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}