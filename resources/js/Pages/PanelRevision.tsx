import React, { useState } from 'react';
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
    const estilos = {
      pendiente_revision: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      aprobado_inicial: 'bg-blue-100 text-blue-800 border-blue-200',
      pendiente_preguntas: 'bg-purple-100 text-purple-800 border-purple-200',
      revision_final: 'bg-orange-100 text-orange-800 border-orange-200',
      aprobado_final: 'bg-green-100 text-green-800 border-green-200',
      rechazado: 'bg-red-100 text-red-800 border-red-200',
    };

    const textos = {
      pendiente_revision: 'Pendiente Revisión',
      aprobado_inicial: 'Aprobado Inicial',
      pendiente_preguntas: 'Pendiente Preguntas',
      revision_final: 'Revisión Final',
      aprobado_final: 'Aprobado Final',
      rechazado: 'Rechazado',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${estilos[estado as keyof typeof estilos]}`}>
        {textos[estado as keyof typeof textos]}
      </span>
    );
  };

  return (
    <AuthenticatedLayout>
      <Head title="Panel de Revisión - Sistema de Créditos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl"></div>

          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-500/20 border border-white/30">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                  <span className="animate-pulse">📋</span>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Panel de Revisión
                </h1>
                <p className="text-slate-600 font-medium text-lg">
                  Gestión y revisión de solicitudes de crédito en todas sus etapas
                </p>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-600">
                  {creditosEjemplo.filter(c => c.estado === 'pendiente_revision').length}
                </div>
                <div className="text-sm text-slate-600">Pendientes</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">
                  {creditosEjemplo.filter(c => c.estado === 'aprobado_inicial').length}
                </div>
                <div className="text-sm text-slate-600">Aprobados</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-600">
                  {creditosEjemplo.filter(c => c.estado === 'pendiente_preguntas').length}
                </div>
                <div className="text-sm text-slate-600">Con Preguntas</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-600">
                  {creditosEjemplo.filter(c => c.estado === 'revision_final').length}
                </div>
                <div className="text-sm text-slate-600">Revisión Final</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-sm font-semibold text-slate-700">Filtrar por estado:</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-slate-200 rounded-lg px-4 py-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className="space-y-6">
          {creditosFiltrados.map((credito) => (
            <div key={credito.id} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Información del crédito */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-slate-800">{credito.id}</h3>
                      {obtenerEstadoBadge(credito.estado)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-slate-600">Cliente:</span>
                        <p className="text-slate-800">{credito.cliente}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">Monto:</span>
                        <p className="text-slate-800 font-bold">${credito.monto.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">Plazo:</span>
                        <p className="text-slate-800">{credito.plazo} meses</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">Promotora:</span>
                        <p className="text-slate-800">{credito.promotora}</p>
                      </div>
                    </div>

                    {/* Documentos */}
                    <div className="mt-4">
                      <span className="font-semibold text-slate-600 text-sm">Documentos:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {credito.documentos.map((doc, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Preguntas (si existen) */}
                    {credito.preguntas && (
                      <div className="mt-4 bg-purple-50 rounded-lg p-4">
                        <span className="font-semibold text-purple-800 text-sm">Preguntas de la Promotora:</span>
                        <div className="mt-2 space-y-2">
                          {credito.preguntas.map((item, index) => (
                            <div key={index} className="text-sm">
                              <p className="font-medium text-purple-700">P: {item.pregunta}</p>
                              <p className="text-purple-600 ml-4">R: {item.respuesta}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => alert(`Ver documentos de ${credito.id}`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <span>👁️</span> Ver Documentos
                    </button>

                    {credito.estado === 'pendiente_revision' && (
                      <>
                        <button
                          onClick={() => abrirModal(credito, 'aprobar')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <span>✅</span> Aprobar
                        </button>
                        <button
                          onClick={() => abrirModal(credito, 'rechazar')}
                          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <span>❌</span> Rechazar
                        </button>
                      </>
                    )}

                    {credito.estado === 'aprobado_inicial' && (
                      <button
                        onClick={() => abrirModal(credito, 'preguntas')}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <span>❓</span> Enviar Preguntas
                      </button>
                    )}

                    {(credito.estado === 'pendiente_preguntas' || credito.estado === 'revision_final') && (
                      <>
                        <button
                          onClick={() => abrirModal(credito, 'liberar')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <span>🚀</span> Liberar Crédito
                        </button>
                        <button
                          onClick={() => abrirModal(credito, 'rechazar')}
                          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <span>❌</span> Rechazar
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    {accionModal === 'aprobar' && '✅ Aprobar Crédito'}
                    {accionModal === 'rechazar' && '❌ Rechazar Crédito'}
                    {accionModal === 'preguntas' && '❓ Enviar Preguntas'}
                    {accionModal === 'liberar' && '🚀 Liberar Crédito'}
                  </h3>
                  <button
                    onClick={cerrarModal}
                    className="text-slate-400 hover:text-slate-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-slate-600 mb-2">
                    <strong>Crédito:</strong> {creditoSeleccionado.id}
                  </p>
                  <p className="text-slate-600 mb-2">
                    <strong>Cliente:</strong> {creditoSeleccionado.cliente}
                  </p>
                  <p className="text-slate-600">
                    <strong>Monto:</strong> ${creditoSeleccionado.monto.toLocaleString()}
                  </p>
                </div>

                <form onSubmit={manejarSubmit}>
                  {accionModal === 'preguntas' && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Preguntas para la Promotora:
                      </label>
                      <textarea
                        value={formData.preguntas}
                        onChange={(e) => setData('preguntas', e.target.value)}
                        rows={6}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                        placeholder="Escriba las preguntas que debe responder la promotora..."
                        required
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Observaciones:
                    </label>
                    <textarea
                      value={formData.observaciones}
                      onChange={(e) => setData('observaciones', e.target.value)}
                      rows={4}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                      placeholder="Agregue observaciones adicionales..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={cerrarModal}
                      className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-white ${
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
    </AuthenticatedLayout>
  );
}