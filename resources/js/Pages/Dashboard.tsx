import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, PiggyBank, CreditCard, AlertTriangle, Users, BarChart3, FileText, TrendingDown, Calendar } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const summaryCards = [
    { 
      title: 'Inversión Total', 
      value: 850000, 
      icon: <TrendingUp className="w-6 h-6" />, 
      gradient: 'from-blue-500 to-cyan-400', 
      bgGradient: 'from-blue-50 to-cyan-50',
      change: '+12.5%',
      changeType: 'positive'
    },
    { 
      title: 'Flujo Anterior', 
      value: 125000, 
      icon: <DollarSign className="w-6 h-6" />, 
      gradient: 'from-emerald-500 to-green-400', 
      bgGradient: 'from-emerald-50 to-green-50',
      change: '+8.2%',
      changeType: 'positive'
    },
    { 
      title: 'Total a Recuperar', 
      value: 975000, 
      icon: <PiggyBank className="w-6 h-6" />, 
      gradient: 'from-purple-500 to-violet-400', 
      bgGradient: 'from-purple-50 to-violet-50',
      change: '+15.7%',
      changeType: 'positive'
    },
    { 
      title: 'Préstamo Real', 
      value: 720000, 
      icon: <CreditCard className="w-6 h-6" />, 
      gradient: 'from-amber-500 to-orange-400', 
      bgGradient: 'from-amber-50 to-orange-50',
      change: '+5.3%',
      changeType: 'positive'
    },
    { 
      title: 'Recréditos', 
      value: 15, 
      icon: <AlertTriangle className="w-6 h-6" />, 
      gradient: 'from-red-500 to-pink-400', 
      bgGradient: 'from-red-50 to-pink-50',
      change: '-2.1%',
      changeType: 'negative'
    },
  ];

  const loanPortfolio = [
    { 
      cliente: 'María Elena Rodríguez', 
      monto: 45000, 
      estado: 'Activo', 
      comision: 4500,
      vencimiento: '2025-08-15',
      riesgo: 'Bajo',
      avatar: 'ME'
    },
    { 
      cliente: 'Carlos Alberto Mendoza', 
      monto: 32000, 
      estado: 'Supervisión', 
      comision: 3200,
      vencimiento: '2025-07-22',
      riesgo: 'Medio',
      avatar: 'CM'
    },
    { 
      cliente: 'Ana Sofía Herrera', 
      monto: 28000, 
      estado: 'Pendiente', 
      comision: 2800,
      vencimiento: '2025-09-10',
      riesgo: 'Bajo',
      avatar: 'AH'
    },
    { 
      cliente: 'Roberto Jiménez Silva', 
      monto: 55000, 
      estado: 'Desembolsado', 
      comision: 5500,
      vencimiento: '2025-06-30',
      riesgo: 'Alto',
      avatar: 'RJ'
    },
    { 
      cliente: 'Lucía Fernanda Torres', 
      monto: 38000, 
      estado: 'Recrédito', 
      comision: 3800,
      vencimiento: '2025-10-05',
      riesgo: 'Alto',
      avatar: 'LT'
    },
  ];

  const recentTransactions = [
    {
      cliente: 'María Elena Rodríguez',
      tipo: 'Desembolso',
      monto: 45000,
      comision: 4500,
      fecha: '2025-01-15',
      estado: 'Completado'
    },
    {
      cliente: 'Carlos Alberto Mendoza',
      tipo: 'Pago Parcial',
      monto: 15000,
      comision: 1500,
      fecha: '2025-01-14',
      estado: 'Procesando'
    },
    {
      cliente: 'Ana Sofía Herrera',
      tipo: 'Evaluación',
      monto: 28000,
      comision: 2800,
      fecha: '2025-01-13',
      estado: 'Pendiente'
    },
    {
      cliente: 'Roberto Jiménez Silva',
      tipo: 'Liquidación',
      monto: 55000,
      comision: 5500,
      fecha: '2025-01-12',
      estado: 'Completado'
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (estado) => {
    const colors = {
      'Activo': 'from-green-500 to-emerald-400',
      'Supervisión': 'from-blue-500 to-cyan-400',
      'Pendiente': 'from-amber-500 to-orange-400',
      'Desembolsado': 'from-purple-500 to-violet-400',
      'Recrédito': 'from-red-500 to-pink-400',
      'Completado': 'from-green-500 to-emerald-400',
      'Procesando': 'from-blue-500 to-cyan-400',
    };
    return colors[estado] || 'from-gray-500 to-gray-400';
  };

  const getRiskColor = (riesgo) => {
    const colors = {
      'Bajo': 'text-green-600 bg-green-100',
      'Medio': 'text-amber-600 bg-amber-100',
      'Alto': 'text-red-600 bg-red-100',
    };
    return colors[riesgo] || 'text-gray-600 bg-gray-100';
  };

  // Animación de contadores
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      summaryCards.forEach((card, index) => {
        let current = 0;
        const increment = card.value / 50;
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
        }, 30);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className={`mb-12 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Dashboard Financiero
              </h1>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">💎</div>
            </div>
            <p className="text-lg sm:text-xl text-slate-600 font-medium">
              Control total de inversiones y cartera de préstamos
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {summaryCards.map(({ title, value, icon, gradient, bgGradient, change, changeType }, index) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} p-6 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</div>
                      <div className={`text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {typeof animatedValues[index] === 'number' && animatedValues[index] > 1000 
                          ? formatCurrency(animatedValues[index]) 
                          : animatedValues[index]}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {changeType === 'positive' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {change}
                    </div>
                    <div className="text-xs text-slate-400">vs mes anterior</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cartera de Préstamos */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Cartera de Préstamos
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanPortfolio.map(({ cliente, monto, estado, comision, vencimiento, riesgo, avatar }, index) => (
                <div 
                  key={cliente} 
                  className="group bg-gradient-to-r from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] border border-slate-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {avatar}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{cliente}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(estado)} text-white`}>
                            {estado}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(riesgo)}`}>
                            {riesgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Monto:</span>
                      <span className="font-black text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {formatCurrency(monto)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Comisión:</span>
                      <span className="font-semibold text-slate-700">
                        {formatCurrency(comision)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Vencimiento:
                      </span>
                      <span className="text-sm font-medium text-slate-600">
                        {vencimiento}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen Financiero */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-400 text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Resumen Financiero
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-white">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">Capital Activo</span>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {formatCurrency(720000)}
                </div>
                <div className="text-sm text-slate-500 mt-1">En circulación</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg text-white">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">Comisiones</span>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {formatCurrency(18800)}
                </div>
                <div className="text-sm text-slate-500 mt-1">Total generadas</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-400 rounded-lg text-white">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">Por Recuperar</span>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  {formatCurrency(255000)}
                </div>
                <div className="text-sm text-slate-500 mt-1">Pendiente</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-400 rounded-lg text-white">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">En Riesgo</span>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {formatCurrency(93000)}
                </div>
                <div className="text-sm text-slate-500 mt-1">Recréditos</div>
              </div>
            </div>
          </div>

          {/* Movimientos Recientes */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white shadow-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Movimientos Recientes
                </h3>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
                  <tr>
                    {['Cliente', 'Tipo', 'Monto', 'Comisión', 'Fecha', 'Estado'].map((header) => (
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
                  {recentTransactions.map(({ cliente, tipo, monto, comision, fecha, estado }, index) => (
                    <tr 
                      key={`${cliente}-${fecha}`} 
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                    >
                      <td className="px-8 py-6">
                        <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                          {cliente}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-medium text-slate-600">
                          {tipo}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {formatCurrency(monto)}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-semibold text-slate-600">
                          {formatCurrency(comision)}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-slate-600 font-medium">{fecha}</td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getStatusColor(estado)} text-white`}>
                          {estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}