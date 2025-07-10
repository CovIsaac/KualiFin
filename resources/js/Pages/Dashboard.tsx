import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const summaryCards = [
    { title: 'Prospectados', value: 12, icon: '👥', gradient: 'from-blue-500 to-cyan-400', bgGradient: 'from-blue-50 to-cyan-50' },
    { title: 'En revisión', value: 8, icon: '📋', gradient: 'from-amber-500 to-orange-400', bgGradient: 'from-amber-50 to-orange-50' },
    { title: 'Aprobados', value: 5, icon: '✅', gradient: 'from-green-500 to-emerald-400', bgGradient: 'from-green-50 to-emerald-50' },
    { title: 'Desembolsados', value: 3, icon: '💰', gradient: 'from-purple-500 to-violet-400', bgGradient: 'from-purple-50 to-violet-50' },
    { title: 'Morosos', value: 1, icon: '⚠️', gradient: 'from-red-500 to-pink-400', bgGradient: 'from-red-50 to-pink-50' },
  ];

  const clientStatuses = [
    { nombre: 'María López', monto: '$10,000', estado: 'Aprobado', progresoColor: 'bg-gradient-to-r from-green-400 to-emerald-500', porcentaje: 'w-3/4', avatar: '👩‍💼' },
    { nombre: 'Carlos Ruiz', monto: '$5,000', estado: 'Supervisado', progresoColor: 'bg-gradient-to-r from-blue-400 to-cyan-500', porcentaje: 'w-1/2', avatar: '👨‍💼' },
    { nombre: 'Lucía Torres', monto: '$8,000', estado: 'Prospectado', progresoColor: 'bg-gradient-to-r from-amber-400 to-orange-500', porcentaje: 'w-1/4', avatar: '👩‍🎓' },
    { nombre: 'Pedro Sánchez', monto: '$12,000', estado: 'Desembolsado', progresoColor: 'bg-gradient-to-r from-purple-400 to-violet-500', porcentaje: 'w-full', avatar: '👨‍🔧' },
    { nombre: 'Ana García', monto: '$7,500', estado: 'Moroso', progresoColor: 'bg-gradient-to-r from-red-400 to-pink-500', porcentaje: 'w-full', avatar: '👩‍🏫' },
  ];

  const chartLegend = [
    { label: 'Prospectados (12)', color: 'bg-gradient-to-r from-blue-500 to-cyan-400', textColor: 'text-blue-600' },
    { label: 'En supervisión (8)', color: 'bg-gradient-to-r from-amber-500 to-orange-400', textColor: 'text-amber-600' },
    { label: 'Aprobados (5)', color: 'bg-gradient-to-r from-green-500 to-emerald-400', textColor: 'text-green-600' },
    { label: 'Desembolsados (3)', color: 'bg-gradient-to-r from-purple-500 to-violet-400', textColor: 'text-purple-600' },
    { label: 'Morosos (1)', color: 'bg-gradient-to-r from-red-500 to-pink-400', textColor: 'text-red-600' },
  ];

  const latestRequests = [
    ['María López', '$10,000', 'Aprobado', '2025-06-17', '✅'],
    ['Carlos Ruiz', '$5,000', 'En revisión', '2025-06-16', '📋'],
    ['Lucía Torres', '$8,000', 'Prospectado', '2025-06-15', '👥'],
    ['Pedro Sánchez', '$12,000', 'Desembolsado', '2025-06-14', '💰'],
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

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard - Sistema de Créditos" />

      {/* Background con gradiente animado */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header súper moderno */}
          <div className={`mb-12 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 animate-pulse">
                Dashboard
              </h1>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
            </div>
            <p className="text-lg sm:text-xl text-slate-600 font-medium">
              Visión general súper moderna del sistema de créditos 🚀
            </p>
          </div>

          {/* Summary Cards con efectos súper modernos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {summaryCards.map(({ title, value, icon, gradient, bgGradient }, index) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} p-6 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-3xl p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</div>
                      <div className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {animatedValues[index]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso decorativa */}
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full transform transition-all duration-1000 delay-500`}
                      style={{ width: isVisible ? `${(value / 12) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estado de Clientes con diseño súper moderno */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl">👥</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Estado de clientes
              </h2>
            </div>
            
            <div className="space-y-6">
              {clientStatuses.map(({ nombre, monto, estado, progresoColor, porcentaje, avatar }, index) => (
                <div 
                  key={nombre} 
                  className="group bg-gradient-to-r from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        {avatar}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-lg">{nombre}</div>
                        <div className="text-slate-500 text-sm">{estado}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {monto}
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso súper moderna */}
                  <div className="relative">
                    <div className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full ${progresoColor} ${porcentaje} rounded-full shadow-lg transform transition-all duration-1000 delay-${index * 200}`}
                        style={{ 
                          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                          animation: `pulse 2s infinite ${index * 0.5}s`
                        }}
                      ></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 via-transparent to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart + Leyenda súper moderno */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl">📊</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Estado de los créditos
              </h2>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Chart con efectos modernos */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative w-80 h-80">
                  <svg viewBox="0 0 200 200" className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    {/* Círculo base con gradiente */}
                    <defs>
                      <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#baseGradient)" strokeWidth="20" />
                    
                    {/* Segmentos con gradientes y efectos */}
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#blue-gradient)" strokeWidth="20"
                      strokeDasharray="208 502" strokeDashoffset="0" transform="rotate(-90 100 100)" 
                      filter="url(#glow)" className="animate-pulse" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#amber-gradient)" strokeWidth="20"
                      strokeDasharray="139 502" strokeDashoffset="-208" transform="rotate(-90 100 100)" 
                      filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#green-gradient)" strokeWidth="20"
                      strokeDasharray="87 502" strokeDashoffset="-347" transform="rotate(-90 100 100)" 
                      filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#purple-gradient)" strokeWidth="20"
                      strokeDasharray="52 502" strokeDashoffset="-434" transform="rotate(-90 100 100)" 
                      filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#red-gradient)" strokeWidth="20"
                      strokeDasharray="17 502" strokeDashoffset="-486" transform="rotate(-90 100 100)" 
                      filter="url(#glow)" className="animate-pulse" style={{ animationDelay: '2s' }} />
                    
                    {/* Gradientes para los segmentos */}
                    <defs>
                      <linearGradient id="blue-gradient">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="amber-gradient">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <linearGradient id="green-gradient">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <linearGradient id="purple-gradient">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                      <linearGradient id="red-gradient">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                    
                    {/* Texto central con efectos */}
                    <text x="100" y="90" textAnchor="middle" fontSize="32" fontWeight="bold" fill="url(#text-gradient)" className="animate-pulse">29</text>
                    <text x="100" y="115" textAnchor="middle" fontSize="16" fill="#64748b">Total</text>
                    
                    <defs>
                      <linearGradient id="text-gradient">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              
              {/* Leyenda súper moderna */}
              <div className="grid grid-cols-1 gap-4 flex-1">
                {chartLegend.map(({ label, color, textColor }, index) => (
                  <div 
                    key={label} 
                    className={`group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-slate-50 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 border border-slate-100`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-6 h-6 rounded-full ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}></div>
                    <span className={`font-semibold ${textColor} group-hover:scale-105 transition-transform duration-300`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabla súper moderna */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📋</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Últimas solicitudes
                </h3>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
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
                <tbody className="divide-y divide-slate-200">
                  {latestRequests.map(([cliente, monto, estado, fecha, icon], index) => (
                    <tr 
                      key={cliente} 
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{icon}</div>
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                          {estado}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-slate-600 font-medium">{fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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