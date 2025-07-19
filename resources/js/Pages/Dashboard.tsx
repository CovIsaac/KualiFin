
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

export default function DashboardLimpio() {
  const summaryCards = [
    { 
      title: 'Inversión Total', 
      value: 850000, 
      change: '+12.5%',
      changeType: 'positive' as const
    },
    { 
      title: 'Flujo Anterior', 
      value: 125000, 
      change: '+8.2%',
      changeType: 'positive' as const
    },
    { 
      title: 'Total a Recuperar', 
      value: 975000, 
      change: '+15.7%',
      changeType: 'positive' as const
    },
    { 
      title: 'Préstamo Real', 
      value: 720000, 
      change: '+5.3%',
      changeType: 'positive' as const
    },
    { 
      title: 'Recréditos', 
      value: 15, 
      change: '-2.1%',
      changeType: 'negative' as const
    },
  ];

  const loanPortfolio = [
    { 
      cliente: 'María Elena Rodríguez', 
      monto: 45000, 
      estado: 'Activo' as const, 
      comision: 4500,
      vencimiento: '2025-08-15',
      riesgo: 'Bajo' as const,
      avatar: 'ME'
    },
    { 
      cliente: 'Carlos Alberto Mendoza', 
      monto: 32000, 
      estado: 'Supervisión' as const, 
      comision: 3200,
      vencimiento: '2025-07-22',
      riesgo: 'Medio' as const,
      avatar: 'CM'
    },
    { 
      cliente: 'Ana Sofía Herrera', 
      monto: 28000, 
      estado: 'Pendiente' as const, 
      comision: 2800,
      vencimiento: '2025-09-10',
      riesgo: 'Bajo' as const,
      avatar: 'AH'
    },
    { 
      cliente: 'Roberto Jiménez Silva', 
      monto: 55000, 
      estado: 'Desembolsado' as const, 
      comision: 5500,
      vencimiento: '2025-06-30',
      riesgo: 'Alto' as const,
      avatar: 'RJ'
    },
    { 
      cliente: 'Lucía Fernanda Torres', 
      monto: 38000, 
      estado: 'Recrédito' as const, 
      comision: 3800,
      vencimiento: '2025-10-05',
      riesgo: 'Alto' as const,
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
      estado: 'Completado' as const
    },
    {
      cliente: 'Carlos Alberto Mendoza',
      tipo: 'Pago Parcial',
      monto: 15000,
      comision: 1500,
      fecha: '2025-01-14',
      estado: 'Procesando' as const
    },
    {
      cliente: 'Ana Sofía Herrera',
      tipo: 'Evaluación',
      monto: 28000,
      comision: 2800,
      fecha: '2025-01-13',
      estado: 'Pendiente' as const
    },
    {
      cliente: 'Roberto Jiménez Silva',
      tipo: 'Liquidación',
      monto: 55000,
      comision: 5500,
      fecha: '2025-01-12',
      estado: 'Completado' as const
    },
  ];

  const financialSummary = [
    {
      title: 'Capital Activo',
      value: 720000,
      subtitle: 'En circulación',
      icon: '📈'
    },
    {
      title: 'Comisiones',
      value: 18800,
      subtitle: 'Total generadas',
      icon: '💰'
    },
    {
      title: 'Por Recuperar',
      value: 255000,
      subtitle: 'Pendiente',
      icon: '🏦'
    },
    {
      title: 'En Riesgo',
      value: 93000,
      subtitle: 'Recréditos',
      icon: '⚠️'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Activo':
      case 'Completado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Supervisión':
      case 'Procesando':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Pendiente':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Desembolsado':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Recrédito':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskBadgeColor = (riesgo: string) => {
    switch (riesgo) {
      case 'Bajo':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Alto':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Dashboard Financiero
            </h1>
            <p className="text-lg text-gray-600">
              Control total de inversiones y cartera de préstamos
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {summaryCards.map(({ title, value, change, changeType }) => (
              <div key={title} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <div className="text-2xl">📊</div>
                  <div className={`text-sm font-medium ${
                    changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">
                    {title}
                  </p>
                  <p className="text-2xl font-bold">
                    {typeof value === 'number' && value > 1000 
                      ? formatCurrency(value) 
                      : value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Loan Portfolio */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Cartera de Préstamos
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanPortfolio.map(({ cliente, monto, estado, comision, vencimiento, riesgo, avatar }) => (
                  <div key={cliente} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {avatar}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm leading-none">{cliente}</p>
                          <div className="flex gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(estado)}`}>
                              {estado}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(riesgo)}`}>
                              {riesgo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Monto:</span>
                        <span className="font-semibold">{formatCurrency(monto)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Comisión:</span>
                        <span className="font-semibold">{formatCurrency(comision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 flex items-center gap-1">
                          📅 Vencimiento:
                        </span>
                        <span>{vencimiento}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Resumen Financiero
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financialSummary.map(({ title, value, subtitle, icon }) => (
                  <div key={title} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <span className="font-medium text-sm">{title}</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {formatCurrency(value)}
                      </div>
                      <div className="text-sm text-gray-600">{subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📄</span>
                Movimientos Recientes
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Monto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Comisión</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map(({ cliente, tipo, monto, comision, fecha, estado }, index) => (
                      <tr key={`${cliente}-${fecha}`} className={index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''}>
                        <td className="py-3 px-4 font-medium">{cliente}</td>
                        <td className="py-3 px-4">{tipo}</td>
                        <td className="py-3 px-4 font-semibold">{formatCurrency(monto)}</td>
                        <td className="py-3 px-4">{formatCurrency(comision)}</td>
                        <td className="py-3 px-4">{fecha}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(estado)}`}>
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
      </div>
    </AuthenticatedLayout>
  );
}
