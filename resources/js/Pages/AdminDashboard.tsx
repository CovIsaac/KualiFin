import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);

  // Estadísticas del panel administrativo
  const adminStats = [
    { 
      title: 'Empleados Activos', 
      value: 12, 
      icon: '👥', 
      gradient: 'from-blue-500 to-cyan-400', 
      bgGradient: 'from-blue-50 to-cyan-50',
      description: 'Personal trabajando'
    },
    { 
      title: 'Nuevos Registros', 
      value: 3, 
      icon: '📝', 
      gradient: 'from-green-500 to-emerald-400', 
      bgGradient: 'from-green-50 to-emerald-50',
      description: 'Este mes'
    },
    { 
      title: 'Roles Activos', 
      value: 4, 
      icon: '🎯', 
      gradient: 'from-purple-500 to-violet-400', 
      bgGradient: 'from-purple-50 to-violet-50',
      description: 'Tipos de puesto'
    },
    { 
      title: 'Accesos Hoy', 
      value: 28, 
      icon: '🔐', 
      gradient: 'from-orange-500 to-red-400', 
      bgGradient: 'from-orange-50 to-red-50',
      description: 'Sesiones iniciadas'
    },
  ];

  // Opciones del panel administrativo
  const adminOptions = [
    {
      title: 'Registrar Empleado',
      description: 'Agregar nuevo miembro al equipo',
      icon: '👨‍💼',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      href: '/registrarEmpleado',
      available: true
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar cuentas y permisos',
      icon: '👥',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      href: '#',
      available: false
    },
    {
      title: 'Configuración del Sistema',
      description: 'Ajustes generales y parámetros',
      icon: '⚙️',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      href: '#',
      available: false
    },
    {
      title: 'Reportes Administrativos',
      description: 'Análisis y estadísticas del sistema',
      icon: '📊',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      href: '#',
      available: false
    },
    {
      title: 'Auditoría y Logs',
      description: 'Registro de actividades del sistema',
      icon: '📋',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      href: '#',
      available: false
    },
    {
      title: 'Respaldos y Seguridad',
      description: 'Gestión de copias de seguridad',
      icon: '🔒',
      gradient: 'from-slate-500 to-gray-500',
      bgGradient: 'from-slate-50 to-gray-50',
      href: '#',
      available: false
    }
  ];

  // Animación de contadores
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      adminStats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 30;
        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(counter);
          }
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.floor(current);
            return newValues;
          });
        }, 50);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Panel Administrativo - Sistema de Créditos" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header súper moderno */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <span className="animate-pulse">🧑‍💼</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Panel Administrativo
                    </h1>
                    <p className="text-slate-600 font-medium text-lg">
                      Centro de control y gestión del sistema de créditos
                    </p>
                  </div>
                </div>

                {/* Estadísticas rápidas súper modernas */}
              </div>
            </div>
          </motion.div>

          {/* Opciones del panel súper modernas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 mb-12 group"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🛠️
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Herramientas Administrativas
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adminOptions.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    className="relative"
                  >
                    {option.available ? (
                      <Link href={option.href}>
                        <motion.div
                          whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${option.bgGradient} p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 border border-white/20 group cursor-pointer`}
                        >
                          {/* Efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          
                          <div className="relative z-10 text-center">
                            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl shadow-lg transition-all duration-300 bg-gradient-to-br ${option.gradient} text-white group-hover:scale-110 group-hover:rotate-3`}>
                              {option.icon}
                            </div>
                            
                            <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${option.gradient} bg-clip-text text-transparent`}>
                              {option.title}
                            </h3>
                            
                            <p className="text-slate-600 font-medium text-sm leading-relaxed">
                              {option.description}
                            </p>

                            {/* Indicador de disponible */}
                            <div className="mt-4 flex items-center justify-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-semibold text-green-600">Disponible</span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${option.bgGradient} p-8 shadow-xl transform transition-all duration-500 border border-white/20 group opacity-60 cursor-not-allowed`}
                      >
                        {/* Overlay de no disponible */}
                        <div className="absolute inset-0 bg-slate-500/20 backdrop-blur-[1px] rounded-3xl"></div>
                        
                        <div className="relative z-10 text-center">
                          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl shadow-lg transition-all duration-300 bg-gradient-to-br ${option.gradient} text-white grayscale`}>
                            {option.icon}
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 text-slate-500">
                            {option.title}
                          </h3>
                          
                          <p className="text-slate-400 font-medium text-sm leading-relaxed">
                            {option.description}
                          </p>

                          {/* Indicador de próximamente */}
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-orange-600">Próximamente</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Información adicional súper moderna */}
        </div>
      </div>

      {/* Estilos CSS adicionales */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </AuthenticatedLayout>
  );
}