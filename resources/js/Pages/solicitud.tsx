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

  const [garantiaModalOpen, setGarantiaModalOpen] = useState(false);
  const [garantiaActual, setGarantiaActual] = useState<number | null>(null);

  const [garantias, setGarantias] = useState(Array(8).fill({
    electrodomestico: '',
    marca: '',
    noSerie: '',
    modelo: '',
    antiguedad: '',
    montoGarantizado: '',
    foto: null
  }));

  const [avales, setAvales] = useState({
    aval1: {
      nombre: '',
      direccion: '',
      telefono: '',
      parentesco: ''
    },
    aval2: {
      nombre: '',
      direccion: '',
      telefono: '',
      parentesco: ''
    }
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

  const [infoFamiliar, setInfoFamiliar] = useState({
    nombreConyugue: '',
    viveConUsted: false,
    celularConyugue: '',
    numeroHijos: '',
    actividadConyugue: '',
    ingresosSemanales: '',
    domicilioTrabajo: '',
    personasEnDomicilio: '',
    dependientesEconomicos: ''
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
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={ocupacion.ingresosAdicionales}
                              onChange={e => setOcupacion(o => ({
                                ...o,
                                ingresosAdicionales: e.target.checked
                              }))}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            <span className="ms-3 text-sm font-medium text-slate-700">
                              ¿Cuenta con ingresos adicionales?
                            </span>
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

                    {/* Información Familiar */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="bg-gradient-to-br from-rose-50/60 to-pink-50/80 rounded-2xl p-8 border border-rose-200/30 shadow-lg mb-10"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-rose-700 mb-8 flex items-center gap-3">
                        <span className="text-2xl">👨‍👩‍👧‍👦</span>
                        Información Familiar
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre del Cónyuge */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Nombre Completo del Cónyuge
                          </label>
                          <input
                            type="text"
                            className={inputBase}
                            value={infoFamiliar.nombreConyugue}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              nombreConyugue: e.target.value
                            }))}
                            placeholder="Ej. María González Pérez"
                          />
                        </div>

                        {/* Vive con usted */}
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={infoFamiliar.viveConUsted}
                              onChange={e => setInfoFamiliar(prev => ({
                                ...prev,
                                viveConUsted: e.target.checked
                              }))}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                            <span className="ms-3 text-sm font-medium text-slate-700">
                              ¿Vive con usted?
                            </span>
                          </label>
                        </div>

                        {/* Celular del Cónyuge */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Número Celular del Cónyuge
                          </label>
                          <input
                            type="tel"
                            className={inputBase}
                            value={infoFamiliar.celularConyugue}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              celularConyugue: formatPhoneInput(e.target.value)
                            }))}
                            placeholder="Ej. 555-123-4567"
                            maxLength={12}
                          />
                        </div>

                        {/* Número de Hijos */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Número de Hijos
                          </label>
                          <input
                            type="number"
                            min="0"
                            className={inputBase}
                            value={infoFamiliar.numeroHijos}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              numeroHijos: e.target.value
                            }))}
                            placeholder="Ej. 2"
                          />
                        </div>

                        {/* Actividad que realiza el Cónyuge */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Actividad que realiza el Cónyuge
                          </label>
                          <input
                            type="text"
                            className={inputBase}
                            value={infoFamiliar.actividadConyugue}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              actividadConyugue: e.target.value
                            }))}
                            placeholder="Ej. Maestra, Comerciante"
                          />
                        </div>

                        {/* Ingresos Semanales del Cónyuge */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Ingresos Semanales del Cónyuge
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                              $
                            </span>
                            <input
                              type="number"
                              className={inputBase + " pl-7"}
                              value={infoFamiliar.ingresosSemanales}
                              onChange={e => setInfoFamiliar(prev => ({
                                ...prev,
                                ingresosSemanales: e.target.value
                              }))}
                              placeholder="Ej. 5000"
                            />
                          </div>
                        </div>

                        {/* Domicilio de Trabajo del Cónyuge */}
                        <div className="col-span-full">
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Domicilio de Trabajo del Cónyuge
                          </label>
                          <input
                            type="text"
                            className={inputBase}
                            value={infoFamiliar.domicilioTrabajo}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              domicilioTrabajo: e.target.value
                            }))}
                            placeholder="Ej. Av. Principal #123, Col. Centro"
                          />
                        </div>

                        {/* Número de Personas que viven en su domicilio */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Número de Personas que viven en su domicilio
                          </label>
                          <input
                            type="number"
                            min="1"
                            className={inputBase}
                            value={infoFamiliar.personasEnDomicilio}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              personasEnDomicilio: e.target.value
                            }))}
                            placeholder="Ej. 4"
                          />
                        </div>

                        {/* Número de Dependientes Económicos */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Número de Dependientes Económicos
                          </label>
                          <input
                            type="number"
                            min="0"
                            className={inputBase}
                            value={infoFamiliar.dependientesEconomicos}
                            onChange={e => setInfoFamiliar(prev => ({
                              ...prev,
                              dependientesEconomicos: e.target.value
                            }))}
                            placeholder="Ej. 3"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Avales */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="bg-gradient-to-br from-amber-50/60 to-orange-50/80 rounded-2xl p-8 border border-amber-200/30 shadow-lg mb-10"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4 flex items-center gap-3">
                        <span className="text-2xl">🤝</span>
                        Avales
                      </h3>

                      {/* Aviso importante */}
                      <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-100 via-yellow-50 to-yellow-100 border border-amber-300 flex items-center gap-3">
                        <span className="text-amber-600 text-2xl">⚠️</span>
                        <span className="font-semibold text-amber-700 text-base">
                          Los avales deben vivir en diferente domicilio
                        </span>
                      </div>

                      {/* Aval 1 */}
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                            1
                          </span>
                          Primer Aval
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Nombre */}
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Nombre Completo<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="text"
                              className={inputBase}
                              placeholder="Ej. Juan Pérez García"
                              required
                            />
                          </div>
                          
                          {/* Dirección */}
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Dirección Completa<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="text"
                              className={inputBase}
                              placeholder="Ej. Calle 123, Colonia Centro, Ciudad, CP 12345"
                              required
                            />
                          </div>

                          {/* Teléfono */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Teléfono<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="tel"
                              className={inputBase}
                              placeholder="Ej. 555-123-4567"
                              maxLength={12}
                              required
                            />
                          </div>

                          {/* Parentesco */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Parentesco<span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                              className={inputBase}
                              required
                            >
                              <option value="">Seleccione parentesco...</option>
                              <option value="Familiar">Familiar</option>
                              <option value="Amigo">Amigo</option>
                              <option value="Compañero">Compañero de trabajo</option>
                              <option value="Conocido">Conocido</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Separador */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent my-8"></div>

                      {/* Aval 2 */}
                      <div>
                        <h4 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                            2
                          </span>
                          Segundo Aval
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Nombre */}
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Nombre Completo<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="text"
                              className={inputBase}
                              placeholder="Ej. María Rodríguez López"
                              required
                            />
                          </div>
                          
                          {/* Dirección */}
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Dirección Completa<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="text"
                              className={inputBase}
                              placeholder="Ej. Avenida 456, Colonia Reforma, Ciudad, CP 54321"
                              required
                            />
                          </div>

                          {/* Teléfono */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Teléfono<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="tel"
                              className={inputBase}
                              placeholder="Ej. 555-123-4567"
                              maxLength={12}
                              required
                            />
                          </div>

                          {/* Parentesco */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                              Parentesco<span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                              className={inputBase}
                              required
                            >
                              <option value="">Seleccione parentesco...</option>
                              <option value="Familiar">Familiar</option>
                              <option value="Amigo">Amigo</option>
                              <option value="Compañero">Compañero de trabajo</option>
                              <option value="Conocido">Conocido</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Garantías */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="bg-gradient-to-br from-emerald-50/60 to-teal-50/80 rounded-2xl p-8 border border-emerald-200/30 shadow-lg mb-10"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-8 flex items-center gap-3">
                        <span className="text-2xl">📱</span>
                        Garantías
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {garantias.map((garantia, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            onClick={() => {
                              setGarantiaActual(index);
                              setGarantiaModalOpen(true);
                            }}
                            className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 cursor-pointer hover:scale-105 group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                                {index + 1}
                              </span>
                              {garantia.electrodomestico ? (
                                <span className="text-emerald-600 text-xs px-2 py-1 bg-emerald-50 rounded-full">
                                  Completado
                                </span>
                              ) : (
                                <span className="text-amber-600 text-xs px-2 py-1 bg-amber-50 rounded-full">
                                  Pendiente
                                </span>
                              )}
                            </div>

                            <h4 className="font-semibold text-slate-700 mb-2">
                              {garantia.electrodomestico || `Garantía ${index + 1}`}
                            </h4>

                            {garantia.electrodomestico ? (
                              <div className="space-y-1 text-sm text-slate-500">
                                <p>{garantia.marca} - {garantia.modelo}</p>
                                <p className="text-emerald-600 font-medium">
                                  ${Number(garantia.montoGarantizado).toLocaleString()}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-slate-400">
                                Click para agregar detalles
                              </p>
                            )}

                            {garantia.foto && (
                              <div className="mt-2 h-20 w-full rounded-lg overflow-hidden">
                                <img
                                  src={URL.createObjectURL(garantia.foto)}
                                  alt={`Garantía ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Modal para editar garantía */}
                      <AnimatePresence>
                        {garantiaModalOpen && garantiaActual !== null && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setGarantiaModalOpen(false)}
                          >
                            <motion.div
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.95, opacity: 0 }}
                              onClick={e => e.stopPropagation()}
                              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            >
                              {/* Header del modal */}
                              <div className="p-6 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                                      {garantiaActual + 1}
                                    </span>
                                    Detalles de la Garantía
                                  </h3>
                                  <button
                                    onClick={() => setGarantiaModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-500 transition-colors"
                                  >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              {/* Contenido del modal */}
                              <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  {/* Electrodoméstico */}
                                  <div className="col-span-full">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                      Electrodoméstico
                                    </label>
                                    <input
                                      type="text"
                                      className={inputBase}
                                      value={garantias[garantiaActual].electrodomestico}
                                      onChange={e => {
                                        const newGarantias = [...garantias];
                                        newGarantias[garantiaActual] = {
                                          ...newGarantias[garantiaActual],
                                          electrodomestico: e.target.value
                                        };
                                        setGarantias(newGarantias);
                                      }}
                                      placeholder="Ej. Televisión"
                                    />
                                  </div>

                                  {/* Marca */}
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                      Marca
                                    </label>
                                    <input
                                      type="text"
                                      className={inputBase}
                                      value={garantias[garantiaActual].marca}
                                      onChange={e => {
                                        const newGarantias = [...garantias];
                                        newGarantias[garantiaActual] = {
                                          ...newGarantias[garantiaActual],
                                          marca: e.target.value
                                        };
                                        setGarantias(newGarantias);
                                      }}
                                      placeholder="Ej. Samsung"
                                    />
                                  </div>

                                  {/* No. Serie */}
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                      No. Serie
                                    </label>
                                    <input
                                      type="text"
                                      className={inputBase}
                                      value={garantias[garantiaActual].noSerie}
                                      onChange={e => {
                                        const newGarantias = [...garantias];
                                        newGarantias[garantiaActual] = {
                                          ...newGarantias[garantiaActual],
                                          noSerie: e.target.value
                                        };
                                        setGarantias(newGarantias);
                                      }}
                                      placeholder="Ej. XYZ123456"
                                    />
                                  </div>

                                  {/* Modelo */}
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                      Modelo
                                    </label>
                                    <input
                                      type="text"
                                      className={inputBase}
                                      value={garantias[garantiaActual].modelo}
                                      onChange={e => {
                                        const newGarantias = [...garantias];
                                        newGarantias[garantiaActual] = {
                                          ...newGarantias[garantiaActual],
                                          modelo: e.target.value
                                        };
                                        setGarantias(newGarantias);
                                      }}
                                      placeholder="Ej. UN55TU7000"
                                    />
                                  </div>

                                  {/* Antigüedad */}
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                      Antigüedad
                                    </label>
                                    <input
                                      type="text"
                                      className={inputBase}
                                      value={garantias[garantiaActual].antiguedad}
                                      onChange={e => {
                                        const newGarantias = [...garantias];
                                        newGarantias[garantiaActual] = {
                                          ...newGarantias[garantiaActual],
                                          antiguedad: e.target.value
                                        };
                                        setGarantias(newGarantias);
                                      }}
                                      placeholder="Ej. 2 años"
                                    />
                                  </div>

                                  {/* Monto Garantizado */}
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                      Monto Garantizado
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                                        $
                                      </span>
                                      <input
                                        type="number"
                                        className={inputBase + " pl-7"}
                                        value={garantias[garantiaActual].montoGarantizado}
                                        onChange={e => {
                                          const newGarantias = [...garantias];
                                          newGarantias[garantiaActual] = {
                                            ...newGarantias[garantiaActual],
                                            montoGarantizado: e.target.value
                                          };
                                          setGarantias(newGarantias);
                                        }}
                                        placeholder="Ej. 5000"
                                      />
                                    </div>
                                  </div>

                                  {/* Subir Foto */}
                                  <div className="col-span-full">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Fotografía
                                    </label>
                                    <div className="flex flex-col items-center gap-4">
                                      {garantias[garantiaActual].foto ? (
                                        <div className="relative w-full h-48 group">
                                          <img
                                            src={URL.createObjectURL(garantias[garantiaActual].foto)}
                                            alt={`Garantía ${garantiaActual + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newGarantias = [...garantias];
                                              newGarantias[garantiaActual] = {
                                                ...newGarantias[garantiaActual],
                                                foto: null
                                              };
                                              setGarantias(newGarantias);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        </div>
                                      ) : (
                                        <label className="w-full cursor-pointer">
                                          <div className="w-full h-48 border-2 border-dashed border-emerald-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-emerald-500 transition-colors duration-300">
                                            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="text-sm text-slate-600">
                                              Click para subir foto
                                            </span>
                                          </div>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={e => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                const newGarantias = [...garantias];
                                                newGarantias[garantiaActual] = {
                                                  ...newGarantias[garantiaActual],
                                                  foto: file
                                                };
                                                setGarantias(newGarantias);
                                              }
                                            }}
                                          />
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Footer del modal */}
                              <div className="p-6 border-t border-slate-200 flex justify-end gap-4">
                                <button
                                  type="button"
                                  onClick={() => setGarantiaModalOpen(false)}
                                  className="px-4 py-2 text-slate-600 hover:text-slate-700 transition-colors"
                                >
                                  Cerrar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setGarantiaModalOpen(false)}
                                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                >
                                  Guardar
                                </button>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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