import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function NuevoCliente() {
  const [step, setStep] = useState<1 | 2>(1);

  // Cliente
  const [cliente, setCliente] = useState({ nombre: '', edad: '', sexo: '', estado_civil: '' });
  const [clienteFiles, setClienteFiles] = useState<{ ine: File | null; curp: File | null; comprobante: File | null }>({
    ine: null,
    curp: null,
    comprobante: null,
  });

  // Aval
  const [aval, setAval] = useState({ nombre: '', edad: '', sexo: '', estado_civil: '' });
  const [avalFiles, setAvalFiles] = useState<{ ine: File | null; curp: File | null; comprobante: File | null }>({
    ine: null,
    curp: null,
    comprobante: null,
  });

  const inputBase =
    "w-full border border-slate-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    target: 'cliente' | 'aval'
  ) {
    const { name, value } = e.target;
    if (target === 'cliente') setCliente(c => ({ ...c, [name]: value }));
    else setAval(a => ({ ...a, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, target: 'cliente' | 'aval') {
    const { name, files } = e.target;
    if (!files?.[0]) return;
    const updater = target === 'cliente' ? setClienteFiles : setAvalFiles;
    updater(f => ({ ...f, [name]: files[0] }));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Cliente – Sistema de Créditos" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-semibold text-slate-800">
            {step === 1 ? '➕ Cliente: Datos y Documentos' : '👥 Aval: Datos y Documentos'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Paso {step} de 2</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: step === 1 ? '0%' : '50%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <form>
          <AnimatePresence exitBeforeEnter initial={false}>
            {step === 1 && (
              <motion.div
                key="cliente"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Datos Básicos Cliente */}
                <motion.section
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 transition-shadow"
                >
                  <h2 className="flex items-center text-lg font-medium text-slate-700 mb-4 border-b border-slate-100 pb-2">
                    <span className="text-xl mr-2">👤</span> Datos del Cliente
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label htmlFor="nombre" className="block text-sm font-medium text-slate-600 mb-1">
                        Nombre completo<span className="text-red-600">*</span>
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={e => handleChange(e, 'cliente')}
                        placeholder="Ej. Juan Pérez López"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="edad" className="block text-sm font-medium text-slate-600 mb-1">
                        Edad<span className="text-red-600">*</span>
                      </label>
                      <input
                        id="edad"
                        name="edad"
                        type="number"
                        min="18"
                        max="100"
                        value={cliente.edad}
                        onChange={e => handleChange(e, 'cliente')}
                        placeholder="18"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="sexo" className="block text-sm font-medium text-slate-600 mb-1">
                        Sexo<span className="text-red-600">*</span>
                      </label>
                      <select
                        id="sexo"
                        name="sexo"
                        value={cliente.sexo}
                        onChange={e => handleChange(e, 'cliente')}
                        className={inputBase}
                      >
                        <option value="">Seleccione…</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="estado_civil" className="block text-sm font-medium text-slate-600 mb-1">
                        Estado Civil<span className="text-red-600">*</span>
                      </label>
                      <select
                        id="estado_civil"
                        name="estado_civil"
                        value={cliente.estado_civil}
                        onChange={e => handleChange(e, 'cliente')}
                        className={inputBase}
                      >
                        <option value="">Seleccione…</option>
                        <option value="soltero">Soltero</option>
                        <option value="casado">Casado</option>
                        <option value="union_libre">Unión Libre</option>
                        <option value="viudo">Viudo</option>
                        <option value="divorciado">Divorciado</option>
                      </select>
                    </div>
                  </div>
                </motion.section>

                {/* Documentos Cliente */}
                <motion.section
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 transition-shadow"
                >
                  <h2 className="flex items-center text-lg font-medium text-slate-700 mb-4 border-b border-slate-100 pb-2">
                    <span className="text-xl mr-2">📎</span> Documentos del Cliente
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {(['ine', 'curp', 'comprobante'] as const).map(key => {
                      const labelText =
                        key === 'ine'
                          ? 'INE'
                          : key === 'curp'
                          ? 'CURP'
                          : 'Comprobante de Domicilio';
                      return (
                        <motion.label
                          key={key}
                          htmlFor={key}
                          whileHover={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                          className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer transition-all"
                        >
                          <input
                            id={key}
                            name={key}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={e => handleFileChange(e, 'cliente')}
                            className="sr-only"
                          />
                          {clienteFiles[key] ? (
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col items-center text-blue-600"
                            >
                              <CheckCircleIcon className="w-7 h-7 mb-1" />
                              <span className="text-sm truncate">{clienteFiles[key]!.name}</span>
                            </motion.div>
                          ) : (
                            <div className="flex flex-col items-center text-slate-500">
                              <CloudArrowUpIcon className="w-7 h-7 mb-1" />
                              <span className="text-sm">{labelText}</span>
                            </div>
                          )}
                        </motion.label>
                      );
                    })}
                  </div>
                </motion.section>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="aval"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Datos Básicos Aval */}
                <motion.section
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 transition-shadow"
                >
                  <h2 className="flex items-center text-lg font-medium text-slate-700 mb-4 border-b border-slate-100 pb-2">
                    <span className="text-xl mr-2">👤</span> Datos del Aval
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {['nombre', 'edad', 'sexo', 'estado_civil'].map(field => (
                      <div key={field} className={field === 'nombre' ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          {field === 'nombre'
                            ? 'Nombre completo'
                            : field === 'edad'
                            ? 'Edad'
                            : field === 'sexo'
                            ? 'Sexo'
                            : 'Estado Civil'}
                          <span className="text-red-600">*</span>
                        </label>
                        {field === 'sexo' || field === 'estado_civil' ? (
                          <select
                            id={field}
                            name={field}
                            value={(aval as any)[field]}
                            onChange={e => handleChange(e, 'aval')}
                            className={inputBase}
                          >
                            <option value="">Seleccione…</option>
                            {field === 'sexo' ? (
                              <>
                                <option value="masculino">Masculino</option>
                                <option value="femminino">Femenino</option>
                              </>
                            ) : (
                              <>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="union_libre">Unión Libre</option>
                                <option value="viudo">Viudo</option>
                                <option value="divorciado">Divorciado</option>
                              </>
                            )}
                          </select>
                        ) : (
                          <input
                            id={field}
                            name={field}
                            type={field === 'edad' ? 'number' : 'text'}
                            min={field === 'edad' ? 18 : undefined}
                            max={field === 'edad' ? 100 : undefined}
                            value={(aval as any)[field]}
                            onChange={e => handleChange(e, 'aval')}
                            placeholder={
                              field === 'nombre' ? 'Ej. Ana Gómez Rivera' : field === 'edad' ? '18' : ''
                            }
                            className={inputBase}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Documentos Aval */}
                <motion.section
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 transition-shadow"
                >
                  <h2 className="flex items-center text-lg font-medium text-slate-700 mb-4 border-b border-slate-100 pb-2">
                    <span className="text-xl mr-2">📎</span> Documentos del Aval
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {(['ine', 'curp', 'comprobante'] as const).map(key => {
                      const labelText =
                        key === 'ine'
                          ? 'INE'
                          : key === 'curp'
                          ? 'CURP'
                          : 'Comprobante de Domicilio';
                      return (
                        <motion.label
                          key={key}
                          htmlFor={`aval_${key}`}
                          whileHover={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                          className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer transition-all"
                        >
                          <input
                            id={`aval_${key}`}
                            name={key}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={e => handleFileChange(e, 'aval')}
                            className="sr-only"
                          />
                          {avalFiles[key] ? (
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col items-center text-blue-600"
                            >
                              <CheckCircleIcon className="w-7 h-7 mb-1" />
                              <span className="text-sm truncate">{avalFiles[key]!.name}</span>
                            </motion.div>
                          ) : (
                            <div className="flex flex-col items-center text-slate-500">
                              <CloudArrowUpIcon className="w-7 h-7 mb-1" />
                              <span className="text-sm">{labelText}</span>
                            </div>
                          )}
                        </motion.label>
                      );
                    })}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navegación */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-200 pt-6 mt-2">
            <button
              type="button"
              onClick={() => (step === 1 ? window.history.back() : setStep(1))}
              className="px-5 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition"
            >
              {step === 1 ? 'Cancelar' : 'Atrás'}
            </button>
            <button
              type="button"
              onClick={() => (step === 1 ? setStep(2) : alert('Cliente y Aval listos'))}
              className={`px-5 py-2 rounded-md font-medium transition shadow-sm ${
                step === 1
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {step === 1 ? 'Continuar' : 'Guardar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
