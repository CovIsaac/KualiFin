import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function NuevoCliente() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isVisible, setIsVisible] = useState(true);

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
    "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

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

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Cliente – Sistema de Créditos" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header súper moderno */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <span className="animate-pulse">{step === 1 ? '👤' : '👥'}</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {step === 1 ? 'Datos del Cliente' : 'Datos del Aval'}
                    </h1>
                    <p className="text-slate-600 font-medium text-lg mt-2">
                      Paso {step} de 2 - {step === 1 ? 'Información personal y documentos' : 'Información del aval y documentos'}
                    </p>
                  </div>
                </div>

                {/* Progress Bar súper moderno */}
                <div className="relative">
                  <div className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                      initial={{ width: '0%' }}
                      animate={{ width: step === 1 ? '50%' : '100%' }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{ 
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 via-transparent to-transparent rounded-full"></div>
                </div>

                {/* Indicadores de paso */}
                <div className="flex justify-between mt-4">
                  <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step >= 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'
                    }`}>
                      1
                    </div>
                    <span className="font-semibold">Cliente</span>
                  </div>
                  <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 2 ? 'text-purple-600' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'
                    }`}>
                      2
                    </div>
                    <span className="font-semibold">Aval</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <form>
            <AnimatePresence mode='wait' initial={false}>
              {step === 1 && (
                <motion.div
                  key="cliente"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  {/* Datos Básicos Cliente */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                  >
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          👤
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          Información Personal del Cliente
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                          <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-2">
                            Nombre completo<span className="text-red-500 ml-1">*</span>
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
                          <label htmlFor="edad" className="block text-sm font-semibold text-slate-700 mb-2">
                            Edad<span className="text-red-500 ml-1">*</span>
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
                          <label htmlFor="sexo" className="block text-sm font-semibold text-slate-700 mb-2">
                            Sexo<span className="text-red-500 ml-1">*</span>
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
                        <div className="sm:col-span-2">
                          <label htmlFor="estado_civil" className="block text-sm font-semibold text-slate-700 mb-2">
                            Estado Civil<span className="text-red-500 ml-1">*</span>
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
                    </div>
                  </motion.section>

                  {/* Documentos Cliente */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                  >
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          📎
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          Documentos del Cliente
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(['ine', 'curp', 'comprobante'] as const).map((key, index) => {
                          const labelText =
                            key === 'ine'
                              ? 'INE'
                              : key === 'curp'
                              ? 'CURP'
                              : 'Comprobante de Domicilio';
                          
                          const gradients = [
                            'from-blue-500 to-cyan-500',
                            'from-purple-500 to-pink-500',
                            'from-orange-500 to-red-500'
                          ];

                          return (
                            <motion.label
                              key={key}
                              htmlFor={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                borderColor: "rgb(59 130 246)"
                              }}
                              whileTap={{ scale: 0.98 }}
                              className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer transition-all duration-300 bg-gradient-to-br from-white/60 to-slate-50/60 backdrop-blur-sm hover:border-blue-400"
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
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex flex-col items-center text-green-600"
                                >
                                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    ✅
                                  </div>
                                  <span className="text-sm font-semibold text-center text-slate-700 truncate max-w-full">
                                    {clienteFiles[key]!.name}
                                  </span>
                                  <span className="text-xs text-green-600 mt-1">Archivo cargado</span>
                                </motion.div>
                              ) : (
                                <div className="flex flex-col items-center text-slate-500 group-hover:text-blue-600 transition-colors duration-300">
                                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    📄
                                  </div>
                                  <span className="text-sm font-semibold text-center">{labelText}</span>
                                  <span className="text-xs text-slate-400 mt-1">Haz clic para subir</span>
                                </div>
                              )}
                              
                              {/* Efecto de brillo en hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
                            </motion.label>
                          );
                        })}
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="aval"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  {/* Datos Básicos Aval */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                  >
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          👥
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Información Personal del Aval
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {['nombre', 'edad', 'sexo', 'estado_civil'].map((field, index) => (
                          <motion.div 
                            key={field} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                            className={field === 'nombre' ? 'sm:col-span-2' : ''}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              {field === 'nombre'
                                ? 'Nombre completo'
                                : field === 'edad'
                                ? 'Edad'
                                : field === 'sexo'
                                ? 'Sexo'
                                : 'Estado Civil'}
                              <span className="text-red-500 ml-1">*</span>
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
                                    <option value="femenino">Femenino</option>
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
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.section>

                  {/* Documentos Aval */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                  >
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          📎
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          Documentos del Aval
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(['ine', 'curp', 'comprobante'] as const).map((key, index) => {
                          const labelText =
                            key === 'ine'
                              ? 'INE'
                              : key === 'curp'
                              ? 'CURP'
                              : 'Comprobante de Domicilio';
                          
                          const gradients = [
                            'from-indigo-500 to-purple-500',
                            'from-pink-500 to-rose-500',
                            'from-amber-500 to-orange-500'
                          ];

                          return (
                            <motion.label
                              key={key}
                              htmlFor={`aval_${key}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                borderColor: "rgb(147 51 234)"
                              }}
                              whileTap={{ scale: 0.98 }}
                              className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer transition-all duration-300 bg-gradient-to-br from-white/60 to-slate-50/60 backdrop-blur-sm hover:border-purple-400"
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
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex flex-col items-center text-green-600"
                                >
                                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    ✅
                                  </div>
                                  <span className="text-sm font-semibold text-center text-slate-700 truncate max-w-full">
                                    {avalFiles[key]!.name}
                                  </span>
                                  <span className="text-xs text-green-600 mt-1">Archivo cargado</span>
                                </motion.div>
                              ) : (
                                <div className="flex flex-col items-center text-slate-500 group-hover:text-purple-600 transition-colors duration-300">
                                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    📄
                                  </div>
                                  <span className="text-sm font-semibold text-center">{labelText}</span>
                                  <span className="text-xs text-slate-400 mt-1">Haz clic para subir</span>
                                </div>
                              )}
                              
                              {/* Efecto de brillo en hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
                            </motion.label>
                          );
                        })}
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navegación súper moderna */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative mt-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 via-white/50 to-slate-100/50 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <motion.button
                    type="button"
                    onClick={() => (step === 1 ? window.history.back() : setStep(1))}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  >
                    {step === 1 ? '← Cancelar' : '← Atrás'}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => (step === 1 ? setStep(2) : alert('Cliente y Aval listos'))}
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                      step === 1
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    {step === 1 ? 'Continuar →' : '✅ Guardar Cliente'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </form>
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