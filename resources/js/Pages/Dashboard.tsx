import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard() {
  const summaryCards = [
    { title: 'Prospectados', value: 12 },
    { title: 'En revisión', value: 8 },
    { title: 'Aprobados', value: 5 },
    { title: 'Desembolsados', value: 3 },
    { title: 'Morosos', value: 1 },
  ];

  const clientStatuses = [
    { nombre: 'María López', monto: '$10,000', estado: 'Aprobado', progresoColor: 'bg-green-600', porcentaje: 'w-3/4' },
    { nombre: 'Carlos Ruiz', monto: '$5,000', estado: 'Supervisado', progresoColor: 'bg-blue-500', porcentaje: 'w-1/2' },
    { nombre: 'Lucía Torres', monto: '$8,000', estado: 'Prospectado', progresoColor: 'bg-blue-400', porcentaje: 'w-1/4' },
    { nombre: 'Pedro Sánchez', monto: '$12,000', estado: 'Desembolsado', progresoColor: 'bg-green-400', porcentaje: 'w-full' },
    { nombre: 'Ana García', monto: '$7,500', estado: 'Moroso', progresoColor: 'bg-red-600', porcentaje: 'w-full' },
  ];

  const chartLegend = [
    { label: 'Prospectados (12)', color: 'bg-blue-600' },
    { label: 'En supervisión (8)', color: 'bg-blue-300' },
    { label: 'Aprobados (5)', color: 'bg-green-600' },
    { label: 'Desembolsados (3)', color: 'bg-yellow-400' },
    { label: 'Morosos (1)', color: 'bg-red-600' },
  ];

  const latestRequests = [
    ['María López', '$10,000', 'Aprobado', '2025-06-17'],
    ['Carlos Ruiz', '$5,000', 'En revisión', '2025-06-16'],
    ['Lucía Torres', '$8,000', 'Prospectado', '2025-06-15'],
    ['Pedro Sánchez', '$12,000', 'Desembolsado', '2025-06-14'],
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard - Sistema de Créditos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">Dashboard</h1>
          <p className="text-sm sm:text-base text-slate-600">Visión general rápida del sistema de créditos</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {summaryCards.map(({ title, value }) => (
            <div key={title} className="bg-white rounded-xl shadow p-4 sm:p-6">
              <div className="text-xs sm:text-sm font-medium text-slate-500 mb-1">{title}</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{value}</div>
            </div>
          ))}
        </div>

        {/* Estado de Clientes */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Estado de clientes</h2>
          <div className="space-y-4 overflow-x-auto">
            {clientStatuses.map(({ nombre, monto, estado, progresoColor, porcentaje }) => (
              <div key={nombre} className="space-y-1 min-w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-slate-700 font-medium">
                  <span>{nombre}</span>
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span>{monto}</span>
                    <span className="text-xs text-slate-600">{estado}</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded bg-slate-200">
                  <div className={`h-full rounded ${progresoColor} ${porcentaje}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart + Leyenda */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Estado de los créditos</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* SVG responsive */}
            <div className="w-full max-w-xs mx-auto md:mx-0">
              <svg viewBox="0 0 200 200" className="w-full h-auto">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#3182ce" strokeWidth="20"
                  strokeDasharray="208 502" strokeDashoffset="0" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#63b3ed" strokeWidth="20"
                  strokeDasharray="139 502" strokeDashoffset="-208" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#38a169" strokeWidth="20"
                  strokeDasharray="87 502" strokeDashoffset="-347" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#ecc94b" strokeWidth="20"
                  strokeDasharray="52 502" strokeDashoffset="-434" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e53e3e" strokeWidth="20"
                  strokeDasharray="17 502" strokeDashoffset="-486" transform="rotate(-90 100 100)" />
                <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2d3748">29</text>
                <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#4a5568">Total</text>
              </svg>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {chartLegend.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded-full ${color}`}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla de Últimas Solicitudes */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-12">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Últimas solicitudes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {['Cliente', 'Monto', 'Estado', 'Fecha'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 sm:px-6 sm:py-3 text-left uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {latestRequests.map(([cliente, monto, estado, fecha]) => (
                  <tr key={cliente} className="hover:bg-slate-50">
                    <td className="px-4 py-2 sm:px-6">{cliente}</td>
                    <td className="px-4 py-2 sm:px-6">{monto}</td>
                    <td className="px-4 py-2 sm:px-6">{estado}</td>
                    <td className="px-4 py-2 sm:px-6">{fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
