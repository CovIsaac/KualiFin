import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthenticatedLayoutProps extends PropsWithChildren {
  header?: ReactNode;
}

export default function AuthenticatedLayout({
  header,
  children,
}: AuthenticatedLayoutProps) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // padding dinámico en desktop según ancho del sidebar
  const desktopPadding = sidebarOpen ? 'md:pl-64' : 'md:pl-20';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans text-slate-800 flex flex-col relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header general súper moderno */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/80 to-white/60"></div>
        
        <div className="relative z-10 flex items-center w-full">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group mr-4 p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {sidebarOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <img 
                src="/images/Logo.png" 
                alt="Logo" 
                className="relative h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                KualiFin
              </h1>
              <p className="text-xs text-slate-500 font-medium">Sistema de Créditos</p>
            </div>
          </motion.div>

          {/* User info en header */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-slate-700">{auth.user.name}</p>
              <p className="text-xs text-slate-500">Bienvenido de vuelta</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            >
              {auth.user.name.charAt(0).toUpperCase()}
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Si la página pasa un header, lo mostramos debajo del header general */}
      {header && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed top-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
          <div className="relative z-10">{header}</div>
        </motion.div>
      )}

      {/* Backdrop súper moderno sólo en móvil */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={`flex flex-1 pt-${header ? '24' : '16'} relative z-10`}>
        {/* Sidebar súper moderno */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            width: sidebarOpen ? (window.innerWidth >= 768 ? '16rem' : '16rem') : (window.innerWidth >= 768 ? '5rem' : '16rem')
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`
            fixed top-${header ? '24' : '16'} bottom-0 left-0 z-40 
            bg-white/90 backdrop-blur-xl shadow-2xl border-r border-white/20
            flex flex-col justify-between overflow-hidden
            transition-transform duration-300 ease-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {/* Efecto de gradiente en el sidebar */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white/60"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/5 to-transparent"></div>

          <nav className="relative z-10 flex flex-col gap-2 px-3 mt-6">
            <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
            <NavLink href={route('solicitud')} icon="📋" text="Nueva Solicitud" collapsed={!sidebarOpen} />
            <NavLink href={route('nuevoCliente')} icon="👥" text="Nuevo Cliente" collapsed={!sidebarOpen} />
            <NavLink href={route('panelRevision')} icon="🔍" text="Panel de Revisión" collapsed={!sidebarOpen} />
            <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
            <NavLink href={route('recreditoClientes')} icon="🔄" text="Recrédito Clientes" collapsed={!sidebarOpen} />
            <NavLink href="#" icon="⚙️" text="Configuración" collapsed={!sidebarOpen} />
          </nav>

          {/* User section en sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 px-3 pb-6 border-t border-white/30 mt-4"
              >
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm border border-white/30 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{auth.user.name}</p>
                      <p className="text-xs text-slate-500">Usuario activo</p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform duration-200">🚪</span>
                      <span>Cerrar sesión</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* Contenido principal */}
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`
            flex-1 min-h-screen relative
            transition-all duration-300 ease-out
            pl-0 ${desktopPadding} pr-4
            ${header ? 'pt-16' : 'pt-0'}
          `}
          tabIndex={-1}
        >
          {children}
        </motion.main>
      </div>

      {/* Estilos CSS adicionales */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      {isActive ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          {/* Efecto de brillo para el activo */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
          
          <span 
            className="relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl border-l-4 border-white/30"
            aria-current="page"
          >
            <span className="flex items-center justify-center w-10 h-10 text-lg bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap font-bold"
                >
                  {text}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.div>
      ) : (
        <Link 
          href={href} 
          className="relative group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-slate-100/80 hover:to-white/80 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/30"
        >
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
          
          <span className="relative flex items-center justify-center w-10 h-10 text-lg bg-slate-100/50 rounded-xl group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
            {icon}
          </span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="relative whitespace-nowrap font-semibold"
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      )}
    </motion.div>
  );
}