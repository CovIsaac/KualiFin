import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function reportes() {
  const [filters, setFilters] = useState({ estado: '', inicio: '', fin: '', promotora: '' });

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
      const fechaInicioOk = !inicio || new Date(item.fechaSolicitud) >= new Date(inicio);
      const fechaFinOk = !fin || new Date(item.fechaSolicitud) <= new Date(fin);
      return estadoOk && promotoraOk && fechaInicioOk && fechaFinOk;
    });
    setFiltered(resultado);
  }, [filters]);

  const resumen = {
    aprobado: filtered.filter(f => f.estado === 'aprobado').length,
    proceso: filtered.filter(f => f.estado === 'proceso').length,
    moroso: filtered.filter(f => f.estado === 'moroso').length,
    pagado: filtered.filter(f => f.estado === 'pagado').length
  };

  return (
    <AuthenticatedLayout>
      <Head title="Reporte de Créditos" />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Reporte de Créditos</h1>

        <section className="bg-white rounded-lg shadow p-4 mb-6 grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Estado</label>
            <select className="w-full border rounded px-3 py-2" onChange={e => setFilters(f => ({ ...f, estado: e.target.value }))}>
              <option value="">Todos</option>
              <option value="aprobado">Aprobado</option>
              <option value="proceso">En proceso</option>
              <option value="moroso">Moroso</option>
              <option value="pagado">Pagado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha Inicio</label>
            <input type="date" className="w-full border rounded px-3 py-2" onChange={e => setFilters(f => ({ ...f, inicio: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha Fin</label>
            <input type="date" className="w-full border rounded px-3 py-2" onChange={e => setFilters(f => ({ ...f, fin: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Promotora</label>
            <select className="w-full border rounded px-3 py-2" onChange={e => setFilters(f => ({ ...f, promotora: e.target.value }))}>
              <option value="">Todas</option>
              <option value="María Rodríguez">María Rodríguez</option>
              <option value="Carlos Sánchez">Carlos Sánchez</option>
              <option value="Ana Martínez">Ana Martínez</option>
            </select>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ResumenCard titulo="Aprobados" valor={resumen.aprobado} color="text-green-600" />
          <ResumenCard titulo="En Proceso" valor={resumen.proceso} color="text-yellow-600" />
          <ResumenCard titulo="Morosos" valor={resumen.moroso} color="text-red-600" />
          <ResumenCard titulo="Pagados" valor={resumen.pagado} color="text-blue-600" />
        </section>

        <div className="flex gap-4 justify-center mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Actualizar Datos</button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID Crédito</th>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Promotora</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Fecha Solicitud</th>
                <th className="px-4 py-2 text-left">Fecha Aprobación</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-2">{d.id}</td>
                  <td className="px-4 py-2">{d.cliente}</td>
                  <td className="px-4 py-2">{d.promotora}</td>
                  <td className="px-4 py-2">${d.monto.toLocaleString()}</td>
                  <td className="px-4 py-2"><EstadoBadge estado={d.estado} /></td>
                  <td className="px-4 py-2">{d.fechaSolicitud}</td>
                  <td className="px-4 py-2">{d.fechaAprobacion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function ResumenCard({ titulo, valor, color }: { titulo: string; valor: number; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <h3 className="text-sm text-gray-500 mb-1">{titulo}</h3>
      <p className={`text-2xl font-bold ${color}`}>{valor}</p>
    </div>
  );
}

function EstadoBadge({ estado }: { estado: string }) {
  const map: any = {
    aprobado: 'bg-green-100 text-green-600',
    proceso: 'bg-yellow-100 text-yellow-600',
    moroso: 'bg-red-100 text-red-600',
    pagado: 'bg-blue-100 text-blue-600',
    rechazado: 'bg-gray-200 text-gray-600',
  };
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${map[estado] || 'bg-gray-100 text-gray-500'}`}>{estado}</span>
  );
}
