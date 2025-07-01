import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Solicitud() {
  const [promotora, setPromotora] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

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

  const [domicilio, setDomicilio] = useState({
    calle: '',
    numero: '',
    interior: '',
    colonia: '',
    cp: '',
    tipoVivienda: '',
    municipioEstado: '',
    tiempoResidencia: '',
    montoMensual: '',
    telFijo: '',
    telCelular: '',
  });

  const [ocupacion, setOcupacion] = useState({
    actividad: '',
    domSecundarioCalle: '',
    domSecundarioColonia: '',
    domSecundarioMunicipio: '',
    domSecundarioNumero: '',  
    telefono: '',
    empresa: '',
    antiguedad: '',
    monto: '',
    periodo: '',
    ingresosAdicionales: false,
    ingresoConcepto: '',
    ingresoMonto: '',
    ingresoFrecuencia: '',
  });

  function formatPhoneInput(value: string) {
    let digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6)
      return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    if (digits.length > 3)
      return `${digits.slice(0,3)}-${digits.slice(3)}`;
    return digits;
  }

  // Validación de campos imprescindibles
  const ocupacionValida = !!(
    ocupacion.actividad.trim() &&
    ocupacion.domSecundarioCalle.trim() &&
    ocupacion.domSecundarioNumero.trim() &&
    ocupacion.domSecundarioColonia.trim() &&
    ocupacion.domSecundarioMunicipio.trim() &&
    ocupacion.telefono.replace(/\D/g, '').length === 10 &&
    ocupacion.antiguedad.trim() &&
    ocupacion.monto.trim() &&
    ocupacion.periodo
  ) && (
    !ocupacion.ingresosAdicionales ||
    (
      ocupacion.ingresoConcepto.trim() &&
      ocupacion.ingresoMonto.trim() &&
      ocupacion.ingresoFrecuencia.trim()
    )
  );

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
    "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Nueva Solicitud de Crédito" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      <span className="animate-pulse">📋</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Nueva Solicitud de Crédito
                    </h1>
                    <p className="text-slate-600 font-medium text-lg mt-2">
                      {showCreditoForm
                        ? 'Complete el formulario de crédito'
                        : 'Seleccione promotora y cliente, y valide documentos'}
                    </p>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center gap-4 mt-6">
                  <div className={`flex items-center gap-2 transition-all duration-300 ${!showCreditoForm ? 'text-blue-600' : 'text-green-600'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      !showCreditoForm ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    }`}>
                      {!showCreditoForm ? '1' : '✓'}
                    </div>
                    <span className="font-semibold">Validación</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-16 h-1 rounded-full transition-all duration-500 ${showCreditoForm ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-slate-300'}`}></div>
                  </div>
                  <div className={`flex items-center gap-2 transition-all duration-300 ${showCreditoForm ? 'text-blue-600' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      showCreditoForm ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'
                    }`}>
                      2
                    </div>
                    <span className="font-semibold">Formulario</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode='wait'>
            {!showCreditoForm ? (
              <motion.div
                key="validation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Selección de Promotora */}
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
                        👩‍💼
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Selección de Promotora
                      </h2>
                    </div>
                    
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Promotora<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      value={promotora}
                      onChange={(e) => {
                        setPromotora(e.target.value);
                        setCliente('');
                      }}
                      className={inputBase}
                    >
                      <option value="">-- Seleccione una promotora --</option>
                      {promoters.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.section>

                {/* Selección de Cliente */}
                {promotora && (
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
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          👤
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Selección de Cliente
                        </h2>
                      </div>
                      
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Cliente prospectado<span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        className={inputBase}
                      >
                        <option value="">-- Seleccione un cliente --</option>
                        {clientsByPromoter[promotora]?.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.section>
                )}

                {/* Documentos y validación */}
                {cliente && (
                  <motion.div
                    key="docs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-8"
                  >
                    {/** Documentos del Cliente **/}
                    <motion.section
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                            📋
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Documentos de {cliente}
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {docTypes.map((key, index) => {
                            const status = clienteValidation[key];
                            const gradients = [
                              'from-blue-500 to-cyan-500',
                              'from-purple-500 to-pink-500',
                              'from-orange-500 to-red-500'
                            ];
                            
                            return (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                                className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                                  status === 'accepted'
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200'
                                    : status === 'rejected'
                                    ? 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 shadow-red-200'
                                    : 'bg-gradient-to-br from-white/60 to-slate-50/60 border-2 border-slate-200'
                                } shadow-xl`}
                              >
                                {/* Efecto de brillo en la card */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                                
                                <div className="relative z-10 flex flex-col items-center">
                                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    📄
                                  </div>
                                  
                                  <img
                                    src={clienteImages[key]}
                                    alt={key}
                                    onClick={() => setPreviewSrc(clienteImages[key])}
                                    className="w-full h-48 object-contain rounded-xl mb-4 cursor-zoom-in hover:scale-105 transition-transform duration-300 bg-white/50 backdrop-blur-sm shadow-lg"
                                  />
                                  
                                  <span className="font-bold text-slate-700 mb-4 text-center">
                                    {key === 'ine'
                                      ? 'INE'
                                      : key === 'curp'
                                      ? 'CURP'
                                      : 'Comprobante de Domicilio'}
                                  </span>
                                  
                                  <div className="flex gap-4">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        setClienteValidation((v) => ({
                                          ...v,
                                          [key]: 'accepted',
                                        }))
                                      }
                                      className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        setClienteValidation((v) => ({
                                          ...v,
                                          [key]: 'rejected',
                                        }))
                                      }
                                      className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      <XCircleIcon className="w-6 h-6 text-red-600" />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.section>

                    {/** Documentos del Aval **/}
                    <motion.section
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                            👥
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Documentos del Aval
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {docTypes.map((key, index) => {
                            const status = avalValidation[key];
                            const gradients = [
                              'from-indigo-500 to-purple-500',
                              'from-pink-500 to-rose-500',
                              'from-amber-500 to-orange-500'
                            ];
                            
                            return (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                                className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                                  status === 'accepted'
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200'
                                    : status === 'rejected'
                                    ? 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 shadow-red-200'
                                    : 'bg-gradient-to-br from-white/60 to-slate-50/60 border-2 border-slate-200'
                                } shadow-xl`}
                              >
                                {/* Efecto de brillo en la card */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                                
                                <div className="relative z-10 flex flex-col items-center">
                                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    📄
                                  </div>
                                  
                                  <img
                                    src={avalImages[key]}
                                    alt={`aval-${key}`}
                                    onClick={() => setPreviewSrc(avalImages[key])}
                                    className="w-full h-48 object-contain rounded-xl mb-4 cursor-zoom-in hover:scale-105 transition-transform duration-300 bg-white/50 backdrop-blur-sm shadow-lg"
                                  />
                                  
                                  <span className="font-bold text-slate-700 mb-4 text-center">
                                    {key === 'ine'
                                      ? 'INE'
                                      : key === 'curp'
                                      ? 'CURP'
                                      : 'Comprobante de Domicilio'}
                                  </span>
                                  
                                  <div className="flex gap-4">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        setAvalValidation((v) => ({
                                          ...v,
                                          [key]: 'accepted',
                                        }))
                                      }
                                      className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        setAvalValidation((v) => ({
                                          ...v,
                                          [key]: 'rejected',
                                        }))
                                      }
                                      className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      <XCircleIcon className="w-6 h-6 text-red-600" />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.section>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.section
                key="new-credit"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                      📝
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Formulario de Nuevo Crédito
                    </h2>
                  </div>
                  
                  <form className="space-y-8">
                    {/* Domicilio */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-gradient-to-br from-blue-50/60 to-cyan-50/80 rounded-2xl p-8 border border-blue-200/30 shadow-lg mb-10"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-8 flex items-center gap-3">
                        <span className="text-2xl">🏠</span>
                        Domicilio del Solicitante
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Calle */}
                        <div className="col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Calle <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.calle}
                            onChange={e => setDomicilio(d => ({ ...d, calle: e.target.value }))}
                            required
                            placeholder="Ej. Av. Reforma"
                          />
                        </div>
                        {/* Número */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">No. <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.numero}
                            onChange={e => setDomicilio(d => ({ ...d, numero: e.target.value }))}
                            required
                            placeholder="Ej. 123"
                          />
                        </div>
                        {/* Interior */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Int.</label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.interior}
                            onChange={e => setDomicilio(d => ({ ...d, interior: e.target.value }))}
                            placeholder="Ej. 2B"
                          />
                        </div>
                        {/* Colonia */}
                        <div className="col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Colonia <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.colonia}
                            onChange={e => setDomicilio(d => ({ ...d, colonia: e.target.value }))}
                            required
                            placeholder="Ej. Centro"
                          />
                        </div>
                        {/* Código Postal */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Código Postal <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.cp}
                            onChange={e => setDomicilio(d => ({ ...d, cp: e.target.value }))}
                            required
                            placeholder="Ej. 06000"
                          />
                        </div>
                        {/* Tipo de Vivienda */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Tipo de Vivienda <span className="text-red-500">*</span></label>
                          <select
                            className={inputBase}
                            value={domicilio.tipoVivienda}
                            onChange={e => setDomicilio(d => ({ ...d, tipoVivienda: e.target.value }))}
                            required
                          >
                            <option value="">Selecciona...</option>
                            <option value="Propia">Propia</option>
                            <option value="Rentada">Rentada</option>
                            <option value="Familiar">Familiar</option>
                          </select>
                        </div>
                        {/* Municipio/Estado */}
                        <div className="col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Municipio/Estado <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.municipioEstado}
                            onChange={e => setDomicilio(d => ({ ...d, municipioEstado: e.target.value }))}
                            required
                            placeholder="Ej. CDMX"
                          />
                        </div>
                        {/* Tiempo de Residencia */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Tiempo de Residencia <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={domicilio.tiempoResidencia}
                            onChange={e => setDomicilio(d => ({ ...d, tiempoResidencia: e.target.value }))}
                            required
                            placeholder="Ej. 5 años"
                          />
                        </div>
                        {/* Monto Mensual */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Monto Mensual Renta/Crédito <span className="text-red-500">*</span></label>
                          <input
                            type="number"
                            className={inputBase}
                            value={domicilio.montoMensual}
                            onChange={e => setDomicilio(d => ({ ...d, montoMensual: e.target.value }))}
                            required
                            placeholder="Ej. 3500"
                          />
                        </div>
                        {/* Teléfono Fijo */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono Fijo</label>
                          <input
                            type="tel"
                            className={inputBase}
                            value={domicilio.telFijo}
                            onChange={e => setDomicilio(d => ({ ...d, telFijo: e.target.value }))}
                            placeholder="Ej. 555-000-0000"
                          />
                        </div>
                        {/* Teléfono Celular */}
                        <div className="col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono Celular <span className="text-red-500">*</span></label>
                          <input
                            type="tel"
                            className={inputBase}
                            value={domicilio.telCelular}
                            onChange={e => setDomicilio(d => ({ ...d, telCelular: e.target.value }))}
                            required
                            placeholder="Ej. 5512345678"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Ocupación */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="bg-gradient-to-br from-indigo-50/60 to-purple-50/80 rounded-2xl p-8 border border-indigo-200/30 shadow-lg mb-10"
                    >
                      {/* Anuncio de advertencia */}
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-100 via-yellow-50 to-yellow-100 border border-red-300 flex items-center gap-3">
                        <span className="text-red-600 text-2xl">⚠️</span>
                        <span className="font-semibold text-red-700 text-base">
                          En caso de no especificar ocupación, el crédito será <span className="underline">CANCELADO</span>.
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-8 flex items-center gap-3">
                        <span className="text-2xl">💼</span>
                        Ocupación del Solicitante
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Actividad que realiza */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Actividad que realiza <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputBase}
                            value={ocupacion.actividad}
                            onChange={e => setOcupacion(o => ({ ...o, actividad: e.target.value }))}
                            required
                            placeholder="Ej. Comerciante, Empleado, etc."
                          />
                        </div>
                        {/* Nombre de la empresa */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre de la Empresa</label>
                          <input
                            type="text"
                            className={inputBase}
                            value={ocupacion.empresa}
                            onChange={e => setOcupacion(o => ({ ...o, empresa: e.target.value }))}
                            placeholder="Ej. Tienda ABC"
                          />
                        </div>
                        {/* Domicilio secundario - Calle y Número */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Domicilio Secundario (Negocio o Trabajo) - Calle y Número</label>
                          <input
                            type="text"
                            className={inputBase}
                            value={ocupacion.domSecundarioCalle}
                            onChange={e => setOcupacion(o => ({ ...o, domSecundarioCalle: e.target.value }))}
                            placeholder="Ej. Insurgentes 456"
                          />
                        </div>
                        {/* Domicilio secundario - Colonia */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Colonia</label>
                          <input
                            type="text"
                            className={inputBase}
                            value={ocupacion.domSecundarioColonia}
                            onChange={e => setOcupacion(o => ({ ...o, domSecundarioColonia: e.target.value }))}
                            placeholder="Ej. Roma Norte"
                          />
                        </div>
                        {/* Domicilio secundario - Municipio */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Municipio</label>
                          <input
                            type="text"
                            className={inputBase}
                            value={ocupacion.domSecundarioMunicipio}
                            onChange={e => setOcupacion(o => ({ ...o, domSecundarioMunicipio: e.target.value }))}
                            placeholder="Ej. CDMX"
                          />
                        </div>
                        {/* Teléfono */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
                          <input
                            type="tel"
                            className={inputBase}
                            value={ocupacion.telefono}
                            onChange={e => setOcupacion(o => ({
                              ...o,
                              telefono: formatPhoneInput(e.target.value)
                            }))}
                            placeholder="Ej. 123-456-7890"
                            maxLength={12}
                            inputMode="numeric"
                            pattern="\d{3}-\d{3}-\d{4}"
                          />
                        </div>
                        {/* Antigüedad */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Antigüedad</label>
                          <input
                            type="text"
                            className={inputBase}
                            value={ocupacion.antiguedad}
                            onChange={e => setOcupacion(o => ({ ...o, antiguedad: e.target.value }))}
                            placeholder="Ej. 2 años"
                          />
                        </div>
                        {/* Monto que Percibe */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Monto que Percibe</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              className={inputBase + " w-36"}
                              value={ocupacion.monto}
                              onChange={e => setOcupacion(o => ({ ...o, monto: e.target.value }))}
                              placeholder="Ej. 5000"
                            />
                            <select
                              className={inputBase + " w-36"}
                              value={ocupacion.periodo}
                              onChange={e => setOcupacion(o => ({ ...o, periodo: e.target.value }))}
                            >
                              <option value="">Periodo...</option>
                              <option value="Semanal">Semanal</option>
                              <option value="Quincenal">Quincenal</option>
                              <option value="Mensual">Mensual</option>
                            </select>
                          </div>
                        </div>
                        {/* Ingresos adicionales */}
                        <div className="col-span-2 flex items-center mt-2">
                          <input
                            id="ingresosAdicionales"
                            type="checkbox"
                            className="mr-2 accent-indigo-600 w-5 h-5"
                            checked={ocupacion.ingresosAdicionales}
                            onChange={e => setOcupacion(o => ({ ...o, ingresosAdicionales: e.target.checked }))}
                          />
                          <label htmlFor="ingresosAdicionales" className="text-sm text-slate-700 font-medium select-none">
                            ¿Cuenta con ingresos adicionales?
                          </label>
                        </div>
                        {/* Si tiene ingresos adicionales, mostrar campos pequeños */}
                        {ocupacion.ingresosAdicionales && (
                          <div className="col-span-2 bg-indigo-50 border border-indigo-200/70 rounded-xl p-4 mt-2 flex flex-col gap-3 shadow-inner">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Concepto</label>
                                <input
                                  type="text"
                                  className={inputBase + " text-xs"}
                                  value={ocupacion.ingresoConcepto}
                                  onChange={e => setOcupacion(o => ({ ...o, ingresoConcepto: e.target.value }))}
                                  placeholder="Ej. Venta de postres"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Monto</label>
                                <input
                                  type="number"
                                  className={inputBase + " text-xs"}
                                  value={ocupacion.ingresoMonto}
                                  onChange={e => setOcupacion(o => ({ ...o, ingresoMonto: e.target.value }))}
                                  placeholder="Ej. 1500"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Frecuencia</label>
                                <input
                                  type="text"
                                  className={inputBase + " text-xs"}
                                  value={ocupacion.ingresoFrecuencia}
                                  onChange={e => setOcupacion(o => ({ ...o, ingresoFrecuencia: e.target.value }))}
                                  placeholder="Ej. Mensual"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Referencias */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl p-6 border border-green-200/30"
                    >
                      <h3 className="text-lg font-bold text-green-700 mb-6 flex items-center gap-2">
                        <span className="text-xl">👥</span> Referencias Personales
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-700">Referencia 1</h4>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Nombre Completo<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input type="text" placeholder="Nombre de la referencia" className={inputBase} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Teléfono<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input type="tel" placeholder="(555) 123-4567" className={inputBase} />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-700">Referencia 2</h4>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Nombre Completo<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input type="text" placeholder="Nombre de la referencia" className={inputBase} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Teléfono<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input type="tel" placeholder="(555) 123-4567" className={inputBase} />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Acciones */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-200"
                    >
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-8 py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      >
                        Cancelar
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(34, 197, 94, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                      >
                        🚀 Enviar Solicitud
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Modal de vista previa súper moderno */}
          <AnimatePresence>
            {previewSrc && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setPreviewSrc(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPreviewSrc(null)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 shadow-lg transition-colors duration-200"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <img
                    src={previewSrc}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
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