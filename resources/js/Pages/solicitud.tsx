import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Solicitud() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  
  // Estados existentes
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

  // Validaciones para cada paso
  const step1Valid = promotora && cliente;
  const step2Valid = docTypes.every(key => clienteValidation[key] === 'accepted');
  const step3Valid = docTypes.every(key => avalValidation[key] === 'accepted');
  const step4Valid = 
    domicilio.calle && domicilio.numero && domicilio.colonia && domicilio.cp && 
    domicilio.tipoVivienda && domicilio.municipioEstado && domicilio.tiempoResidencia && 
    domicilio.montoMensual && domicilio.telCelular &&
    ocupacion.actividad && ocupacion.domSecundarioCalle && ocupacion.domSecundarioColonia &&
    ocupacion.domSecundarioMunicipio && ocupacion.telefono && ocupacion.antiguedad &&
    ocupacion.monto && ocupacion.periodo &&
    infoFamiliar.personasEnDomicilio && infoFamiliar.dependientesEconomicos &&
    avales.aval1.nombre && avales.aval1.direccion && avales.aval1.telefono && avales.aval1.parentesco &&
    avales.aval2.nombre && avales.aval2.direccion && avales.aval2.telefono && avales.aval2.parentesco;

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

  const steps = [
    { 
      number: 1, 
      title: 'Selección', 
      description: 'Promotora y Cliente',
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      valid: step1Valid
    },
    { 
      number: 2, 
      title: 'Cliente', 
      description: 'Documentos del Cliente',
      icon: '📋',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      valid: step2Valid
    },
    { 
      number: 3, 
      title: 'Aval', 
      description: 'Documentos del Aval',
      icon: '👤',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      valid: step3Valid
    },
    { 
      number: 4, 
      title: 'Información', 
      description: 'Datos Completos',
      icon: '📝',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      valid: step4Valid
    },
    { 
      number: 5, 
      title: 'Resumen', 
      description: 'Confirmación Final',
      icon: '✅',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      valid: true
    }
  ];

  const canContinue = () => {
    switch(currentStep) {
      case 1: return step1Valid;
      case 2: return step2Valid;
      case 3: return step3Valid;
      case 4: return step4Valid;
      case 5: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (canContinue() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
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
            className="mb-12 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <span className="animate-pulse">📋</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Nueva Solicitud de Crédito
                    </h1>
                    <p className="text-slate-600 font-medium text-lg">
                      Paso {currentStep} de 5 - {steps[currentStep - 1].description}
                    </p>
                  </div>
                </div>

                {/* Indicador de pasos súper moderno */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`relative group cursor-pointer transition-all duration-300 ${
                          currentStep === step.number ? 'scale-110' : ''
                        }`}
                        onClick={() => {
                          if (step.number < currentStep || (step.number === currentStep + 1 && canContinue())) {
                            setCurrentStep(step.number);
                          }
                        }}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          currentStep > step.number
                            ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg`
                            : currentStep === step.number
                            ? `bg-gradient-to-r ${step.gradient} text-white shadow-xl ring-4 ring-blue-200`
                            : step.valid
                            ? 'bg-green-100 text-green-600 border-2 border-green-300'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {currentStep > step.number ? '✓' : step.number}
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="bg-slate-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                            {step.title}
                          </div>
                        </div>
                      </motion.div>
                      
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-1 mx-2 rounded-full transition-all duration-500 ${
                          currentStep > step.number ? `bg-gradient-to-r ${step.gradient}` : 'bg-slate-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Barra de progreso */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / 5) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contenido de los pasos */}
          <AnimatePresence mode="wait">
            {/* Paso 1: Selección */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
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
              </motion.div>
            )}

            {/* Paso 2: Documentos del Cliente */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.section
                  whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
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
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                            className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                              status === 'accepted'
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200'
                                : status === 'rejected'
                                ? 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 shadow-red-200'
                                : 'bg-gradient-to-br from-white/60 to-slate-50/60 border-2 border-slate-200'
                            } shadow-xl`}
                          >
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
              </motion.div>
            )}

            {/* Paso 3: Documentos del Aval */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.section
                  whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
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
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                            className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                              status === 'accepted'
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200'
                                : status === 'rejected'
                                ? 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 shadow-red-200'
                                : 'bg-gradient-to-br from-white/60 to-slate-50/60 border-2 border-slate-200'
                            } shadow-xl`}
                          >
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

            {/* Paso 4: Información Completa */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Domicilio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        🏠
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Domicilio del Solicitante
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  </div>
                </motion.div>

                {/* Ocupación */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-100 via-yellow-50 to-yellow-100 border border-red-300 flex items-center gap-3">
                      <span className="text-red-600 text-2xl">⚠️</span>
                      <span className="font-semibold text-red-700 text-base">
                        En caso de no especificar ocupación, el crédito será <span className="underline">CANCELADO</span>.
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        💼
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Ocupación del Solicitante
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Domicilio Secundario - Calle y Número <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className={inputBase}
                          value={ocupacion.domSecundarioCalle}
                          onChange={e => setOcupacion(o => ({ ...o, domSecundarioCalle: e.target.value }))}
                          placeholder="Ej. Insurgentes 456"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Colonia <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className={inputBase}
                          value={ocupacion.domSecundarioColonia}
                          onChange={e => setOcupacion(o => ({ ...o, domSecundarioColonia: e.target.value }))}
                          placeholder="Ej. Roma Norte"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Municipio <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className={inputBase}
                          value={ocupacion.domSecundarioMunicipio}
                          onChange={e => setOcupacion(o => ({ ...o, domSecundarioMunicipio: e.target.value }))}
                          placeholder="Ej. CDMX"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
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
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Antigüedad <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className={inputBase}
                          value={ocupacion.antiguedad}
                          onChange={e => setOcupacion(o => ({ ...o, antiguedad: e.target.value }))}
                          placeholder="Ej. 2 años"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Monto que Percibe <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            className={inputBase + " w-36"}
                            value={ocupacion.monto}
                            onChange={e => setOcupacion(o => ({ ...o, monto: e.target.value }))}
                            placeholder="Ej. 5000"
                            required
                          />
                          <select
                            className={inputBase + " w-36"}
                            value={ocupacion.periodo}
                            onChange={e => setOcupacion(o => ({ ...o, periodo: e.target.value }))}
                            required
                          >
                            <option value="">Periodo...</option>
                            <option value="Semanal">Semanal</option>
                            <option value="Quincenal">Quincenal</option>
                            <option value="Mensual">Mensual</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Información Familiar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        👨‍👩‍👧‍👦
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Información Familiar
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Número de Personas que viven en su domicilio <span className="text-red-500">*</span></label>
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
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Número de Dependientes Económicos <span className="text-red-500">*</span></label>
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Avales */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        🤝
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Avales
                      </h3>
                    </div>

                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-100 via-yellow-50 to-yellow-100 border border-amber-300 flex items-center gap-3">
                      <span className="text-amber-600 text-2xl">⚠️</span>
                      <span className="font-semibold text-amber-700 text-base">
                        Los avales deben vivir en diferente domicilio
                      </span>
                    </div>

                    <div className="space-y-8">
                      {/* Aval 1 */}
                      <div>
                        <h4 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">1</span>
                          Primer Aval
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo<span className="text-red-500 ml-1">*</span></label>
                            <input
                              type="text"
                              className={inputBase}
                              value={avales.aval1.nombre}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval1: { ...prev.aval1, nombre: e.target.value }
                              }))}
                              placeholder="Ej. Juan Pérez García"
                              required
                            />
                          </div>
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Dirección Completa<span className="text-red-500 ml-1">*</span></label>
                            <input
                              type="text"
                              className={inputBase}
                              value={avales.aval1.direccion}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval1: { ...prev.aval1, direccion: e.target.value }
                              }))}
                              placeholder="Ej. Calle 123, Colonia Centro, Ciudad, CP 12345"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono<span className="text-red-500 ml-1">*</span></label>
                            <input
                              type="tel"
                              className={inputBase}
                              value={avales.aval1.telefono}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval1: { ...prev.aval1, telefono: e.target.value }
                              }))}
                              placeholder="Ej. 555-123-4567"
                              maxLength={12}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Parentesco<span className="text-red-500 ml-1">*</span></label>
                            <select
                              className={inputBase}
                              value={avales.aval1.parentesco}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval1: { ...prev.aval1, parentesco: e.target.value }
                              }))}
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
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>

                      {/* Aval 2 */}
                      <div>
                        <h4 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">2</span>
                          Segundo Aval
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo<span className="text-red-500 ml-1">*</span></label>
                            <input
                              type="text"
                              className={inputBase}
                              value={avales.aval2.nombre}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval2: { ...prev.aval2, nombre: e.target.value }
                              }))}
                              placeholder="Ej. María Rodríguez López"
                              required
                            />
                          </div>
                          <div className="col-span-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Dirección Completa<span className="text-red-500 ml-1">*</span></label>
                            <input
                              type="text"
                              className={inputBase}
                              value={avales.aval2.direccion}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval2: { ...prev.aval2, direccion: e.target.value }
                              }))}
                              placeholder="Ej. Avenida 456, Colonia Reforma, Ciudad, CP 54321"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono<span className="text-red-500 ml-1">*</span></label>
                            <input
                              type="tel"
                              className={inputBase}
                              value={avales.aval2.telefono}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval2: { ...prev.aval2, telefono: e.target.value }
                              }))}
                              placeholder="Ej. 555-123-4567"
                              maxLength={12}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Parentesco<span className="text-red-500 ml-1">*</span></label>
                            <select
                              className={inputBase}
                              value={avales.aval2.parentesco}
                              onChange={e => setAvales(prev => ({
                                ...prev,
                                aval2: { ...prev.aval2, parentesco: e.target.value }
                              }))}
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
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Paso 5: Resumen */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <motion.section
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        ✅
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Resumen de la Solicitud
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Información Básica */}
                      <div className="bg-gradient-to-br from-blue-50/60 to-cyan-50/80 rounded-2xl p-6 border border-blue-200/30">
                        <h4 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                          <span className="text-xl">👥</span> Información Básica
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Promotora:</strong> {promoters.find(p => p.id === promotora)?.name}</p>
                          <p><strong>Cliente:</strong> {cliente}</p>
                        </div>
                      </div>

                      {/* Documentos */}
                      <div className="bg-gradient-to-br from-green-50/60 to-emerald-50/80 rounded-2xl p-6 border border-green-200/30">
                        <h4 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                          <span className="text-xl">📋</span> Documentos
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Cliente:</strong> {docTypes.filter(key => clienteValidation[key] === 'accepted').length}/3 aprobados</p>
                          <p><strong>Aval:</strong> {docTypes.filter(key => avalValidation[key] === 'accepted').length}/3 aprobados</p>
                        </div>
                      </div>

                      {/* Domicilio */}
                      <div className="bg-gradient-to-br from-purple-50/60 to-violet-50/80 rounded-2xl p-6 border border-purple-200/30">
                        <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                          <span className="text-xl">🏠</span> Domicilio
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Dirección:</strong> {domicilio.calle} {domicilio.numero}</p>
                          <p><strong>Colonia:</strong> {domicilio.colonia}</p>
                          <p><strong>Tipo:</strong> {domicilio.tipoVivienda}</p>
                        </div>
                      </div>

                      {/* Ocupación */}
                      <div className="bg-gradient-to-br from-orange-50/60 to-red-50/80 rounded-2xl p-6 border border-orange-200/30">
                        <h4 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2">
                          <span className="text-xl">💼</span> Ocupación
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Actividad:</strong> {ocupacion.actividad}</p>
                          <p><strong>Ingresos:</strong> ${ocupacion.monto} {ocupacion.periodo}</p>
                          <p><strong>Antigüedad:</strong> {ocupacion.antiguedad}</p>
                        </div>
                      </div>

                      {/* Avales */}
                      <div className="md:col-span-2 bg-gradient-to-br from-amber-50/60 to-yellow-50/80 rounded-2xl p-6 border border-amber-200/30">
                        <h4 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                          <span className="text-xl">🤝</span> Avales
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Aval 1:</strong> {avales.aval1.nombre}</p>
                            <p><strong>Parentesco:</strong> {avales.aval1.parentesco}</p>
                          </div>
                          <div>
                            <p><strong>Aval 2:</strong> {avales.aval2.nombre}</p>
                            <p><strong>Parentesco:</strong> {avales.aval2.parentesco}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Confirmación */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl border border-emerald-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                          ✓
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-emerald-700">Solicitud Lista para Enviar</h5>
                          <p className="text-emerald-600">Todos los datos han sido completados correctamente.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navegación entre pasos */}
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
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  whileHover={{ scale: currentStep === 1 ? 1 : 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
                  className={`w-full sm:w-auto px-8 py-3 border-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 bg-white/80 backdrop-blur-sm'
                  }`}
                >
                  ← Anterior
                </motion.button>

                {/* Indicador de validación */}
                {!canContinue() && currentStep < 5 && (
                  <div className="text-center">
                    <p className="text-sm text-amber-600 font-medium flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      Complete todos los campos requeridos para continuar
                    </p>
                  </div>
                )}
                
                <motion.button
                  type="button"
                  onClick={currentStep === 5 ? () => alert('Solicitud enviada exitosamente!') : nextStep}
                  disabled={!canContinue()}
                  whileHover={{ 
                    scale: !canContinue() ? 1 : 1.05, 
                    boxShadow: !canContinue() ? "none" : currentStep === 5 ? "0 15px 30px rgba(34, 197, 94, 0.4)" : "0 15px 30px rgba(59, 130, 246, 0.4)" 
                  }}
                  whileTap={{ scale: !canContinue() ? 1 : 0.98 }}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    !canContinue()
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : currentStep === 5
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {currentStep === 5 ? '🚀 Enviar Solicitud' : 'Continuar →'}
                </motion.button>
              </div>
            </div>
          </motion.div>

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