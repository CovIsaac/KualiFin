import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const { estado, inicio, fin, promotora } = filters;
    const resultado = data.filter(item => {
      const estadoOk     = !estado     || item.estado === estado;
      const promotoraOk  = !promotora  || item.promotora === promotora;
      const fechaInicio  = !inicio     || new Date(item.fechaSolicitud) >= new Date(inicio);
      const fechaFin     = !fin        || new Date(item.fechaSolicitud) <= new Date(fin);
      return estadoOk && promotoraOk && fechaInicio && fechaFin;
    });
    setFiltered(resultado);
  }, [filters, data]);

  const resumen = {
    aprobado: filtered.filter(f => f.estado === 'aprobado').length,
    proceso:  filtered.filter(f => f.estado === 'proceso').length,
    moroso:   filtered.filter(f => f.estado === 'moroso').length,
    pagado:   filtered.filter(f => f.estado === 'pagado').length,
  };

  const totalMonto = filtered.reduce((sum, item) => sum + item.monto, 0);

  const summaryCards = [
    { title: 'Aprobados', value: resumen.aprobado, icon: '✅', gradient: 'from-green-500 to-emerald-400', bgGradient: 'from-green-50 to-emerald-50' },
    { title: 'En Proceso', value: resumen.proceso, icon: '⏳', gradient: 'from-amber-500 to-orange-400', bgGradient: 'from-amber-50 to-orange-50' },
    { title: 'Morosos', value: resumen.moroso, icon: '⚠️', gradient: 'from-red-500 to-pink-400', bgGradient: 'from-red-50 to-pink-50' },
    { title: 'Pagados', value: resumen.pagado, icon: '💰', gradient: 'from-blue-500 to-cyan-400', bgGradient: 'from-blue-50 to-cyan-50' },
    { title: 'Monto Total', value: `$${totalMonto.toLocaleString()}`, icon: '📊', gradient: 'from-purple-500 to-violet-400', bgGradient: 'from-purple-50 to-violet-50', isAmount: true },
  ];

  // Animación de contadores
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      summaryCards.forEach((card, index) => {
        if (card.isAmount) {
          let current = 0;
          const increment = totalMonto / 30;
          const counter = setInterval(() => {
            current += increment;
            if (current >= totalMonto) {
              current = totalMonto;
              clearInterval(counter);
            }
            setAnimatedValues(prev => {
              const newValues = [...prev];
              newValues[index] = Math.floor(current);
              return newValues;
            });
          }, 50);
        } else {
          let current = 0;
          const increment = (card.value as number) / 30;
          const counter = setInterval(() => {
            current += increment;
            if (current >= (card.value as number)) {
              current = card.value as number;
              clearInterval(counter);
            }
            setAnimatedValues(prev => {
              const newValues = [...prev];
              newValues[index] = Math.floor(current);
              return newValues;
            });
          }, 50);
        }
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [filtered]);

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

  return (
    <AuthenticatedLayout>
      <Head title="Reportes - Sistema de Créditos" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header súper moderno */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <span className="animate-pulse">📊</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Reportes de Créditos
                    </h1>
                    <p className="text-slate-600 font-medium text-lg mt-2">
                      Análisis detallado del estado de los créditos y su rendimiento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filtros súper modernos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 mb-12 group"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🔍
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Filtros de Búsqueda
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Estado */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Estado</label>
                  <select
                    className={inputBase}
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
                </motion.div>

                {/* Fecha Inicio */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha Inicio</label>
                  <input
                    type="date"
                    className={inputBase}
                    value={filters.inicio}
                    onChange={e => setFilters(f => ({ ...f, inicio: e.target.value }))}
                  />
                </motion.div>

                {/* Fecha Fin */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha Fin</label>
                  <input
                    type="date"
                    className={inputBase}
                    value={filters.fin}
                    onChange={e => setFilters(f => ({ ...f, fin: e.target.value }))}
                  />
                </motion.div>

                {/* Promotora */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Promotora</label>
                  <select
                    className={inputBase}
                    value={filters.promotora}
                    onChange={e => setFilters(f => ({ ...f, promotora: e.target.value }))}
                  >
                    <option value="">Todas las promotoras</option>
                    <option value="María Rodríguez">María Rodríguez</option>
                    <option value="Carlos Sánchez">Carlos Sánchez</option>
                    <option value="Ana Martínez">Ana Martínez</option>
                  </select>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Cards de resumen súper modernos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {summaryCards.map(({ title, value, icon, gradient, bgGradient, isAmount }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} p-6 shadow-xl hover:shadow-2xl transform transition-all duration-500 border border-white/20`}
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-3xl p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</div>
                      <div className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {isAmount ? `$${animatedValues[index].toLocaleString()}` : animatedValues[index]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso decorativa */}
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                      initial={{ width: '0%' }}
                      animate={{ width: isVisible ? `${isAmount ? 100 : Math.min((value as number / Math.max(...summaryCards.filter(c => !c.isAmount).map(c => c.value as number))) * 100, 100)}%` : '0%' }}
                      transition={{ duration: 1, delay: 1 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botones de acción súper modernos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg"
            >
              <span className="text-xl">📄</span> Exportar PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg"
            >
              <span className="text-xl">📊</span> Exportar Excel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 bg-white/80 backdrop-blur-sm"
            >
              <span className="text-xl">🔄</span> Actualizar Datos
            </motion.button>
          </motion.div>

          {/* Detalle para móvil: cards súper modernos */}
          <div className="md:hidden space-y-6 mb-8">
            {filtered.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + idx * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 group relative overflow-hidden"
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-700">ID: {item.id}</p>
                    <EstadoBadge estado={item.estado} />
                  </div>
                  <p className="text-sm"><strong>Cliente:</strong> {item.cliente}</p>
                  <p className="text-sm"><strong>Monto:</strong> <span className="font-bold text-green-600">${item.monto.toLocaleString()}</span></p>
                  <p className="text-sm"><strong>Promotora:</strong> {item.promotora}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabla súper moderna para tablet+desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="hidden md:block relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 group"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📋</div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Detalle de Créditos ({filtered.length} registros)
                  </h3>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
                    <tr>
                      {['ID Crédito', 'Cliente', 'Promotora', 'Monto', 'Estado', 'Fecha Solicitud', 'Fecha Aprobación'].map((header, index) => (
                        <th
                          key={header}
                          className={`px-8 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider ${
                            header === 'Promotora' ? 'hidden sm:table-cell' : 
                            header === 'Fecha Solicitud' ? 'hidden md:table-cell' :
                            header === 'Fecha Aprobación' ? 'hidden lg:table-cell' : ''
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filtered.map((item, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 2 + idx * 0.05 }}
                        className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                      >
                        <td className="px-8 py-6">
                          <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                            {item.id}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors duration-300">
                            {item.cliente}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-8 py-6 text-slate-600 font-medium">{item.promotora}</td>
                        <td className="px-8 py-6">
                          <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ${item.monto.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-8 py-6"><EstadoBadge estado={item.estado} /></td>
                        <td className="hidden md:table-cell px-8 py-6 text-slate-600 font-medium">
                          {new Date(item.fechaSolicitud).toLocaleDateString('es-ES')}
                        </td>
                        <td className="hidden lg:table-cell px-8 py-6 text-slate-600 font-medium">
                          {item.fechaAprobacion ? new Date(item.fechaAprobacion).toLocaleDateString('es-ES') : '-'}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
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

function EstadoBadge({ estado }: { estado: string }) {
  const cfg: Record<string, { bg: string; text: string; icon: string; gradient: string }> = {
    aprobado:  { bg: 'bg-green-100',  text: 'text-green-800',  icon: '✅', gradient: 'from-green-500 to-emerald-500' },
    proceso:   { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳', gradient: 'from-amber-500 to-orange-500' },
    moroso:    { bg: 'bg-red-100',    text: 'text-red-800',    icon: '⚠️', gradient: 'from-red-500 to-pink-500' },
    pagado:    { bg: 'bg-blue-100',   text: 'text-blue-800',   icon: '💰', gradient: 'from-blue-500 to-cyan-500' },
    rechazado: { bg: 'bg-gray-100',   text: 'text-gray-800',   icon: '❌', gradient: 'from-gray-500 to-slate-500' },
  };
  const { bg, text, icon, gradient } = cfg[estado] || cfg['rechazado'];
  
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 border-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 ${bg} ${text}`}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        backgroundImage: `linear-gradient(135deg, ${gradient.includes('green') ? '#10b981, #34d399' : gradient.includes('amber') ? '#f59e0b, #f97316' : gradient.includes('red') ? '#ef4444, #f472b6' : gradient.includes('blue') ? '#3b82f6, #06b6d4' : '#6b7280, #64748b'})`
      }}
    >
      <span className="text-base">{icon}</span>
      <span className="capitalize font-bold">{estado}</span>
    </motion.span>
  );
}