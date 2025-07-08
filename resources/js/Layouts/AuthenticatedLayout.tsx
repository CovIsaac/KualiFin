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
    <div className="min-h-screen relative overflow-hidden font-sans text-white flex flex-col">
      {/* Background súper premium con múltiples capas de cristal MÁS OPACO */}
      <div className="absolute inset-0">
        {/* Capa base con gradiente más intenso */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-indigo-900 to-purple-900"></div>
        
        {/* Capa de textura con noise más visible */}
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }}></div>

        {/* Elementos flotantes más opacos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Orbes principales con gradientes más intensos */}
          <motion.div
            animate={{
              x: [0, 120, -40, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.2, 0.9, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,51,234,0.3) 50%, rgba(236,72,153,0.2) 100%)',
              filter: 'blur(50px)'
            }}
          />
          
          <motion.div
            animate={{
              x: [0, -100, 60, 0],
              y: [0, 80, -40, 0],
              scale: [1, 0.8, 1.3, 1],
              rotate: [0, -90, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
            className="absolute top-40 right-32 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(59,130,246,0.3) 50%, rgba(16,185,129,0.2) 100%)',
              filter: 'blur(40px)'
            }}
          />

          <motion.div
            animate={{
              x: [0, 70, -30, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
              rotate: [0, 270, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 12
            }}
            className="absolute bottom-32 left-1/3 w-64 h-64 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(245,158,11,0.3) 50%, rgba(239,68,68,0.2) 100%)',
              filter: 'blur(35px)'
            }}
          />

          {/* Partículas flotantes más visibles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75],
                opacity: [0.2, 0.5, 0.2],
                scale: [0.7, 1.2, 0.7],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 8
              }}
              className="absolute w-3 h-3 bg-white/30 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Overlay de cristal global más opaco */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/8 backdrop-blur-[2px]"></div>
      </div>

      {/* Header general súper moderno con más opacidad */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6"
      >
        {/* Fondo del header con cristal más opaco */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 border-b border-white/40 shadow-2xl shadow-black/30"></div>
        
        <div className="relative z-10 flex items-center w-full">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group mr-4 p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Fondo del botón con cristal */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/15 backdrop-blur-xl rounded-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 border border-white/40 rounded-xl"></div>
            
            <div className="relative z-10 text-white">
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <img 
                src="/images/Logo.png" 
                alt="Logo" 
                className="relative h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300 filter brightness-0 invert" 
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-white drop-shadow-lg">
                KualiFin
              </h1>
              <p className="text-xs text-white/70 font-medium">Sistema de Créditos</p>
            </div>
          </motion.div>

          {/* User info en header */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-white drop-shadow-sm">{auth.user.name}</p>
              <p className="text-xs text-white/70">Bienvenido de vuelta</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {/* Fondo del avatar con cristal */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/15 to-white/10 backdrop-blur-xl rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full"></div>
              <div className="absolute inset-0 border border-white/40 rounded-full shadow-lg"></div>
              
              <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                {auth.user.name.charAt(0).toUpperCase()}
              </div>
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
          className="fixed top-16 left-0 right-0 z-40 px-6 py-4"
        >
          {/* Fondo del sub-header con cristal más opaco */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/25 to-white/20 backdrop-blur-2xl"></div>
          <div className="absolute inset-0 border-b border-white/30 shadow-lg"></div>
          
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
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={`flex flex-1 pt-${header ? '24' : '16'} relative z-10`}>
        {/* Sidebar súper moderno con más opacidad */}
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
            flex flex-col justify-between overflow-hidden
            transition-transform duration-300 ease-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {/* Fondo del sidebar con cristal más opaco */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/20 to-white/25 backdrop-blur-2xl"></div>
          <div className="absolute inset-0 border-r border-white/40 shadow-2xl shadow-black/20"></div>
          
          {/* Efectos de gradiente en el sidebar más visibles */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent"></div>

          <nav className="relative z-10 flex flex-col gap-2 px-3 mt-6">
            <NavLink href={route('dashboard')} icon="🏠" text="Dashboard" collapsed={!sidebarOpen} />
            <NavLink href={route('solicitud')} icon="📋" text="Nueva Solicitud" collapsed={!sidebarOpen} />
            <NavLink href={route('nuevoCliente')} icon="👥" text="Nuevo Cliente" collapsed={!sidebarOpen} />
            <NavLink href={route('panelRevision')} icon="🔍" text="Panel de Revisión" collapsed={!sidebarOpen} />
            <NavLink href={route('reportes')} icon="📊" text="Reportes" collapsed={!sidebarOpen} />
            <NavLink href={route('recreditoClientes')} icon="🔄" text="Recrédito Clientes" collapsed={!sidebarOpen} />
            <NavLink href={route('AdminDashboard')} icon="🧑‍💼" text="Panel Administrativo" collapsed={!sidebarOpen} />
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
                <div className="mt-4 p-4 rounded-2xl relative overflow-hidden">
                  {/* Fondo del user section con cristal */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl rounded-2xl"></div>
                  <div className="absolute inset-0 border border-white/30 rounded-2xl shadow-lg"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        {/* Fondo del avatar pequeño con cristal */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/15 to-white/10 backdrop-blur-xl rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full"></div>
                        <div className="absolute inset-0 border border-white/40 rounded-full shadow-lg"></div>
                        
                        <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                          {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate drop-shadow-sm">{auth.user.name}</p>
                        <p className="text-xs text-white/70">Usuario activo</p>
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
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-300 hover:text-red-200 rounded-xl transition-all duration-200 group relative overflow-hidden"
                      >
                        {/* Fondo del botón logout con cristal */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl backdrop-blur-sm"></div>
                        <div className="absolute inset-0 border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                        
                        <div className="relative z-10 flex items-center gap-2">
                          <span className="text-base group-hover:scale-110 transition-transform duration-200">🚪</span>
                          <span>Cerrar sesión</span>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
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
          {/* Efecto de brillo para el activo más opaco */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
          
          {/* Fondo del link activo con cristal más opaco */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/20 to-white/15 backdrop-blur-xl rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl"></div>
          <div className="absolute inset-0 border border-white/40 rounded-2xl shadow-xl"></div>
          <div className="absolute inset-0 border-l-4 border-white/50 rounded-2xl"></div>
          
          <span 
            className="relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 text-white"
            aria-current="page"
          >
            <span className="flex items-center justify-center w-10 h-10 text-lg rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 bg-white/20">
              {icon}
            </span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap font-bold drop-shadow-sm"
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
          className="relative group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 text-white/80 hover:text-white"
        >
          {/* Fondo del link normal con cristal más opaco */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/8 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl backdrop-blur-xl"></div>
          <div className="absolute inset-0 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
          
          <span className="relative flex items-center justify-center w-10 h-10 text-lg rounded-xl group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md bg-white/10 group-hover:bg-white/20 backdrop-blur-sm">
            {icon}
          </span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="relative whitespace-nowrap font-semibold drop-shadow-sm"
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