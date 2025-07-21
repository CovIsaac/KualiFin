import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Reportes() {
  const [filters, setFilters] = useState({
    estado: '',
    inicio: '',
    fin: '',
    promotora: '',
  });

  const [data] = useState([
    { id: 'CR-2023-001', cliente: 'Juan Pérez López', promotora: 'María Rodríguez', monto: 15000, estado: 'aprobado', fechaSolicitud: '2023-05-15', fechaAprobacion: '2023-05-18' },
    { id: 'CR-2023-005', cliente: 'Ana Martínez Ruiz', promotora: 'Carlos Sánchez', monto: 8500, estado: 'proceso', fechaSolicitud: '2023-05-20', fechaAprobacion: '' },
    { id: 'CR-2023-003', cliente: 'Carlos Gómez Sánchez', promotora: 'Ana Martínez', monto: 12000, estado: 'moroso', fechaSolicitud: '2023-05-10', fechaAprobacion: '2023-05-12' },
    { id: 'CR-2023-008', cliente: 'Laura Díaz Mendoza', promotora: 'María Rodríguez', monto: 7200, estado: 'pagado', fechaSolicitud: '2023-05-05', fechaAprobacion: '2023-05-08' },
    { id: 'CR-2023-012', cliente: 'Roberto Jiménez', promotora: 'Carlos Sánchez', monto: 10000, estado: 'aprobado', fechaSolicitud: '2023-05-22', fechaAprobacion: '2023-05-25' },
  ]);

  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    const { estado, inicio, fin, promotora } = filters;
    const resultado = data.filter(item => {
      const estadoOk = !estado || item.estado === estado;
      const promotoraOk = !promotora || item.promotora === promotora;
      const fechaInicio = !inicio || new Date(item.fechaSolicitud) >= new Date(inicio);
      const fechaFin = !fin || new Date(item.fechaSolicitud) <= new Date(fin);
      return estadoOk && promotoraOk && fechaInicio && fechaFin;
    });
    setFiltered(resultado);
  }, [filters, data]);

  const resumen = {
    aprobado: filtered.filter(f => f.estado === 'aprobado').length,
    proceso: filtered.filter(f => f.estado === 'proceso').length,
    moroso: filtered.filter(f => f.estado === 'moroso').length,
    pagado: filtered.filter(f => f.estado === 'pagado').length,
  };

  const totalMonto = filtered.reduce((sum, item) => sum + item.monto, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const summaryCards = [
    { title: 'Aprobados', value: resumen.aprobado, icon: '✅', change: '+12.5%', changeType: 'positive' as const },
    { title: 'En Proceso', value: resumen.proceso, icon: '⏳', change: '+8.2%', changeType: 'positive' as const },
    { title: 'Morosos', value: resumen.moroso, icon: '⚠️', change: '-2.1%', changeType: 'negative' as const },
    { title: 'Pagados', value: resumen.pagado, icon: '💰', change: '+15.7%', changeType: 'positive' as const },
    { title: 'Monto Total', value: totalMonto, icon: '📊', change: '+18.3%', changeType: 'positive' as const, isAmount: true },
  ];

  const getStatusBadgeColor = (estado: string) => {
    switch (estado) {
      case 'aprobado':
      case 'pagado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'proceso':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'moroso':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'rechazado':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Reportes - Sistema de Créditos" />
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Reportes de Créditos
            </h1>
            <p className="text-lg text-gray-600">
              Análisis detallado del estado de los créditos y su rendimiento
            </p>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🔍</span>
              <h2 className="text-xl font-semibold text-gray-900">
                Filtros de Búsqueda
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.estado}
                  onChange={e => setFilters(f => ({ ...f, estado: e.target.value }))}
                >
                  <option value="">Todos los estados</option>
                  <option value="aprobado">Aprobado</option>
                  <option value="proceso">En proceso</option>
                  <option value="moroso">Moroso</option>
                  <option value="pagado">Pagado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.inicio}
                  onChange={e => setFilters(f => ({ ...f, inicio: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.fin}
                  onChange={e => setFilters(f => ({ ...f, fin: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotora</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.promotora}
                  onChange={e => setFilters(f => ({ ...f, promotora: e.target.value }))}
                >
                  <option value="">Todas las promotoras</option>
                  <option value="María Rodríguez">María Rodríguez</option>
                  <option value="Carlos Sánchez">Carlos Sánchez</option>
                  <option value="Ana Martínez">Ana Martínez</option>
                </select>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {summaryCards.map(({ title, value, icon, change, changeType, isAmount }) => (
              <div key={title} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <div className="text-2xl">{icon}</div>
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
                    {isAmount ? formatCurrency(value) : value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              <span>📄</span> Exportar PDF
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              <span>📊</span> Exportar Excel
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              <span>🔄</span> Actualizar Datos
            </button>
          </div>

          {/* Vista móvil: cards */}
          <div className="md:hidden space-y-4">
            {filtered.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{item.id}</p>
                    <p className="text-sm text-gray-600">{item.cliente}</p>
                  </div>
                  <EstadoBadge estado={item.estado} />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monto:</span>
                    <span className="font-semibold">{formatCurrency(item.monto)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Promotora:</span>
                    <span>{item.promotora}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Fecha:</span>
                    <span>{new Date(item.fechaSolicitud).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla para desktop */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Detalle de Créditos ({filtered.length} registros)
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ID Crédito</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 hidden sm:table-cell">Promotora</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Monto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 hidden md:table-cell">Fecha Solicitud</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 hidden lg:table-cell">Fecha Aprobación</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, idx) => (
                    <tr key={idx} className={`hover:bg-gray-50 ${idx !== filtered.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <td className="py-3 px-4 font-medium">{item.id}</td>
                      <td className="py-3 px-4 font-medium">{item.cliente}</td>
                      <td className="py-3 px-4 hidden sm:table-cell">{item.promotora}</td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(item.monto)}</td>
                      <td className="py-3 px-4"><EstadoBadge estado={item.estado} /></td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        {new Date(item.fechaSolicitud).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {item.fechaAprobacion ? new Date(item.fechaAprobacion).toLocaleDateString('es-ES') : '-'}
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

function EstadoBadge({ estado }: { estado: string }) {
  const getStatusBadgeColor = (estado: string) => {
    switch (estado) {
      case 'aprobado':
      case 'pagado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'proceso':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'moroso':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'rechazado':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'aprobado': return '✅';
      case 'proceso': return '⏳';
      case 'moroso': return '⚠️';
      case 'pagado': return '💰';
      case 'rechazado': return '❌';
      default: return '❓';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(estado)}`}>
      <span>{getStatusIcon(estado)}</span>
      <span className="capitalize">{estado}</span>
    </span>
  );
}