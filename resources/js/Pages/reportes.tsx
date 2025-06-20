import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Reportes() {
  const [filters, setFilters] = useState({ 
    estado: '', 
    inicio: '', 
    fin: '', 
    promotora: '' 
  });

  const [data] = useState([
    { 
      id: 'CR-2023-001', 
      cliente: 'Juan Pérez López', 
      promotora: 'María Rodríguez', 
      monto: 15000, 
      estado: 'aprobado', 
      fechaSolicitud: '2023-05-15', 
      fechaAprobacion: '2023-05-18' 
    },
    { 
      id: 'CR-2023-005', 
      cliente: 'Ana Martínez Ruiz', 
      promotora: 'Carlos Sánchez', 
      monto: 8500, 
      estado: 'proceso', 
      fechaSolicitud: '2023-05-20', 
      fechaAprobacion: '' 
    },
    { 
      id: 'CR-2023-003', 
      cliente: 'Carlos Gómez Sánchez', 
      promotora: 'Ana Martínez', 
      monto: 12000, 
      estado: 'moroso', 
      fechaSolicitud: '2023-05-10', 
      fechaAprobacion: '2023-05-12' 
    },
    { 
      id: 'CR-2023-008', 
      cliente: 'Laura Díaz Mendoza', 
      promotora: 'María Rodríguez', 
      monto: 7200, 
      estado: 'pagado', 
      fechaSolicitud: '2023-05-05', 
      fechaAprobacion: '2023-05-08' 
    },
    { 
      id: 'CR-2023-012', 
      cliente: 'Roberto Jiménez', 
      promotora: 'Carlos Sánchez', 
      monto: 10000, 
      estado: 'aprobado', 
      fechaSolicitud: '2023-05-22', 
      fechaAprobacion: '2023-05-25' 
    },
  ]);

  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    const { estado, inicio, fin, promotora } = filters;
    const resultado = data.filter(item => {
      const estadoOk = !estado || item.estado === estado;
      const promotoraOk = !promotora || item.promotora === promotora;
      const fechaInicioOk = !inicio || new Date(item.fechaSolicitud) >= new Date(inicio);
      const fechaFinOk = !fin || new Date(item.fechaSolicitud) <= new Date(fin);
      return estadoOk && promotoraOk && fechaInicioOk && fechaFinOk;
    });
    setFiltered(resultado);
  }, [filters, data]);

  const resumen = {
    aprobado: filtered.filter(f => f.estado === 'aprobado').length,
    proceso: filtered.filter(f => f.estado === 'proceso').length,
    moroso: filtered.filter(f => f.estado === 'moroso').length,
    pagado: filtered.filter(f => f.estado === 'pagado').length
  };

  const totalMonto = filtered.reduce((sum, item) => sum + item.monto, 0);

  return (
    <AuthenticatedLayout>
      <Head title="Reportes - Sistema de Créditos" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Reportes de Créditos</h1>
          <p className="text-slate-600">Análisis detallado del estado de los créditos y su rendimiento</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Filtros de búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estado</label>
              <select 
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio</label>
              <input 
                type="date" 
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.inicio}
                onChange={e => setFilters(f => ({ ...f, inicio: e.target.value }))} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
              <input 
                type="date" 
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.fin}
                onChange={e => setFilters(f => ({ ...f, fin: e.target.value }))} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Promotora</label>
              <select 
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        {/* Cards de resumen */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <ResumenCard 
            titulo="Aprobados" 
            valor={resumen.aprobado} 
            color="text-green-600" 
            bgColor="bg-green-50"
            icon="✅"
          />
          <ResumenCard 
            titulo="En Proceso" 
            valor={resumen.proceso} 
            color="text-yellow-600" 
            bgColor="bg-yellow-50"
            icon="⏳"
          />
          <ResumenCard 
            titulo="Morosos" 
            valor={resumen.moroso} 
            color="text-red-600" 
            bgColor="bg-red-50"
            icon="⚠️"
          />
          <ResumenCard 
            titulo="Pagados" 
            valor={resumen.pagado} 
            color="text-blue-600" 
            bgColor="bg-blue-50"
            icon="💰"
          />
          <ResumenCard 
            titulo="Monto Total" 
            valor={`$${totalMonto.toLocaleString()}`} 
            color="text-purple-600" 
            bgColor="bg-purple-50"
            icon="📊"
            isAmount={true}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2">
            <span>📄</span>
            Exportar PDF
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2">
            <span>📊</span>
            Exportar Excel
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2">
            <span>🔄</span>
            Actualizar Datos
          </button>
        </div>

        {/* Tabla de datos */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">
              Detalle de Créditos ({filtered.length} registros)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    ID Crédito
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Promotora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha Solicitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha Aprobación
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {item.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {item.promotora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      ${item.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <EstadoBadge estado={item.estado} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {new Date(item.fechaSolicitud).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {item.fechaAprobacion ? new Date(item.fechaAprobacion).toLocaleDateString('es-ES') : '-'}
                    </td>
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

function ResumenCard({ 
  titulo, 
  valor, 
  color, 
  bgColor, 
  icon, 
  isAmount = false 
}: { 
  titulo: string; 
  valor: number | string; 
  color: string; 
  bgColor: string;
  icon: string;
  isAmount?: boolean;
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 border border-slate-200`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-sm font-medium text-slate-600 mb-1">{titulo}</h3>
      <p className={`text-2xl font-bold ${color}`}>
        {isAmount ? valor : valor}
      </p>
    </div>
  );
}

function EstadoBadge({ estado }: { estado: string }) {
  const estadoConfig: Record<string, { bg: string; text: string; icon: string }> = {
    aprobado: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
    proceso: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
    moroso: { bg: 'bg-red-100', text: 'text-red-800', icon: '⚠️' },
    pagado: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '💰' },
    rechazado: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '❌' },
  };

  const config = estadoConfig[estado] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: '❓' };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span>{config.icon}</span>
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );
}