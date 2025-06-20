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
    { nombre: 'María López', monto: '$10,000', estado: 'Aprobado', barraColor: 'bg-green-100', progresoColor: 'bg-green-600', porcentaje: 'w-3/4' },
    { nombre: 'Carlos Ruiz', monto: '$5,000', estado: 'Supervisado', barraColor: 'bg-blue-100', progresoColor: 'bg-blue-500', porcentaje: 'w-1/2' },
    { nombre: 'Lucía Torres', monto: '$8,000', estado: 'Prospectado', barraColor: 'bg-blue-100', progresoColor: 'bg-blue-400', porcentaje: 'w-1/4' },
    { nombre: 'Pedro Sánchez', monto: '$12,000', estado: 'Desembolsado', barraColor: 'bg-green-100', progresoColor: 'bg-green-400', porcentaje: 'w-full' },
    { nombre: 'Ana García', monto: '$7,500', estado: 'Moroso', barraColor: 'bg-red-100', progresoColor: 'bg-red-600', porcentaje: 'w-full' },
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
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">Visión general rápida del sistema de créditos</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {summaryCards.map(({ title, value }) => (
            <div key={title} className="bg-white rounded-xl shadow p-6">
              <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
              <div className="text-2xl font-bold text-blue-600">{value}</div>
            </div>
          ))}
        </div>

        {/* Estado de Clientes */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Estado de clientes</h2>
          <div className="space-y-4">
            {clientStatuses.map(({ nombre, monto, estado, progresoColor, porcentaje }) => (
              <div key={nombre} className="space-y-1">
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span>{nombre}</span>
                  <span>{monto}</span>
                  <span className="text-sm text-slate-600">{estado}</span>
                </div>
                {/* Progress bar container always uses a light track */}
                <div className="w-full h-2 rounded bg-slate-200">
                  <div className={`h-full rounded ${progresoColor} ${porcentaje}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart + Leyenda */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Estado de los créditos</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
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
            <div className="flex flex-col gap-3">
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
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Últimas solicitudes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-left uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {latestRequests.map(([cliente, monto, estado, fecha]) => (
                  <tr key={cliente} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">{cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{monto}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{estado}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fecha}</td>
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
