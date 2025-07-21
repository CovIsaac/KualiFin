import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    { 
      titulo: 'Aprobados', 
      valor: creditosEjemplo.filter(c => c.estado === 'aprobado_inicial').length,
      icon: '✅',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    { 
      titulo: 'Con Preguntas', 
      valor: creditosEjemplo.filter(c => c.estado === 'pendiente_preguntas').length,
      icon: '❓',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    { 
      titulo: 'Revisión Final', 
      valor: creditosEjemplo.filter(c => c.estado === 'revision_final').length,
      icon: '🔍',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
  ];

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
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        border: 'border-yellow-300',
        icon: '⏳'
      },
      aprobado_inicial: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800', 
        border: 'border-blue-300',
        icon: '✅'
      },
      pendiente_preguntas: { 
        bg: 'bg-purple-100', 
        text: 'text-purple-800', 
        border: 'border-purple-300',
        icon: '❓'
      },
      revision_final: { 
        bg: 'bg-orange-100', 
        text: 'text-orange-800', 
        border: 'border-orange-300',
        icon: '🔍'
      },
      aprobado_final: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        border: 'border-green-300',
        icon: '🚀'
      },
      rechazado: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        border: 'border-red-300',
        icon: '❌'
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
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 shadow-sm transition-colors duration-200 hover:shadow-md ${config.bg} ${config.text} ${config.border}`}>
        <span className="text-base">{config.icon}</span>
        <span>{textos[estado as keyof typeof textos]}</span>
      </span>
    );
  };

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white";

  return (
    <AuthenticatedLayout>
      <Head title="Panel de Revisión - Sistema de Créditos" />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  📋
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-blue-600 mb-2">
                    Panel de Revisión
                  </h1>
                  <p className="text-slate-600 font-medium text-lg">
                    Gestión y revisión de solicitudes de crédito en todas sus etapas
                  </p>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {estadisticas.map(({ titulo, valor, icon, color, bg, border }) => (
                  <div
                    key={titulo}
                    className={`${bg} ${border} border-2 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-3xl p-3 rounded-xl bg-white shadow-md ${color}`}>
                        {icon}
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{titulo}</div>
                        <div className={`text-3xl font-bold ${color}`}>
                          {valor}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md">
                🔍
              </div>
              <h2 className="text-2xl font-bold text-blue-600">
                Filtros de Búsqueda
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <label className="text-sm font-semibold text-slate-700">Filtrar por estado:</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className={`${inputBase} max-w-xs`}
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

          {/* Lista de Créditos */}
          <div className="space-y-8">
            {creditosFiltrados.map((credito) => (
              <div
                key={credito.id}
                className="bg-white rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Información del crédito */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-md">
                          📄
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">{credito.id}</h3>
                          {obtenerEstadoBadge(credito.estado)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Cliente</span>
                          <p className="text-slate-800 font-bold text-lg">{credito.cliente}</p>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Monto</span>
                          <p className="text-green-600 font-bold text-xl">
                            ${credito.monto.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Plazo</span>
                          <p className="text-slate-800 font-bold text-lg">{credito.plazo} meses</p>
                        </div>
                        <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
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
                            <span
                              key={docIndex}
                              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                              📄 {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Preguntas (si existen) */}
                      {credito.preguntas && (
                        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                          <span className="text-sm font-bold text-purple-800 mb-4 block flex items-center gap-2">
                            <span className="text-lg">❓</span> Preguntas de la Promotora:
                          </span>
                          <div className="space-y-4">
                            {credito.preguntas.map((item, preguntaIndex) => (
                              <div key={preguntaIndex} className="bg-white rounded-xl p-4 border border-purple-200">
                                <p className="font-bold text-purple-700 mb-2">P: {item.pregunta}</p>
                                <p className="text-purple-600 ml-4 font-medium">R: {item.respuesta}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-4 lg:w-56">
                      <button
                        onClick={() => alert(`Ver documentos de ${credito.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                      >
                        <span className="text-lg">👁️</span> Ver Documentos
                      </button>

                      {credito.estado === 'pendiente_revision' && (
                        <>
                          <button
                            onClick={() => abrirModal(credito, 'aprobar')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                          >
                            <span className="text-lg">✅</span> Aprobar
                          </button>
                          <button
                            onClick={() => abrirModal(credito, 'rechazar')}
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                          >
                            <span className="text-lg">❌</span> Rechazar
                          </button>
                        </>
                      )}

                      {credito.estado === 'aprobado_inicial' && (
                        <button
                          onClick={() => abrirModal(credito, 'preguntas')}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                        >
                          <span className="text-lg">❓</span> Enviar Preguntas
                        </button>
                      )}

                      {(credito.estado === 'pendiente_preguntas' || credito.estado === 'revision_final') && (
                        <>
                          <button
                            onClick={() => abrirModal(credito, 'liberar')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                          >
                            <span className="text-lg">🚀</span> Liberar Crédito
                          </button>
                          <button
                            onClick={() => abrirModal(credito, 'rechazar')}
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                          >
                            <span className="text-lg">❌</span> Rechazar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {modalAbierto && creditoSeleccionado && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-md ${
                        accionModal === 'aprobar' || accionModal === 'liberar'
                          ? 'bg-green-600'
                          : accionModal === 'rechazar'
                          ? 'bg-red-600'
                          : 'bg-purple-600'
                      }`}>
                        {accionModal === 'aprobar' && '✅'}
                        {accionModal === 'rechazar' && '❌'}
                        {accionModal === 'preguntas' && '❓'}
                        {accionModal === 'liberar' && '🚀'}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {accionModal === 'aprobar' && 'Aprobar Crédito'}
                          {accionModal === 'rechazar' && 'Rechazar Crédito'}
                          {accionModal === 'preguntas' && 'Enviar Preguntas'}
                          {accionModal === 'liberar' && 'Liberar Crédito'}
                        </h3>
                        <p className="text-sm text-slate-600">Confirme la acción</p>
                      </div>
                    </div>
                    <button
                      onClick={cerrarModal}
                      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
                    <div className="space-y-3">
                      <p className="text-slate-600">
                        <strong className="text-slate-800">Crédito:</strong> {creditoSeleccionado.id}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-800">Cliente:</strong> {creditoSeleccionado.cliente}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-800">Monto:</strong> 
                        <span className="font-bold text-xl text-green-600 ml-2">
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
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none bg-white transition-colors duration-200"
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
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white transition-colors duration-200"
                        placeholder="Agregue observaciones adicionales..."
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={cerrarModal}
                        className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-6 py-3 rounded-xl font-bold transition-colors duration-200 bg-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={processing}
                        className={`flex-1 px-6 py-3 rounded-xl font-bold transition-colors duration-200 text-white shadow-md hover:shadow-lg ${
                          accionModal === 'aprobar' || accionModal === 'liberar'
                            ? 'bg-green-600 hover:bg-green-700'
                            : accionModal === 'rechazar'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-purple-600 hover:bg-purple-700'
                        } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {processing ? 'Procesando...' : 'Confirmar'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}