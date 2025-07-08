import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const summaryCards = [
    { title: 'Prospectados', value: 12, icon: '👥', color: 'blue', description: 'Nuevos clientes potenciales' },
    { title: 'En revisión', value: 8, icon: '📋', color: 'amber', description: 'Solicitudes pendientes' },
    { title: 'Aprobados', value: 5, icon: '✅', color: 'green', description: 'Créditos autorizados' },
    { title: 'Desembolsados', value: 3, icon: '💰', color: 'purple', description: 'Fondos liberados' },
    { title: 'Morosos', value: 1, icon: '⚠️', color: 'red', description: 'Requieren seguimiento' },
  ];

  const clientStatuses = [
    { nombre: 'María López', monto: '$10,000', estado: 'Aprobado', progress: 75, avatar: '👩‍💼', color: 'green' },
    { nombre: 'Carlos Ruiz', monto: '$5,000', estado: 'Supervisado', progress: 50, avatar: '👨‍💼', color: 'blue' },
    { nombre: 'Lucía Torres', monto: '$8,000', estado: 'Prospectado', progress: 25, avatar: '👩‍🎓', color: 'amber' },
    { nombre: 'Pedro Sánchez', monto: '$12,000', estado: 'Desembolsado', progress: 100, avatar: '👨‍🔧', color: 'purple' },
    { nombre: 'Ana García', monto: '$7,500', estado: 'Moroso', progress: 100, avatar: '👩‍🏫', color: 'red' },
  ];

  const latestRequests = [
    ['María López', '$10,000', 'Aprobado', '2025-06-17', 'green'],
    ['Carlos Ruiz', '$5,000', 'En revisión', '2025-06-16', 'amber'],
    ['Lucía Torres', '$8,000', 'Prospectado', '2025-06-15', 'blue'],
    ['Pedro Sánchez', '$12,000', 'Desembolsado', '2025-06-14', 'purple'],
  ];

  // Animación de contadores
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      summaryCards.forEach((card, index) => {
        let current = 0;
        const increment = card.value / 30;
        const counter = setInterval(() => {
          current += increment;
          if (current >= card.value) {
            current = card.value;
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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-600',
        glow: 'shadow-blue-500/20',
        accent: 'bg-blue-500'
      },
      amber: {
        bg: 'from-amber-500/20 to-orange-500/20',
        border: 'border-amber-500/30',
        text: 'text-amber-600',
        glow: 'shadow-amber-500/20',
        accent: 'bg-amber-500'
      },
      green: {
        bg: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-500/30',
        text: 'text-green-600',
        glow: 'shadow-green-500/20',
        accent: 'bg-green-500'
      },
      purple: {
        bg: 'from-purple-500/20 to-violet-500/20',
        border: 'border-purple-500/30',
        text: 'text-purple-600',
        glow: 'shadow-purple-500/20',
        accent: 'bg-purple-500'
      },
      red: {
        bg: 'from-red-500/20 to-pink-500/20',
        border: 'border-red-500/30',
        text: 'text-red-600',
        glow: 'shadow-red-500/20',
        accent: 'bg-red-500'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard - Sistema de Créditos" />

      {/* Background con efecto Liquid Glass */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Fondo base con gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        
        {/* Elementos flotantes de fondo estilo Apple */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
            className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header con estilo Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Glass Card para el header */}
            <div className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5">
              {/* Efecto de brillo sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse" style={{ animationDuration: '3s' }}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="text-center lg:text-left">
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                    >
                      Dashboard
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-lg text-slate-600 font-medium"
                    >
                      Visión general del sistema de créditos
                    </motion.p>
                  </div>
                  
                  {/* Reloj en tiempo real estilo Apple */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative"
                  >
                    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
                      <div className="text-center">
                        <div className="text-3xl font-black text-slate-800 mb-1">
                          {currentTime.toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          {currentTime.toLocaleDateString('es-ES', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary Cards con estilo Liquid Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {summaryCards.map(({ title, value, icon, color, description }, index) => {
              const colorClasses = getColorClasses(color);
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative overflow-hidden"
                >
                  {/* Glass Card */}
                  <div className={`relative rounded-2xl bg-white/40 backdrop-blur-xl border ${colorClasses.border} shadow-xl ${colorClasses.glow} p-6 h-full transition-all duration-300 group-hover:shadow-2xl`}>
                    {/* Efecto de brillo en hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    {/* Contenido */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-12 h-12 ${colorClasses.accent} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}
                        >
                          {icon}
                        </motion.div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</div>
                          <motion.div
                            className={`text-3xl font-black ${colorClasses.text}`}
                            key={animatedValues[index]}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {animatedValues[index]}
                          </motion.div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-600 font-medium">{description}</p>
                      
                      {/* Barra de progreso sutil */}
                      <div className="mt-3 w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${colorClasses.accent} rounded-full`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${(value / 12) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Estado de Clientes con Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 p-8 mb-12 group"
          >
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  👥
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                  Estado de clientes
                </h2>
              </div>
              
              <div className="space-y-4">
                {clientStatuses.map(({ nombre, monto, estado, progress, avatar, color }, index) => {
                  const colorClasses = getColorClasses(color);
                  return (
                    <motion.div
                      key={nombre}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {/* Efecto de color en hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="text-3xl bg-white/80 rounded-full w-12 h-12 flex items-center justify-center shadow-md backdrop-blur-sm"
                          >
                            {avatar}
                          </motion.div>
                          <div>
                            <div className="font-bold text-slate-800 text-lg">{nombre}</div>
                            <div className={`text-sm font-medium ${colorClasses.text}`}>{estado}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {monto}
                          </div>
                        </div>
                      </div>
                      
                      {/* Barra de progreso moderna */}
                      <div className="mt-4 relative">
                        <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div 
                            className={`h-full ${colorClasses.accent} rounded-full shadow-sm`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 1 + index * 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Tabla con Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 group"
          >
            {/* Header de la tabla */}
            <div className="bg-white/60 backdrop-blur-xl px-8 py-6 border-b border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  📋
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent">
                  Últimas solicitudes
                </h3>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white/30 backdrop-blur-sm">
                  <tr>
                    {['Cliente', 'Monto', 'Estado', 'Fecha'].map((header) => (
                      <th
                        key={header}
                        className="px-8 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {latestRequests.map(([cliente, monto, estado, fecha, color], index) => {
                    const colorClasses = getColorClasses(color);
                    return (
                      <motion.tr
                        key={cliente}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                        className="group hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">👤</div>
                            <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                              {cliente}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {monto}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white/60 backdrop-blur-sm border ${colorClasses.border} ${colorClasses.text} shadow-sm`}>
                            {estado}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-slate-600 font-medium">{fecha}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}