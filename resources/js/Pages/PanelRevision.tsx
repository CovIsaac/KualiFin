import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos de datos
interface Credito {
  id: string;
  cliente: string;
  monto: number;
  plazo: number;
  fechaSolicitud: string;
  estado: 'pendiente_revision' | 'aprobado_inicial' | 'pendiente_preguntas' | 'revision_final' | 'aprobado_final' | 'rechazado';
  promotora: string;
  documentos: string[];
  preguntas?: {
    pregunta: string;
    respuesta: string;
  }[];
  observaciones?: string;
}

// Datos de ejemplo
const creditosEjemplo: Credito[] = [
  {
    id: 'CR-2025-001',
    cliente: 'Juan Pérez López',
    monto: 15000,
    plazo: 12,
    fechaSolicitud: '2025-01-15',
    estado: 'pendiente_revision',
    promotora: 'María Rodríguez',
    documentos: ['INE', 'CURP', 'Comprobante de domicilio', 'Estados de cuenta'],
  },
  {
    id: 'CR-2025-002',
    cliente: 'Ana García Martínez',
    monto: 8500,
    plazo: 6,
    fechaSolicitud: '2025-01-14',
    estado: 'aprobado_inicial',
    promotora: 'Carlos Sánchez',
    documentos: ['INE', 'CURP', 'Comprobante de domicilio'],
  },
  {
    id: 'CR-2025-003',
    cliente: 'Roberto Silva Torres',
    monto: 12000,
    plazo: 18,
    fechaSolicitud: '2025-01-13',
    estado: 'pendiente_preguntas',
    promotora: 'Ana Martínez',
    documentos: ['INE', 'CURP', 'Comprobante de domicilio', 'Referencias'],
    preguntas: [
      { pregunta: '¿Cuál es su ingreso mensual actual?', respuesta: '$25,000 pesos mensuales' },
      { pregunta: '¿Tiene otros créditos activos?', respuesta: 'No, ningún crédito activo' },
      { pregunta: '¿Para qué utilizará el crédito?', respuesta: 'Expansión de mi negocio de abarrotes' },
    ],
  },
  {
    id: 'CR-2025-004',
    cliente: 'Lucía Hernández Ruiz',
    monto: 20000,
    plazo: 24,
    fechaSolicitud: '2025-01-12',
    estado: 'revision_final',
    promotora: 'María Rodríguez',
    documentos: ['INE', 'CURP', 'Comprobante de domicilio', 'Estados de cuenta', 'Referencias'],
    preguntas: [
      { pregunta: '¿Cuántos años tiene su negocio?', respuesta: '5 años establecido' },
      { pregunta: '¿Cuál es su garantía?', respuesta: 'Propiedad comercial' },
    ],
  },
];

export default function PanelRevision() {
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [creditoSeleccionado, setCreditoSeleccionado] = useState<Credito | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [accionModal, setAccionModal] = useState<'aprobar' | 'rechazar' | 'preguntas' | 'liberar'>('aprobar');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);

  const { data: formData, setData, post, processing } = useForm({
    credito_id: '',
    accion: '',
    observaciones: '',
    preguntas: '',
  });

  // Filtrar créditos según el estado seleccionado
  const creditosFiltrados = filtroEstado === 'todos' 
    ? creditosEjemplo 
    : creditosEjemplo.filter(credito => credito.estado === filtroEstado);

  const estadisticas = [
    { 
      titulo: 'Pendientes', 
      valor: creditosEjemplo.filter(c => c.estado === 'pendiente_revision').length,
      icon: '⏳',
      gradient: 'from-yellow-500 to-orange-400',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    { 
      titulo: 'Aprobados', 
      valor: creditosEjemplo.filter(c => c.estado === 'aprobado_inicial').length,
      icon: '✅',
      gradient: 'from-blue-500 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    { 
      titulo: 'Con Preguntas', 
      valor: creditosEjemplo.filter(c => c.estado === 'pendiente_preguntas').length,
      icon: '❓',
      gradient: 'from-purple-500 to-violet-400',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    { 
      titulo: 'Revisión Final', 
      valor: creditosEjemplo.filter(c => c.estado === 'revision_final').length,
      icon: '🔍',
      gradient: 'from-orange-500 to-red-400',
      bgGradient: 'from-orange-50 to-red-50'
    },
  ];

  // Animación de contadores
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      estadisticas.forEach((stat, index) => {
        let current = 0;
        const increment = stat.valor / 30;
        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.valor) {
            current = stat.valor;
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

  const abrirModal = (credito: Credito, accion: 'aprobar' | 'rechazar' | 'preguntas' | 'liberar') => {
    setCreditoSeleccionado(credito);
    setAccionModal(accion);
    setData('credito_id', credito.id);
    setData('accion', accion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCreditoSeleccionado(null);
    setData('observaciones', '');
    setData('preguntas', '');
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la acción
    console.log('Procesando:', formData);
    // post(route('creditos.procesar'), {
    //   onSuccess: () => cerrarModal(),
    // });
    cerrarModal();
  };

  const obtenerEstadoBadge = (estado: string) => {
    const configuraciones = {
      pendiente_revision: { 
        bg: 'bg-gradient-to-r from-yellow-100 to-orange-100', 
        text: 'text-yellow-800', 
        border: 'border-yellow-300',
        icon: '⏳',
        gradient: 'from-yellow-500 to-orange-500'
      },
      aprobado_inicial: { 
        bg: 'bg-gradient-to-r from-blue-100 to-cyan-100', 
        text: 'text-blue-800', 
        border: 'border-blue-300',
        icon: '✅',
        gradient: 'from-blue-500 to-cyan-500'
      },
      pendiente_preguntas: { 
        bg: 'bg-gradient-to-r from-purple-100 to-violet-100', 
        text: 'text-purple-800', 
        border: 'border-purple-300',
        icon: '❓',
        gradient: 'from-purple-500 to-violet-500'
      },
      revision_final: { 
        bg: 'bg-gradient-to-r from-orange-100 to-red-100', 
        text: 'text-orange-800', 
        border: 'border-orange-300',
        icon: '🔍',
        gradient: 'from-orange-500 to-red-500'
      },
      aprobado_final: { 
        bg: 'bg-gradient-to-r from-green-100 to-emerald-100', 
        text: 'text-green-800', 
        border: 'border-green-300',
        icon: '🚀',
        gradient: 'from-green-500 to-emerald-500'
      },
      rechazado: { 
        bg: 'bg-gradient-to-r from-red-100 to-pink-100', 
        text: 'text-red-800', 
        border: 'border-red-300',
        icon: '❌',
        gradient: 'from-red-500 to-pink-500'
      },
    };

    const textos = {
      pendiente_revision: 'Pendiente Revisión',
      aprobado_inicial: 'Aprobado Inicial',
      pendiente_preguntas: 'Pendiente Preguntas',
      revision_final: 'Revisión Final',
      aprobado_final: 'Aprobado Final',
      rechazado: 'Rechazado',
    };

    const config = configuraciones[estado as keyof typeof configuraciones];

    return (
      <motion.span
        whileHover={{ scale: 1.05 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 shadow-lg backdrop-blur-sm transition-all duration-300 ${config.bg} ${config.text} ${config.border}`}
      >
        <span className="text-base">{config.icon}</span>
        <span>{textos[estado as keyof typeof textos]}</span>
      </motion.span>
    );
  };

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

  return (
    <AuthenticatedLayout>
      <Head title="Panel de Revisión - Sistema de Créditos" />

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
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <span className="animate-pulse">📋</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Panel de Revisión
                    </h1>
                    <p className="text-slate-600 font-medium text-lg">
                      Gestión y revisión de solicitudes de crédito en todas sus etapas
                    </p>
                  </div>
                </div>

                {/* Estadísticas rápidas súper modernas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {estadisticas.map(({ titulo, valor, icon, gradient, bgGradient }, index) => (
                    <motion.div
                      key={titulo}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
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
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{titulo}</div>
                            <div className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                              {animatedValues[index]}
                            </div>
                          </div>
                        </div>
                        
                        {/* Barra de progreso decorativa */}
                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                            initial={{ width: '0%' }}
                            animate={{ width: isVisible ? `${Math.min((valor / Math.max(...estadisticas.map(s => s.valor))) * 100, 100)}%` : '0%' }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filtros súper modernos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 mb-12 group"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🔍
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Filtros de Búsqueda
                </h2>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <label className="text-sm font-semibold text-slate-700">Filtrar por estado:</label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className={inputBase}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente_revision">Pendiente Revisión</option>
                  <option value="aprobado_inicial">Aprobado Inicial</option>
                  <option value="pendiente_preguntas">Pendiente Preguntas</option>
                  <option value="revision_final">Revisión Final</option>
                  <option value="aprobado_final">Aprobado Final</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Lista de Créditos súper moderna */}
          <div className="space-y-8">
            {creditosFiltrados.map((credito, index) => (
              <motion.div
                key={credito.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 group"
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Información del crédito */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                          📄
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-slate-800 mb-2">{credito.id}</h3>
                          {obtenerEstadoBadge(credito.estado)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-2xl p-4 border border-blue-200/30">
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Cliente</span>
                          <p className="text-slate-800 font-bold text-lg">{credito.cliente}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl p-4 border border-green-200/30">
                          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Monto</span>
                          <p className="text-slate-800 font-black text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ${credito.monto.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 rounded-2xl p-4 border border-purple-200/30">
                          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Plazo</span>
                          <p className="text-slate-800 font-bold text-lg">{credito.plazo} meses</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-2xl p-4 border border-orange-200/30">
                          <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Promotora</span>
                          <p className="text-slate-800 font-bold text-lg">{credito.promotora}</p>
                        </div>
                      </div>

                      {/* Documentos */}
                      <div className="mb-6">
                        <span className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
                          <span className="text-lg">📎</span> Documentos:
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {credito.documentos.map((doc, docIndex) => (
                            <motion.span
                              key={docIndex}
                              whileHover={{ scale: 1.05 }}
                              className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              📄 {doc}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Preguntas (si existen) */}
                      {credito.preguntas && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-gradient-to-br from-purple-50/80 to-violet-50/80 rounded-2xl p-6 border border-purple-200/50 backdrop-blur-sm"
                        >
                          <span className="text-sm font-bold text-purple-800 mb-4 block flex items-center gap-2">
                            <span className="text-lg">❓</span> Preguntas de la Promotora:
                          </span>
                          <div className="space-y-4">
                            {credito.preguntas.map((item, preguntaIndex) => (
                              <div key={preguntaIndex} className="bg-white/60 rounded-xl p-4 border border-purple-200/30">
                                <p className="font-bold text-purple-700 mb-2">P: {item.pregunta}</p>
                                <p className="text-purple-600 ml-4 font-medium">R: {item.respuesta}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Acciones súper modernas */}
                    <div className="flex flex-col gap-4 lg:w-56">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => alert(`Ver documentos de ${credito.id}`)}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                      >
                        <span className="text-lg">👁️</span> Ver Documentos
                      </motion.button>

                      {credito.estado === 'pendiente_revision' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(34, 197, 94, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => abrirModal(credito, 'aprobar')}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                          >
                            <span className="text-lg">✅</span> Aprobar
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => abrirModal(credito, 'rechazar')}
                            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                          >
                            <span className="text-lg">❌</span> Rechazar
                          </motion.button>
                        </>
                      )}

                      {credito.estado === 'aprobado_inicial' && (
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(147, 51, 234, 0.4)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => abrirModal(credito, 'preguntas')}
                          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                        >
                          <span className="text-lg">❓</span> Enviar Preguntas
                        </motion.button>
                      )}

                      {(credito.estado === 'pendiente_preguntas' || credito.estado === 'revision_final') && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(34, 197, 94, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => abrirModal(credito, 'liberar')}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                          >
                            <span className="text-lg">🚀</span> Liberar Crédito
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => abrirModal(credito, 'rechazar')}
                            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                          >
                            <span className="text-lg">❌</span> Rechazar
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal súper moderno */}
          <AnimatePresence>
            {modalAbierto && creditoSeleccionado && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/30"
                >
                  {/* Efecto de gradiente en el modal */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/80 to-white/60 rounded-3xl"></div>
                  
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg ${
                          accionModal === 'aprobar' || accionModal === 'liberar'
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                            : accionModal === 'rechazar'
                            ? 'bg-gradient-to-br from-red-500 to-pink-600'
                            : 'bg-gradient-to-br from-purple-500 to-violet-600'
                        }`}>
                          {accionModal === 'aprobar' && '✅'}
                          {accionModal === 'rechazar' && '❌'}
                          {accionModal === 'preguntas' && '❓'}
                          {accionModal === 'liberar' && '🚀'}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-800">
                            {accionModal === 'aprobar' && 'Aprobar Crédito'}
                            {accionModal === 'rechazar' && 'Rechazar Crédito'}
                            {accionModal === 'preguntas' && 'Enviar Preguntas'}
                            {accionModal === 'liberar' && 'Liberar Crédito'}
                          </h3>
                          <p className="text-sm text-slate-600">Confirme la acción</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cerrarModal}
                        className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors duration-200"
                      >
                        ✕
                      </motion.button>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50/80 to-white/80 rounded-2xl p-6 mb-8 border border-slate-200/50">
                      <div className="space-y-3">
                        <p className="text-slate-600">
                          <strong className="text-slate-800">Crédito:</strong> {creditoSeleccionado.id}
                        </p>
                        <p className="text-slate-600">
                          <strong className="text-slate-800">Cliente:</strong> {creditoSeleccionado.cliente}
                        </p>
                        <p className="text-slate-600">
                          <strong className="text-slate-800">Monto:</strong> 
                          <span className="font-black text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent ml-2">
                            ${creditoSeleccionado.monto.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>

                    <form onSubmit={manejarSubmit} className="space-y-6">
                      {accionModal === 'preguntas' && (
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Preguntas para la Promotora:
                          </label>
                          <textarea
                            value={formData.preguntas}
                            onChange={(e) => setData('preguntas', e.target.value)}
                            rows={6}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                            placeholder="Escriba las preguntas que debe responder la promotora..."
                            required
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Observaciones:
                        </label>
                        <textarea
                          value={formData.observaciones}
                          onChange={(e) => setData('observaciones', e.target.value)}
                          rows={4}
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                          placeholder="Agregue observaciones adicionales..."
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <motion.button
                          type="button"
                          onClick={cerrarModal}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        >
                          Cancelar
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={processing}
                          whileHover={{ scale: processing ? 1 : 1.05 }}
                          whileTap={{ scale: processing ? 1 : 0.98 }}
                          className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 text-white shadow-lg ${
                            accionModal === 'aprobar' || accionModal === 'liberar'
                              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                              : accionModal === 'rechazar'
                              ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                              : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700'
                          } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {processing ? 'Procesando...' : 'Confirmar'}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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