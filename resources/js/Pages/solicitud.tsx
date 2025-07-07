import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Solicitud() {
  // Estados principales del flujo
  const [isVisible, setIsVisible] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  
  // Selección de promotora y cliente
  const [promotora, setPromotora] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const promoters = [
    { id: 'prom1', name: 'María Rodríguez' },
    { id: 'prom2', name: 'Carlos Sánchez' },
    { id: 'prom3', name: 'Ana Martínez' },
  ];

  interface Garantia {
    electrodomestico: string;
    marca: string;
    noSerie: string;
    modelo: string;
    antiguedad: string;
    montoGarantizado: string;
  }

  // Estados de garantías y modal
  const [garantias, setGarantias] = useState<Garantia[]>(
    Array.from({ length: 8 }, () => ({
      electrodomestico: '',
      marca: '',
      noSerie: '',
      modelo: '',
      antiguedad: '',
      montoGarantizado: '',
    }))
  );

  const [modalGarantiaAbierto, setModalGarantiaAbierto] = useState(false);
  const [garantiaSeleccionada, setGarantiaSeleccionada] = useState<number | null>(null);
  const [garantiaTemp, setGarantiaTemp] = useState<Garantia>({
    electrodomestico: '',
    marca: '',
    noSerie: '',
    modelo: '',
    antiguedad: '',
    montoGarantizado: '',
  });

  const clientsByPromoter: Record<string, string[]> = {
    prom1: ['Juan Pérez López', 'Ana García Martínez'],
    prom2: ['Roberto Silva Torres', 'Lucía Hernández Ruiz'],
    prom3: ['Carlos Gómez Sánchez', 'Laura Díaz Mendoza'],
  };

  // Validación de documentos
  const docTypes = ['ine', 'curp', 'comprobante'] as const;
  type DocKey = typeof docTypes[number];

  const [clienteValidation, setClienteValidation] = useState<
    Record<DocKey, 'accepted' | 'rejected' | undefined>
  >({ ine: undefined, curp: undefined, comprobante: undefined });
  
  const [avalValidation, setAvalValidation] = useState<
    Record<DocKey, 'accepted' | 'rejected' | undefined>
  >({ ine: undefined, curp: undefined, comprobante: undefined });

  const clienteImages: Record<DocKey, string> = {
    ine: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400',
    curp: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=400',
    comprobante: 'https://images.pexels.com/photos/6863365/pexels-photo-6863365.jpeg?auto=compress&cs=tinysrgb&w=400',
  };
  
  const avalImages: Record<DocKey, string> = {
    ine: 'https://images.pexels.com/photos/6863400/pexels-photo-6863400.jpeg?auto=compress&cs=tinysrgb&w=400',
    curp: 'https://images.pexels.com/photos/6863450/pexels-photo-6863450.jpeg?auto=compress&cs=tinysrgb&w=400',
    comprobante: 'https://images.pexels.com/photos/6863500/pexels-photo-6863500.jpeg?auto=compress&cs=tinysrgb&w=400',
  };

  // Verificar si todos los documentos están aprobados
  const allClienteAccepted = docTypes.every(key => clienteValidation[key] === 'accepted');
  const allAvalAccepted = docTypes.every(key => avalValidation[key] === 'accepted');
  const documentsApproved = allClienteAccepted && allAvalAccepted;

  // Wizard de pasos
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Estados del formulario
  const [domicilio, setDomicilio] = useState({
    calle: '', numero: '', interior: '', colonia: '', cp: '', tipoVivienda: '',
    municipioEstado: '', tiempoResidencia: '', montoMensual: '', telFijo: '', telCelular: '',
  });

  const [ocupacion, setOcupacion] = useState({
    actividad: '', domSecCalle: '', domSecColonia: '', domSecMunicipio: '', telefono: '',
    empresa: '', antiguedad: '', monto: '', periodo: '', ingresosAdicionales: false,
    ingresoConcepto: '', ingresoMonto: '', ingresoFrecuencia: '',
  });

  const [infoFamiliar, setInfoFamiliar] = useState({
    nombreConyugue: '', viveConUsted: false, celularConyugue: '', numeroHijos: '',
    actividadConyugue: '', ingresosSemanales: '', domicilioTrabajo: '',
    personasEnDomicilio: '', dependientesEconomicos: '',
  });

  const [avales, setAvales] = useState({
    aval1: { nombre: '', direccion: '', telefono: '', parentesco: '' },
    aval2: { nombre: '', direccion: '', telefono: '', parentesco: '' },
  });

  // Validaciones por paso
  const domicilioValid = domicilio.calle && domicilio.numero && domicilio.colonia && 
    domicilio.cp && domicilio.tipoVivienda && domicilio.municipioEstado && 
    domicilio.tiempoResidencia && domicilio.montoMensual && domicilio.telCelular;

  const ocupacionValid = ocupacion.actividad && ocupacion.domSecCalle && 
    ocupacion.domSecColonia && ocupacion.domSecMunicipio && ocupacion.telefono && 
    ocupacion.antiguedad && ocupacion.monto && ocupacion.periodo;

  const infoFamiliarValid = infoFamiliar.personasEnDomicilio && infoFamiliar.dependientesEconomicos;

  const avalValid = avales.aval1.nombre && avales.aval1.direccion && avales.aval1.telefono && 
    avales.aval1.parentesco && avales.aval2.nombre && avales.aval2.direccion && 
    avales.aval2.telefono && avales.aval2.parentesco;

  // Validación de garantías - al menos una debe estar completa
  const garantiasValid = garantias.some(g => 
    g.electrodomestico && g.marca && g.noSerie && g.modelo && g.antiguedad && g.montoGarantizado
  );

  // Definición de pasos del wizard
  const steps = [
    { number: 1, title: 'Domicilio', description: 'Datos de Domicilio', icon: '🏠', valid: Boolean(domicilioValid) },
    { number: 2, title: 'Ocupación', description: 'Datos de Ocupación', icon: '💼', valid: Boolean(ocupacionValid) },
    { number: 3, title: 'Familiar', description: 'Información Familiar', icon: '👨‍👩‍👧‍👦', valid: Boolean(infoFamiliarValid) },
    { number: 4, title: 'Avales', description: 'Datos de Avales', icon: '🤝', valid: Boolean(avalValid) },
    { number: 5, title: 'Garantías', description: 'Datos de Garantías', icon: '🔒', valid: Boolean(garantiasValid) },
    { number: 6, title: 'Resumen', description: 'Confirmación Final', icon: '✅', valid: true },
  ];

  const canContinue = () => steps[currentStep - 1].valid;
  const nextStep = () => canContinue() && currentStep < steps.length && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Funciones para el modal de garantías
  const abrirModalGarantia = (index: number) => {
    setGarantiaSeleccionada(index);
    setGarantiaTemp(garantias[index]);
    setModalGarantiaAbierto(true);
  };

  const cerrarModalGarantia = () => {
    setModalGarantiaAbierto(false);
    setGarantiaSeleccionada(null);
    setGarantiaTemp({
      electrodomestico: '',
      marca: '',
      noSerie: '',
      modelo: '',
      antiguedad: '',
      montoGarantizado: '',
    });
  };

  const guardarGarantia = () => {
    if (garantiaSeleccionada !== null) {
      const nuevasGarantias = [...garantias];
      nuevasGarantias[garantiaSeleccionada] = garantiaTemp;
      setGarantias(nuevasGarantias);
      cerrarModalGarantia();
    }
  };

  // Helper para formatear teléfono
  function formatPhoneInput(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
  }

  // Verificar si una garantía está completa
  const isGarantiaCompleta = (garantia: Garantia) => {
    return garantia.electrodomestico && garantia.marca && garantia.noSerie && 
           garantia.modelo && garantia.antiguedad && garantia.montoGarantizado;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (documentsApproved && !showWizard) {
      setTimeout(() => setShowWizard(true), 500);
    }
  }, [documentsApproved, showWizard]);

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

  return (
    <AuthenticatedLayout>
      <Head title="Nueva Solicitud de Crédito - Sistema de Créditos" />

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
                      {showWizard 
                        ? 'Complete la información del formulario paso a paso'
                        : documentsApproved 
                        ? 'Documentos aprobados - Preparando formulario...'
                        : 'Seleccione promotora, cliente y valide documentos'
                      }
                    </p>
                  </div>
                </div>

                {/* Progress indicator cuando está en wizard */}
                {showWizard && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ 
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                          animation: 'pulse 2s infinite'
                        }}
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 via-transparent to-transparent rounded-full"></div>
                    
                    <div className="flex justify-between mt-4">
                      {steps.map((step, index) => (
                        <div key={step.number} className={`flex items-center gap-2 transition-all duration-300 ${
                          currentStep >= step.number ? 'text-blue-600' : 'text-slate-400'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            currentStep >= step.number 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                              : 'bg-slate-200 text-slate-500'
                          }`}>
                            {step.number}
                          </div>
                          <span className="hidden sm:block font-semibold text-sm">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!showWizard ? (
              <motion.div
                key="validation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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

                {/* Validación de Documentos */}
                {cliente && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-8"
                  >
                    {/* Documentos del Cliente */}
                    <motion.section
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                            📄
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
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200/50' 
                                    : status === 'rejected'
                                    ? 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 shadow-red-200/50'
                                    : 'bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200'
                                } shadow-xl`}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                
                                <div className="relative z-10 text-center">
                                  <motion.img
                                    src={clienteImages[key]}
                                    alt={key}
                                    onClick={() => setPreviewSrc(clienteImages[key])}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full h-48 object-cover rounded-xl mb-4 cursor-zoom-in shadow-lg hover:shadow-xl transition-all duration-300"
                                  />
                                  
                                  <h4 className="font-bold text-slate-800 mb-4 text-lg">
                                    {key === 'ine' ? 'INE' : key === 'curp' ? 'CURP' : 'Comprobante de Domicilio'}
                                  </h4>
                                  
                                  <div className="flex justify-center gap-4">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => setClienteValidation(v => ({ ...v, [key]: 'accepted' }))}
                                      className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                                        status === 'accepted' 
                                          ? 'bg-green-500 text-white shadow-green-300' 
                                          : 'bg-green-100 text-green-600 hover:bg-green-200 hover:shadow-green-200'
                                      }`}
                                    >
                                      <CheckCircleIcon className="w-6 h-6" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => setClienteValidation(v => ({ ...v, [key]: 'rejected' }))}
                                      className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                                        status === 'rejected' 
                                          ? 'bg-red-500 text-white shadow-red-300' 
                                          : 'bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-red-200'
                                      }`}
                                    >
                                      <XCircleIcon className="w-6 h-6" />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.section>

                    {/* Documentos del Aval */}
                    <motion.section
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                            📋
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Documentos del Aval
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {docTypes.map((key, index) => {
                            const status = avalValidation[key];
                            
                            return (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                                className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                                  status === 'accepted' 
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200/50' 
                                    : status === 'rejected'
                                    ? 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 shadow-red-200/50'
                                    : 'bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200'
                                } shadow-xl`}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                
                                <div className="relative z-10 text-center">
                                  <motion.img
                                    src={avalImages[key]}
                                    alt={`aval-${key}`}
                                    onClick={() => setPreviewSrc(avalImages[key])}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full h-48 object-cover rounded-xl mb-4 cursor-zoom-in shadow-lg hover:shadow-xl transition-all duration-300"
                                  />
                                  
                                  <h4 className="font-bold text-slate-800 mb-4 text-lg">
                                    {key === 'ine' ? 'INE' : key === 'curp' ? 'CURP' : 'Comprobante de Domicilio'}
                                  </h4>
                                  
                                  <div className="flex justify-center gap-4">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => setAvalValidation(v => ({ ...v, [key]: 'accepted' }))}
                                      className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                                        status === 'accepted' 
                                          ? 'bg-green-500 text-white shadow-green-300' 
                                          : 'bg-green-100 text-green-600 hover:bg-green-200 hover:shadow-green-200'
                                      }`}
                                    >
                                      <CheckCircleIcon className="w-6 h-6" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => setAvalValidation(v => ({ ...v, [key]: 'rejected' }))}
                                      className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                                        status === 'rejected' 
                                          ? 'bg-red-500 text-white shadow-red-300' 
                                          : 'bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-red-200'
                                      }`}
                                    >
                                      <XCircleIcon className="w-6 h-6" />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.section>

                    {/* Mensaje de estado */}
                    {documentsApproved && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse"></div>
                        
                        <div className="relative z-10">
                          <div className="text-6xl mb-4">🎉</div>
                          <h3 className="text-2xl font-bold mb-2">¡Documentos Aprobados!</h3>
                          <p className="text-green-100">Preparando formulario de solicitud...</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* WIZARD DE PASOS */
              <motion.div
                key="wizard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Contenido del paso actual */}
                <AnimatePresence mode="wait">
                  {/* Paso 1: Domicilio */}
                  {currentStep === 1 && (
                    <motion.section
                      key="domicilio"
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            🏠
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              Datos de Domicilio
                            </h3>
                            <p className="text-slate-600 font-medium">Información del lugar de residencia</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { key: 'calle', label: 'Calle', required: true },
                            { key: 'numero', label: 'No.', required: true },
                            { key: 'interior', label: 'Int.', required: false },
                            { key: 'colonia', label: 'Colonia', required: true },
                            { key: 'cp', label: 'C.P.', required: true },
                            { key: 'municipioEstado', label: 'Municipio/Estado', required: true, fullWidth: true },
                            { key: 'tiempoResidencia', label: 'Tiempo de Residencia', required: true },
                            { key: 'montoMensual', label: 'Monto Mensual Renta/Crédito', required: true, type: 'number' },
                            { key: 'telFijo', label: 'Teléfono Fijo', required: false },
                            { key: 'telCelular', label: 'Teléfono Celular', required: true },
                          ].map((field, index) => (
                            <motion.div
                              key={field.key}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={field.fullWidth ? 'md:col-span-2' : ''}
                            >
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                              </label>
                              {field.key === 'tipoVivienda' ? (
                                <select
                                  className={inputBase}
                                  value={domicilio[field.key as keyof typeof domicilio]}
                                  onChange={(e) => setDomicilio(d => ({ ...d, [field.key]: e.target.value }))}
                                >
                                  <option value="">--Seleccione--</option>
                                  <option>Propia</option>
                                  <option>Rentada</option>
                                  <option>Familiar</option>
                                </select>
                              ) : (
                                <input
                                  type={field.type || 'text'}
                                  className={inputBase}
                                  value={domicilio[field.key as keyof typeof domicilio]}
                                  onChange={(e) => setDomicilio(d => ({ ...d, [field.key]: e.target.value }))}
                                  placeholder={field.key === 'cp' ? '12345' : ''}
                                />
                              )}
                            </motion.div>
                          ))}
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Tipo de Vivienda<span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                              className={inputBase}
                              value={domicilio.tipoVivienda}
                              onChange={(e) => setDomicilio(d => ({ ...d, tipoVivienda: e.target.value }))}
                            >
                              <option value="">--Seleccione--</option>
                              <option>Propia</option>
                              <option>Rentada</option>
                              <option>Familiar</option>
                            </select>
                          </motion.div>
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {/* Paso 2: Ocupación */}
                  {currentStep === 2 && (
                    <motion.section
                      key="ocupacion"
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            💼
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              Datos de Ocupación
                            </h3>
                            <p className="text-slate-600 font-medium">Información laboral y de ingresos</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Actividad que Realiza<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.actividad}
                              onChange={(e) => setOcupacion(o => ({ ...o, actividad: e.target.value }))}
                              placeholder="Ej. Comerciante, Empleado, etc."
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Nombre de la Empresa
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.empresa}
                              onChange={(e) => setOcupacion(o => ({ ...o, empresa: e.target.value }))}
                              placeholder="Nombre de la empresa o negocio"
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Domicilio Secundario - Calle y Número<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.domSecCalle}
                              onChange={(e) => setOcupacion(o => ({ ...o, domSecCalle: e.target.value }))}
                              placeholder="Dirección del trabajo"
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Colonia<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.domSecColonia}
                              onChange={(e) => setOcupacion(o => ({ ...o, domSecColonia: e.target.value }))}
                              placeholder="Colonia del trabajo"
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Municipio<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.domSecMunicipio}
                              onChange={(e) => setOcupacion(o => ({ ...o, domSecMunicipio: e.target.value }))}
                              placeholder="Municipio del trabajo"
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Teléfono<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.telefono}
                              onChange={(e) => setOcupacion(o => ({ ...o, telefono: formatPhoneInput(e.target.value) }))}
                              placeholder="123-456-7890"
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Antigüedad<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              className={inputBase}
                              value={ocupacion.antiguedad}
                              onChange={(e) => setOcupacion(o => ({ ...o, antiguedad: e.target.value }))}
                              placeholder="Ej. 2 años, 6 meses"
                            />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.35 }}
                            className="flex gap-4"
                          >
                            <div className="flex-1">
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Monto que Percibe<span className="text-red-500 ml-1">*</span>
                              </label>
                              <input
                                type="number"
                                className={inputBase}
                                value={ocupacion.monto}
                                onChange={(e) => setOcupacion(o => ({ ...o, monto: e.target.value }))}
                                placeholder="0.00"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Periodo<span className="text-red-500 ml-1">*</span>
                              </label>
                              <select
                                className={inputBase}
                                value={ocupacion.periodo}
                                onChange={(e) => setOcupacion(o => ({ ...o, periodo: e.target.value }))}
                              >
                                <option value="">--Seleccione--</option>
                                <option>Semanal</option>
                                <option>Quincenal</option>
                                <option>Mensual</option>
                              </select>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="md:col-span-2"
                          >
                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                              <input
                                type="checkbox"
                                checked={ocupacion.ingresosAdicionales}
                                onChange={(e) => setOcupacion(o => ({ ...o, ingresosAdicionales: e.target.checked }))}
                                className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500"
                              />
                              <label className="font-semibold text-blue-800">¿Tiene ingresos adicionales?</label>
                            </div>
                          </motion.div>
                          
                          {ocupacion.ingresosAdicionales && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Concepto</label>
                                <input
                                  className={inputBase}
                                  value={ocupacion.ingresoConcepto}
                                  onChange={(e) => setOcupacion(o => ({ ...o, ingresoConcepto: e.target.value }))}
                                  placeholder="Ej. Ventas, Comisiones"
                                />
                              </motion.div>
                              
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 }}
                              >
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Monto</label>
                                <input
                                  type="number"
                                  className={inputBase}
                                  value={ocupacion.ingresoMonto}
                                  onChange={(e) => setOcupacion(o => ({ ...o, ingresoMonto: e.target.value }))}
                                  placeholder="0.00"
                                />
                              </motion.div>
                              
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                              >
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Frecuencia</label>
                                <select
                                  className={inputBase}
                                  value={ocupacion.ingresoFrecuencia}
                                  onChange={(e) => setOcupacion(o => ({ ...o, ingresoFrecuencia: e.target.value }))}
                                >
                                  <option value="">--Seleccione--</option>
                                  <option>Semanal</option>
                                  <option>Quincenal</option>
                                  <option>Mensual</option>
                                  <option>Bimestral</option>
                                </select>
                              </motion.div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {/* Paso 3: Información Familiar */}
                  {currentStep === 3 && (
                    <motion.section
                      key="familiar"
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            👨‍👩‍👧‍👦
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              Información Familiar
                            </h3>
                            <p className="text-slate-600 font-medium">Datos del núcleo familiar</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { key: 'nombreConyugue', label: 'Nombre de Cónyuge', required: false },
                            { key: 'celularConyugue', label: 'Celular Cónyuge', required: false },
                            { key: 'numeroHijos', label: 'Número de Hijos', required: false, type: 'number' },
                            { key: 'actividadConyugue', label: 'Actividad del Cónyuge', required: false },
                            { key: 'ingresosSemanales', label: 'Ingresos Semanales', required: false },
                            { key: 'domicilioTrabajo', label: 'Domicilio de Trabajo', required: false, fullWidth: true },
                            { key: 'personasEnDomicilio', label: 'Personas en Domicilio', required: true, type: 'number' },
                            { key: 'dependientesEconomicos', label: 'Dependientes Económicos', required: true, type: 'number' },
                          ].map((field, index) => (
                            <motion.div
                              key={field.key}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={field.fullWidth ? 'md:col-span-2' : ''}
                            >
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                              </label>
                              <input
                                type={field.type || 'text'}
                                className={inputBase}
                                value={infoFamiliar[field.key as keyof typeof infoFamiliar]}
                                onChange={(e) => setInfoFamiliar(f => ({ ...f, [field.key]: e.target.value }))}
                                placeholder={field.type === 'number' ? '0' : ''}
                              />
                            </motion.div>
                          ))}
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="md:col-span-2"
                          >
                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                              <input
                                type="checkbox"
                                checked={infoFamiliar.viveConUsted}
                                onChange={(e) => setInfoFamiliar(f => ({ ...f, viveConUsted: e.target.checked }))}
                                className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500"
                              />
                              <label className="font-semibold text-green-800">¿El cónyuge vive con usted?</label>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {/* Paso 4: Avales */}
                  {currentStep === 4 && (
                    <motion.section
                      key="avales"
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            🤝
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                              Datos de Avales
                            </h3>
                            <p className="text-slate-600 font-medium">Referencias personales</p>
                          </div>
                        </div>
                        
                        <div className="space-y-8">
                          {['aval1', 'aval2'].map((key, idx) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.2 }}
                              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                              
                              <div className="relative z-10">
                                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                    idx === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  Aval {idx + 1}
                                </h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Nombre Completo<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                      className={inputBase}
                                      value={avales[key as 'aval1' | 'aval2'].nombre}
                                      onChange={(e) => setAvales(a => ({
                                        ...a,
                                        [key]: { ...a[key as 'aval1' | 'aval2'], nombre: e.target.value }
                                      }))}
                                      placeholder="Nombre completo del aval"
                                    />
                                  </div>
                                  
                                  <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Dirección Completa<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                      className={inputBase}
                                      value={avales[key as 'aval1' | 'aval2'].direccion}
                                      onChange={(e) => setAvales(a => ({
                                        ...a,
                                        [key]: { ...a[key as 'aval1' | 'aval2'], direccion: e.target.value }
                                      }))}
                                      placeholder="Dirección completa del aval"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Teléfono<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                      className={inputBase}
                                      value={avales[key as 'aval1' | 'aval2'].telefono}
                                      onChange={(e) => setAvales(a => ({
                                        ...a,
                                        [key]: { ...a[key as 'aval1' | 'aval2'], telefono: e.target.value }
                                      }))}
                                      placeholder="Teléfono del aval"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Parentesco<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <select
                                      className={inputBase}
                                      value={avales[key as 'aval1' | 'aval2'].parentesco}
                                      onChange={(e) => setAvales(a => ({
                                        ...a,
                                        [key]: { ...a[key as 'aval1' | 'aval2'], parentesco: e.target.value }
                                      }))}
                                    >
                                      <option value="">--Seleccione--</option>
                                      <option>Familiar</option>
                                      <option>Amigo</option>
                                      <option>Compañero de trabajo</option>
                                      <option>Conocido</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {/* Paso 5: Garantías */}
                  {currentStep === 5 && (
                    <motion.section
                      key="garantias"
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            🔒
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              Datos de Garantías
                            </h3>
                            <p className="text-slate-600 font-medium">Electrodomésticos como garantía (mínimo 1 requerido)</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {garantias.map((garantia, index) => {
                            const isCompleta = isGarantiaCompleta(garantia);
                            const gradients = [
                              'from-blue-500 to-cyan-500',
                              'from-purple-500 to-pink-500',
                              'from-green-500 to-emerald-500',
                              'from-orange-500 to-red-500',
                              'from-indigo-500 to-purple-500',
                              'from-pink-500 to-rose-500',
                              'from-teal-500 to-cyan-500',
                              'from-amber-500 to-yellow-500'
                            ];
                            
                            const electrodomesticos = [
                              { icon: '📺', name: 'Televisión' },
                              { icon: '❄️', name: 'Refrigerador' },
                              { icon: '👕', name: 'Lavadora' },
                              { icon: '🔥', name: 'Estufa' },
                              { icon: '💻', name: 'Computadora' },
                              { icon: '📱', name: 'Celular' },
                              { icon: '🎵', name: 'Equipo de Sonido' },
                              { icon: '🏠', name: 'Electrodoméstico' }
                            ];
                            
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ 
                                  scale: 1.05, 
                                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                  y: -5
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => abrirModalGarantia(index)}
                                className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 group ${
                                  isCompleta 
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200/50' 
                                    : 'bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-indigo-300'
                                } shadow-xl`}
                              >
                                {/* Efecto de brillo */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                
                                <div className="relative z-10 text-center">
                                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-300 group-hover:scale-110 ${
                                    isCompleta 
                                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' 
                                      : `bg-gradient-to-br ${gradients[index]} text-white`
                                  }`}>
                                    {isCompleta ? '✅' : electrodomesticos[index].icon}
                                  </div>
                                  
                                  <h4 className="font-bold text-slate-800 mb-2 text-lg">
                                    {isCompleta ? garantia.electrodomestico : `Garantía ${index + 1}`}
                                  </h4>
                                  
                                  {isCompleta ? (
                                    <div className="space-y-1 text-sm text-slate-600">
                                      <p><strong>Marca:</strong> {garantia.marca}</p>
                                      <p><strong>Modelo:</strong> {garantia.modelo}</p>
                                      <p><strong>Monto:</strong> <span className="font-bold text-green-600">${garantia.montoGarantizado}</span></p>
                                    </div>
                                  ) : (
                                    <p className="text-slate-500 text-sm">
                                      Haz clic para agregar información
                                    </p>
                                  )}
                                  
                                  <div className="mt-4">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                                        isCompleta 
                                          ? 'bg-green-500 text-white shadow-green-300' 
                                          : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                      }`}
                                    >
                                      {isCompleta ? (
                                        <>
                                          <span>✅</span>
                                          Completa
                                        </>
                                      ) : (
                                        <>
                                          <span>➕</span>
                                          Agregar
                                        </>
                                      )}
                                    </motion.div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                        
                        {/* Indicador de progreso */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="mt-8 text-center"
                        >
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                            <div className="flex items-center justify-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                                📊
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-indigo-800">Progreso de Garantías</h4>
                                <p className="text-indigo-600 text-sm">
                                  {garantias.filter(isGarantiaCompleta).length} de 8 garantías completadas
                                </p>
                              </div>
                            </div>
                            
                            <div className="w-full h-3 bg-indigo-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${(garantias.filter(isGarantiaCompleta).length / 8) * 100}%` }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                              />
                            </div>
                            
                            <p className="text-indigo-700 text-sm mt-3 font-medium">
                              {garantiasValid 
                                ? '¡Excelente! Ya puedes continuar al siguiente paso.' 
                                : 'Completa al menos una garantía para continuar.'
                              }
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.section>
                  )}

                  {/* Paso 6: Resumen */}
                  {currentStep === 6 && (
                    <motion.section
                      key="resumen"
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            ✅
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              Resumen Final
                            </h3>
                            <p className="text-slate-600 font-medium">Revise toda la información antes de enviar</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {/* Resumen por secciones */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Información General */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
                            >
                              <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">ℹ️</span> Información General
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p><strong>Promotora:</strong> {promoters.find(p => p.id === promotora)?.name}</p>
                                <p><strong>Cliente:</strong> {cliente}</p>
                              </div>
                            </motion.div>

                            {/* Domicilio */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
                            >
                              <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🏠</span> Domicilio
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p><strong>Dirección:</strong> {domicilio.calle} {domicilio.numero}</p>
                                <p><strong>Colonia:</strong> {domicilio.colonia}</p>
                                <p><strong>C.P.:</strong> {domicilio.cp}</p>
                                <p><strong>Tipo:</strong> {domicilio.tipoVivienda}</p>
                              </div>
                            </motion.div>

                            {/* Ocupación */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
                            >
                              <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">💼</span> Ocupación
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p><strong>Actividad:</strong> {ocupacion.actividad}</p>
                                <p><strong>Empresa:</strong> {ocupacion.empresa}</p>
                                <p><strong>Ingresos:</strong> ${ocupacion.monto} {ocupacion.periodo}</p>
                                <p><strong>Antigüedad:</strong> {ocupacion.antiguedad}</p>
                              </div>
                            </motion.div>

                            {/* Avales */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200"
                            >
                              <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🤝</span> Avales
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p><strong>Aval 1:</strong> {avales.aval1.nombre}</p>
                                  <p className="text-orange-600">({avales.aval1.parentesco})</p>
                                </div>
                                <div>
                                  <p><strong>Aval 2:</strong> {avales.aval2.nombre}</p>
                                  <p className="text-orange-600">({avales.aval2.parentesco})</p>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          {/* Garantías */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200"
                          >
                            <h4 className="text-lg font-bold text-indigo-800 mb-4 flex items-center gap-2">
                              <span className="text-2xl">🔒</span> Garantías ({garantias.filter(isGarantiaCompleta).length} registradas)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {garantias.filter(isGarantiaCompleta).map((garantia, index) => (
                                <div key={index} className="bg-white/60 rounded-xl p-4 border border-indigo-200/50">
                                  <div className="space-y-1 text-sm">
                                    <p><strong>{garantia.electrodomestico}</strong></p>
                                    <p className="text-indigo-600">{garantia.marca} - {garantia.modelo}</p>
                                    <p className="font-bold text-green-600">${garantia.montoGarantizado}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Botón de envío */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-center pt-6"
                          >
                            <motion.button
                              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)" }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => alert('¡Solicitud enviada exitosamente! 🎉')}
                              className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-4 mx-auto"
                            >
                              <span className="text-2xl">🚀</span>
                              Enviar Solicitud
                            </motion.button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>

                {/* Controles de navegación súper modernos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 via-white/50 to-slate-100/50 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                        whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
                        className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                          currentStep === 1
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <span className="text-xl">←</span>
                        Anterior
                      </motion.button>
                      
                      <div className="flex items-center gap-2">
                        {steps.map((step, index) => (
                          <div
                            key={step.number}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              currentStep >= step.number
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                                : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!canContinue()}
                        whileHover={{ scale: !canContinue() ? 1 : 1.05, boxShadow: !canContinue() ? undefined : "0 15px 30px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: !canContinue() ? 1 : 0.98 }}
                        className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                          !canContinue()
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : currentStep === steps.length
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                        }`}
                      >
                        {currentStep === steps.length ? (
                          <>
                            <span className="text-xl">✅</span>
                            Finalizar
                          </>
                        ) : (
                          <>
                            Continuar
                            <span className="text-xl">→</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Garantías súper moderno */}
          <AnimatePresence>
            {modalGarantiaAbierto && garantiaSeleccionada !== null && (
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
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                          🔒
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-800">
                            Garantía {garantiaSeleccionada + 1}
                          </h3>
                          <p className="text-sm text-slate-600">Complete la información del electrodoméstico</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cerrarModalGarantia}
                        className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors duration-200"
                      >
                        ✕
                      </motion.button>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); guardarGarantia(); }} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Tipo de Electrodoméstico<span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          value={garantiaTemp.electrodomestico}
                          onChange={(e) => setGarantiaTemp(g => ({ ...g, electrodomestico: e.target.value }))}
                          className={inputBase}
                          required
                        >
                          <option value="">-- Seleccione un electrodoméstico --</option>
                          <option value="Televisión">📺 Televisión</option>
                          <option value="Refrigerador">❄️ Refrigerador</option>
                          <option value="Lavadora">👕 Lavadora</option>
                          <option value="Estufa">🔥 Estufa</option>
                          <option value="Computadora">💻 Computadora</option>
                          <option value="Celular">📱 Celular</option>
                          <option value="Equipo de Sonido">🎵 Equipo de Sonido</option>
                          <option value="Microondas">🍽️ Microondas</option>
                          <option value="Aire Acondicionado">❄️ Aire Acondicionado</option>
                          <option value="Otro">🏠 Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Marca<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantiaTemp.marca}
                          onChange={(e) => setGarantiaTemp(g => ({ ...g, marca: e.target.value }))}
                          className={inputBase}
                          placeholder="Ej. Samsung, LG, Sony"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Número de Serie<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantiaTemp.noSerie}
                          onChange={(e) => setGarantiaTemp(g => ({ ...g, noSerie: e.target.value }))}
                          className={inputBase}
                          placeholder="Número de serie del producto"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Modelo<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantiaTemp.modelo}
                          onChange={(e) => setGarantiaTemp(g => ({ ...g, modelo: e.target.value }))}
                          className={inputBase}
                          placeholder="Modelo del producto"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Antigüedad<span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          value={garantiaTemp.antiguedad}
                          onChange={(e) => setGarantiaTemp(g => ({ ...g, antiguedad: e.target.value }))}
                          className={inputBase}
                          required
                        >
                          <option value="">-- Seleccione la antigüedad --</option>
                          <option value="Nuevo">Nuevo (0-6 meses)</option>
                          <option value="Seminuevo">Seminuevo (6 meses - 1 año)</option>
                          <option value="1-2 años">1-2 años</option>
                          <option value="2-3 años">2-3 años</option>
                          <option value="3-5 años">3-5 años</option>
                          <option value="Más de 5 años">Más de 5 años</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Monto Garantizado<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="number"
                          value={garantiaTemp.montoGarantizado}
                          onChange={(e) => setGarantiaTemp(g => ({ ...g, montoGarantizado: e.target.value }))}
                          className={inputBase}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <motion.button
                          type="button"
                          onClick={cerrarModalGarantia}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        >
                          Cancelar
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 text-white shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                          Guardar
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
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
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.9)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPreviewSrc(null)}
                    className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-500/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg backdrop-blur-sm transition-all duration-200"
                  >
                    ✕
                  </motion.button>
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
    </AuthenticatedLayout>
  );
}