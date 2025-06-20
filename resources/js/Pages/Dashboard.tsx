import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard - Sistema de Créditos" />

      {/* Cards */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-6 mb-8 justify-center">
        {[
            { title: 'Prospectados', value: 12 },
            { title: 'En revisión', value: 8 },
            { title: 'Aprobados', value: 5 },
            { title: 'Desembolsados', value: 3 },
            { title: 'Morosos', value: 1 },
        ].map(({ title, value }) => (
            <div key={title} className="bg-white rounded-xl shadow p-6 w-full md:w-44">
            <div className="text-slate-500 text-sm mb-1">{title}</div>
            <div className="text-2xl font-bold text-blue-600">{value}</div>
            </div>
        ))}
        </div>


      {/* Estado de clientes */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-4xl mx-auto">
        <h3 className="text-lg font-bold mb-4">Estado de clientes</h3>
        {[
          { nombre: 'María López', monto: '$10,000', estado: 'Aprobado', clase: 'bg-blue-600', ancho: 'w-3/4' },
          { nombre: 'Carlos Ruiz', monto: '$5,000', estado: 'Supervisado', clase: 'bg-blue-500', ancho: 'w-1/2' },
          { nombre: 'Lucía Torres', monto: '$8,000', estado: 'Prospectado', clase: 'bg-blue-400', ancho: 'w-1/4' },
          { nombre: 'Pedro Sánchez', monto: '$12,000', estado: 'Desembolsado', clase: 'bg-green-400', ancho: 'w-full' },
          { nombre: 'Ana García', monto: '$7,500', estado: 'Moroso', clase: 'bg-red-600', ancho: 'w-full' },
        ].map(({ nombre, monto, estado, clase, ancho }) => (
          <div key={nombre} className="border-b border-slate-200 py-4">
            <div className="font-medium text-slate-700 mb-2">
              {nombre} — {monto}{' '}
              <span className={`ml-4 text-sm text-slate-600`}> {estado}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded">
              <div className={`h-full rounded ${clase} ${ancho}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + leyenda */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-lg font-bold mb-6">Estado de los créditos</h3>
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="20" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#3182ce" strokeWidth="20" strokeDasharray="208 502" strokeDashoffset="0" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#63b3ed" strokeWidth="20" strokeDasharray="139 502" strokeDashoffset="-208" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#38a169" strokeWidth="20" strokeDasharray="87 502" strokeDashoffset="-347" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#ecc94b" strokeWidth="20" strokeDasharray="52 502" strokeDashoffset="-434" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e53e3e" strokeWidth="20" strokeDasharray="17 502" strokeDashoffset="-486" transform="rotate(-90 100 100)" />
            <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2d3748">29</text>
            <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#4a5568">Total</text>
          </svg>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Prospectados (12)', color: 'bg-blue-600' },
              { label: 'En supervisión (8)', color: 'bg-blue-300' },
              { label: 'Aprobados (5)', color: 'bg-green-600' },
              { label: 'Desembolsados (3)', color: 'bg-yellow-400' },
              { label: 'Morosos (1)', color: 'bg-red-600' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <div className={`w-4 h-4 rounded-full ${color}`}></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Últimas solicitudes</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-2 text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['María López', '$10,000', 'Aprobado', '2025-06-17'],
                ['Carlos Ruiz', '$5,000', 'En revisión', '2025-06-16'],
                ['Lucía Torres', '$8,000', 'Prospectado', '2025-06-15'],
                ['Pedro Sánchez', '$12,000', 'Desembolsado', '2025-06-14'],
              ].map(([cliente, monto, estado, fecha]) => (
                <tr key={cliente} className="border-b border-slate-200">
                  <td className="px-4 py-2">{cliente}</td>
                  <td className="px-4 py-2">{monto}</td>
                  <td className="px-4 py-2">{estado}</td>
                  <td className="px-4 py-2">{fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
