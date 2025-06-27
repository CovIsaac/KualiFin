import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Solicitud() {
  const [promotora, setPromotora] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const promoters = [
    { id: 'prom1', name: 'Promotora 1' },
    { id: 'prom2', name: 'Promotora 2' },
  ];
  const clientsByPromoter: Record<string, string[]> = {
    prom1: ['Cliente A', 'Cliente B'],
    prom2: ['Cliente C', 'Cliente D'],
  };

  const docTypes = ['ine', 'curp', 'comprobante'] as const;
  type DocKey = typeof docTypes[number];

  const [clienteValidation, setClienteValidation] = useState<
    Record<DocKey, 'accepted' | 'rejected' | undefined>
  >({ ine: undefined, curp: undefined, comprobante: undefined });
  const [avalValidation, setAvalValidation] = useState<
    Record<DocKey, 'accepted' | 'rejected' | undefined>
  >({ ine: undefined, curp: undefined, comprobante: undefined });

  const clienteImages: Record<DocKey, string> = {
    ine: '/img/ejemplo/ine.png',
    curp: '/img/ejemplo/curp.png',
    comprobante: '/img/ejemplo/comprobante.png',
  };
  const avalImages: Record<DocKey, string> = {
    ine: '/img/ejemplo/aval-ine.png',
    curp: '/img/ejemplo/aval-curp.png',
    comprobante: '/img/ejemplo/aval-comprobante.png',
  };

  // Comprueba si todos los documentos de cliente y aval han sido aceptados
  const allClienteAccepted = docTypes.every(
    (key) => clienteValidation[key] === 'accepted'
  );
  const allAvalAccepted = docTypes.every(
    (key) => avalValidation[key] === 'accepted'
  );
  const showCreditoForm = allClienteAccepted && allAvalAccepted;

  const inputBase =
    "w-full border border-slate-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <AuthenticatedLayout>
      <Head title="Nueva Solicitud de Crédito" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Nueva Solicitud de Crédito
          </h1>
          <p className="text-slate-600">
            {showCreditoForm
              ? 'Complete el formulario de crédito'
              : 'Seleccione promotora y cliente, y valide documentos'}
          </p>
        </motion.div>

        <AnimatePresence mode='wait'>
          {!showCreditoForm ? (
            <motion.div
              key="validation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Selección de Promotora */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white border border-slate-200 rounded-lg shadow-sm p-6"
              >
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Promotora<span className="text-red-600">*</span>
                </label>
                <select
                  value={promotora}
                  onChange={(e) => {
                    setPromotora(e.target.value);
                    setCliente('');
                  }}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">-- Seleccione una promotora --</option>
                  {promoters.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </motion.section>

              {/* Selección de Cliente */}
              {promotora && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm p-6"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cliente prospectado<span className="text-red-600">*</span>
                  </label>
                  <select
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">-- Seleccione un cliente --</option>
                    {clientsByPromoter[promotora]?.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </motion.section>
              )}

              {/* Documentos y validación */}
              {cliente && (
                <motion.section
                  key="docs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="grid grid-rows-1 gap-8"
                >
                  {/** Documentos del Cliente **/}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">
                      📋 Documentos de {cliente}
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                      {docTypes.map((key) => {
                        const status = clienteValidation[key];
                        const borderClass =
                          status === 'accepted'
                            ? 'border-4 border-green-500'
                            : status === 'rejected'
                            ? 'border-4 border-red-500'
                            : 'border border-slate-200';
                        return (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            className={`flex flex-col items-center bg-slate-50 p-4 rounded-lg shadow-sm transition ${borderClass}`}
                          >
                            <img
                              src={clienteImages[key]}
                              alt={key}
                              onClick={() => setPreviewSrc(clienteImages[key])}
                              className="w-full h-56 object-contain rounded-md mb-4 cursor-zoom-in"
                            />
                            <span className="font-medium text-slate-700 mb-4">
                              {key === 'ine'
                                ? 'INE'
                                : key === 'curp'
                                ? 'CURP'
                                : 'Comprobante de Domicilio'}
                            </span>
                            <div className="flex gap-4">
                              <button
                                onClick={() =>
                                  setClienteValidation((v) => ({
                                    ...v,
                                    [key]: 'accepted',
                                  }))
                                }
                                className="p-1 rounded-full hover:bg-green-100 transition"
                              >
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                              </button>
                              <button
                                onClick={() =>
                                  setClienteValidation((v) => ({
                                    ...v,
                                    [key]: 'rejected',
                                  }))
                                }
                                className="p-1 rounded-full hover:bg-red-100 transition"
                              >
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/** Documentos del Aval **/}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">
                      📋 Documentos del Aval
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                      {docTypes.map((key) => {
                        const status = avalValidation[key];
                        const borderClass =
                          status === 'accepted'
                            ? 'border-4 border-green-500'
                            : status === 'rejected'
                            ? 'border-4 border-red-500'
                            : 'border border-slate-200';
                        return (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            className={`flex flex-col items-center bg-slate-50 p-4 rounded-lg shadow-sm transition ${borderClass}`}
                          >
                            <img
                              src={avalImages[key]}
                              alt={`aval-${key}`}
                              onClick={() => setPreviewSrc(avalImages[key])}
                              className="w-full h-56 object-contain rounded-md mb-4 cursor-zoom-in"
                            />
                            <span className="font-medium text-slate-700 mb-4">
                              {key === 'ine'
                                ? 'INE'
                                : key === 'curp'
                                ? 'CURP'
                                : 'Comprobante de Domicilio'}
                            </span>
                            <div className="flex gap-4">
                              <button
                                onClick={() =>
                                  setAvalValidation((v) => ({
                                    ...v,
                                    [key]: 'accepted',
                                  }))
                                }
                                className="p-1 rounded-full hover:bg-green-100 transition"
                              >
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                              </button>
                              <button
                                onClick={() =>
                                  setAvalValidation((v) => ({
                                    ...v,
                                    [key]: 'rejected',
                                  }))
                                }
                                className="p-1 rounded-full hover:bg-red-100 transition"
                              >
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.section>
              )}
            </motion.div>
          ) : (
            <motion.section
              key="new-credit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-6"
            >
              <h2 className="text-xl font-semibold text-slate-800">
                📝 Formulario de Nuevo Crédito
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información Laboral */}
                <div className="md:col-span-2 space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Ocupación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Desarrollador Web"
                    className={inputBase}
                  />
                  <label className="block text-sm font-medium text-slate-700">
                    Empresa
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre de la Empresa"
                    className={inputBase}
                  />
                  <label className="block text-sm font-medium text-slate-700">
                    Ingresos Mensuales
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className={inputBase}
                  />
                </div>
                {/* Detalles de Crédito */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Monto Solicitado
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className={inputBase}
                  />
                  <label className="block text-sm font-medium text-slate-700">
                    Plazo (meses)
                  </label>
                  <select className={inputBase}>
                    <option>6</option>
                    <option>12</option>
                    <option>18</option>
                    <option>24</option>
                  </select>
                  <label className="block text-sm font-medium text-slate-700">
                    Propósito
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descripción"
                    className={`${inputBase} resize-none`}
                  />
                </div>
                {/* Referencias */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Ref. 1 - Nombre
                    </label>
                    <input type="text" className={inputBase} />
                    <label className="block text-sm font-medium text-slate-700">
                      Ref. 1 - Teléfono
                    </label>
                    <input type="tel" className={inputBase} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Ref. 2 - Nombre
                    </label>
                    <input type="text" className={inputBase} />
                    <label className="block text-sm font-medium text-slate-700">
                      Ref. 2 - Teléfono
                    </label>
                    <input type="tel" className={inputBase} />
                  </div>
                </div>
                {/* Acciones */}
                <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Modal de vista previa */}
        <AnimatePresence>
          {previewSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewSrc(null)}
            >
              <motion.img
                src={previewSrc}
                alt="Preview"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-[90vh] object-contain rounded"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthenticatedLayout>
  );
}
