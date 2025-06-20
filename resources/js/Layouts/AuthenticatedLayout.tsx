import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false); // INICIO COLAPSADO

  const sidebarWidth = sidebarOpen ? 'w-56' : 'w-16'; // 14rem vs 4rem
  const mainMargin = sidebarOpen ? 'md:ml-56' : 'md:ml-16'; // margen izquierdo según sidebar

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center gap-4">
          {/* Botón hamburguesa visible en md+ */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="text-white focus:outline-none md:block hidden"
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <div className="font-bold text-lg tracking-widest select-none">KualiFin</div>
        </div>
        <div className="text-sm">
          {auth?.user?.name} | Administrador |{' '}
          <Link href={route('logout')} method="post" as="button" className="underline ml-1">
            Cerrar sesión
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className={`flex flex-1 pt-16`}>
        {/* Sidebar */}
        <aside
          className={`bg-white min-h-screen fixed top-16 left-0 shadow-md flex flex-col gap-4 p-4 transition-all duration-300 ease-in-out z-20 ${sidebarWidth} overflow-hidden`}
        >
          <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
          <NavLink href={route('solicitud')} icon="📋" text="Solicitud de crédito" collapsed={!sidebarOpen} />
          <NavLink href="#" icon="👥" text="Clientes" collapsed={!sidebarOpen} />
          <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
          <NavLink href="#" icon="⚙️" text="Configuración" collapsed={!sidebarOpen} />
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 p-6 bg-gray-100 min-h-screen transition-margin duration-300 ease-in-out ${mainMargin}`}
          style={{ marginTop: '4rem' }} // para que quede debajo del header fijo
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
      <span
        className="flex items-center justify-center w-10 h-10 text-lg select-none"
        style={{ lineHeight: 1 }}
      >
        {icon}
      </span>
    );
  
    if (isActive) {
      // Si es activo, renderizamos un span no clickeable
      return (
        <span className={baseClasses} aria-current="page" tabIndex={-1}>
          {iconSpan}
          {!collapsed && <span className="whitespace-nowrap">{text}</span>}
        </span>
      );
    } else {
      // Si no es activo, renderizamos un Link normal
      return (
        <Link href={href} className={baseClasses}>
          {iconSpan}
          {!collapsed && <span className="whitespace-nowrap">{text}</span>}
        </Link>
      );
    }
  }  
