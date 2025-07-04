import React, { useState, useEffect } from "react";
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  fecha: string;
  cliente: string;
  telefono: string;
  montoSolicitado: string;
  totalDescontar: string;
  numeroPagos: string;
  cantidadPago: string;
  casa: string;
  fechaCreditoAnterior: string;
  montoCreditoAnterior: string;
  aval: string;
  telefonoAval: string;
  casaAval: string;
  pagosAtrasados: string;
  semanaExtra: string;
  fechaCredito: string;
  montoCreditoAval: string;
  promotora: string;
}

interface Garantia {
  electrodomestico: string;
  marca: string;
  noSerie: string;
  modelo: string;
  antiguedad: string;
  montoGarantizado: string;
}

const initialForm: FormData = {
  fecha: "",
  cliente: "",
  telefono: "",
  montoSolicitado: "",
  totalDescontar: "",
  numeroPagos: "",
  cantidadPago: "",
  casa: "",
  fechaCreditoAnterior: "",
  montoCreditoAnterior: "",
  aval: "",
  telefonoAval: "",
  casaAval: "",
  pagosAtrasados: "",
  semanaExtra: "",
  fechaCredito: "",
  montoCreditoAval: "",
  promotora: "",
};

const RecreditoClientes: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [enviado, setEnviado] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGarantias, setShowGarantias] = useState(false);
  const [modalGarantiaIndex, setModalGarantiaIndex] = useState<number | null>(null);

  // Estado para las garantías
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGarantiaChange = (
    index: number,
    field: keyof Garantia,
    value: string
  ) => {
    setGarantias(prev => prev.map((garantia, i) => 
      i === index ? { ...garantia, [field]: value } : garantia
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar si al menos una garantía está completa
    const garantiasCompletas = garantias.filter(g => 
      g.electrodomestico && g.marca && g.noSerie && g.modelo && g.antiguedad && g.montoGarantizado
    );

    if (garantiasCompletas.length === 0) {
      alert('Debe completar al menos una garantía antes de enviar la solicitud.');
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setEnviado(true);
    
    // Auto-reset después de 5 segundos
    setTimeout(() => {
      setEnviado(false);
      setForm(initialForm);
      setGarantias(Array.from({ length: 8 }, () => ({
        electrodomestico: '',
        marca: '',
        noSerie: '',
        modelo: '',
        antiguedad: '',
        montoGarantizado: '',
      })));
      setShowGarantias(false);
    }, 5000);
  };

  // Helper para formatear teléfono
  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
  };

  // Verificar si el formulario básico está completo
  const isFormComplete = Object.values(form).every(value => value.trim() !== '');

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md placeholder-slate-400";

  // Secciones del formulario
  const formSections = [
    {
      title: "Información del Cliente",
      icon: "👤",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      fields: [
        { key: 'fecha', label: 'Fecha', type: 'date', required: true, icon: '📅' },
        { key: 'cliente', label: 'Cliente', type: 'text', required: true, icon: '👤', placeholder: 'Nombre completo del cliente' },
        { key: 'telefono', label: 'Teléfono', type: 'tel', required: true, icon: '📞', placeholder: '123-456-7890' },
        { key: 'promotora', label: 'Nombre de Promotora', type: 'text', required: true, icon: '👩‍💼', placeholder: 'Nombre de la promotora' },
      ]
    },
    {
      title: "Detalles del Crédito",
      icon: "💰",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      fields: [
        { key: 'montoSolicitado', label: 'Monto Solicitado', type: 'number', required: true, icon: '💵', placeholder: '0.00' },
        { key: 'totalDescontar', label: 'Total a descontar (Recréditos)', type: 'number', required: true, icon: '💸', placeholder: '0.00' },
        { key: 'numeroPagos', label: 'Número de pagos', type: 'number', required: true, icon: '🔢', placeholder: '12' },
        { key: 'cantidadPago', label: 'Cantidad por pago', type: 'number', required: true, icon: '💳', placeholder: '0.00' },
      ]
    },
    {
      title: "Información de Vivienda",
      icon: "🏠",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      fields: [
        { key: 'casa', label: 'Casa', type: 'select', required: true, icon: '🏡', options: ['Propia', 'Rentada'] },
        { key: 'fechaCreditoAnterior', label: 'Fecha de Crédito Anterior', type: 'date', required: true, icon: '📆' },
        { key: 'montoCreditoAnterior', label: 'Monto de Crédito Anterior', type: 'number', required: true, icon: '💰', placeholder: '0.00' },
      ]
    },
    {
      title: "Información del Aval",
      icon: "🤝",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      fields: [
        { key: 'aval', label: 'Aval', type: 'text', required: true, icon: '👥', placeholder: 'Nombre completo del aval' },
        { key: 'telefonoAval', label: 'Teléfono del aval', type: 'tel', required: true, icon: '📱', placeholder: '123-456-7890' },
        { key: 'casaAval', label: 'Casa de Aval', type: 'select', required: true, icon: '🏘️', options: ['Propia', 'Rentada'] },
        { key: 'montoCreditoAval', label: 'Monto Crédito de Aval', type: 'number', required: true, icon: '💎', placeholder: '0.00' },
      ]
    },
    {
      title: "Información Adicional",
      icon: "📋",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      fields: [
        { key: 'pagosAtrasados', label: 'Pagos Atrasados', type: 'number', required: true, icon: '⚠️', placeholder: '0' },
        { key: 'semanaExtra', label: 'Semana Extra', type: 'text', required: false, icon: '📅', placeholder: 'Información adicional' },
        { key: 'fechaCredito', label: 'Fecha de Crédito', type: 'date', required: true, icon: '🗓️' },
      ]
    }
  ];

  // Tipos de electrodomésticos
  const tiposElectrodomesticos = [
    'Televisión', 'Refrigerador', 'Lavadora', 'Microondas', 'Estufa', 
    'Aire Acondicionado', 'Computadora', 'Laptop', 'Tablet', 'Celular',
    'Equipo de Sonido', 'PlayStation/Xbox', 'Licuadora', 'Plancha',
    'Aspiradora', 'Ventilador', 'Horno', 'Cafetera', 'Otro'
  ];

  const garantiaIcons = ['📺', '❄️', '🧺', '🔥', '🍳', '❄️', '💻', '💻', '📱', '📱', '🎵', '🎮', '🥤', '👔', '🌪️', '💨', '🔥', '☕'];

  return (
    <AuthenticatedLayout>
      <Head title="Recrédito de Clientes - Sistema de Créditos" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header súper moderno */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-green-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <span className="animate-pulse">🔄</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      Recrédito de Clientes
                    </h1>
                    <p className="text-slate-600 font-medium text-lg">
                      {showGarantias 
                        ? 'Configure las garantías para el recrédito'
                        : 'Gestión de renovación y ampliación de créditos existentes'
                      }
                    </p>
                  </div>
                </div>

                {/* Indicador de progreso */}
                <div className="relative">
                  <div className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-full shadow-lg"
                      initial={{ width: '0%' }}
                      animate={{ width: showGarantias ? '90%' : `${((currentSection + 1) / formSections.length) * 80}%` }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{ 
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 via-transparent to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {enviado ? (
              /* Mensaje de éxito súper moderno */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-12 text-white text-center shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse"></div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="text-8xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl font-black mb-4"
                  >
                    ¡Recrédito Procesado Exitosamente!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-xl text-green-100 mb-6"
                  >
                    La solicitud de recrédito con garantías ha sido enviada correctamente y está siendo procesada.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center gap-3 text-green-200"
                  >
                    <div className="w-6 h-6 border-2 border-green-200 border-t-transparent rounded-full animate-spin"></div>
                    <span>Redirigiendo automáticamente...</span>
                  </motion.div>
                </div>
              </motion.div>
            ) : showGarantias ? (
              /* Sección de Garantías súper moderna */
              <motion.div
                key="garantias"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Header de Garantías */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                        🔒
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          Garantías del Recrédito
                        </h3>
                        <p className="text-slate-600 font-medium">Configure las garantías que respaldarán el recrédito</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                      <p className="text-yellow-800 font-medium flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        <span>Complete al menos una garantía para continuar con la solicitud de recrédito.</span>
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Grid de Cards de Garantías */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {garantias.map((garantia, index) => {
                    const isComplete = garantia.electrodomestico && garantia.marca && garantia.noSerie && garantia.modelo && garantia.antiguedad && garantia.montoGarantizado;
                    const isEmpty = !garantia.electrodomestico && !garantia.marca && !garantia.noSerie && !garantia.modelo && !garantia.antiguedad && !garantia.montoGarantizado;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setModalGarantiaIndex(index)}
                        className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 group ${
                          isComplete 
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 shadow-green-200/50' 
                            : isEmpty
                            ? 'bg-gradient-to-br from-slate-50 to-white border-2 border-dashed border-slate-300 hover:border-blue-400'
                            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 shadow-yellow-200/50'
                        } shadow-xl`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className="relative z-10 text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-300 group-hover:scale-110 ${
                            isComplete 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                              : isEmpty
                              ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-600'
                              : 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white'
                          }`}>
                            {isComplete ? '✅' : isEmpty ? garantiaIcons[index] || '📦' : '⚠️'}
                          </div>
                          
                          <h4 className="font-bold text-slate-800 mb-2 text-lg">
                            Garantía {index + 1}
                          </h4>
                          
                          {isComplete ? (
                            <div className="space-y-1 text-sm">
                              <p className="font-semibold text-green-700">{garantia.electrodomestico}</p>
                              <p className="text-green-600">{garantia.marca} - {garantia.modelo}</p>
                              <p className="text-green-600 font-bold">${garantia.montoGarantizado}</p>
                            </div>
                          ) : isEmpty ? (
                            <p className="text-slate-500 text-sm">Haz clic para agregar garantía</p>
                          ) : (
                            <div className="space-y-1 text-sm">
                              <p className="text-yellow-700 font-semibold">Incompleta</p>
                              <p className="text-yellow-600">Faltan datos por completar</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Botones de navegación */}
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
                        onClick={() => setShowGarantias(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-8 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-xl font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center gap-3"
                      >
                        <span className="text-xl">←</span>
                        Volver al Formulario
                      </motion.button>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">
                          Garantías completadas: {garantias.filter(g => g.electrodomestico && g.marca && g.noSerie && g.modelo && g.antiguedad && g.montoGarantizado).length} de 8
                        </p>
                        <div className="flex gap-1">
                          {garantias.map((_, index) => {
                            const isComplete = garantias[index].electrodomestico && garantias[index].marca && garantias[index].noSerie && garantias[index].modelo && garantias[index].antiguedad && garantias[index].montoGarantizado;
                            return (
                              <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  isComplete ? 'bg-green-500' : 'bg-slate-300'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting || garantias.filter(g => g.electrodomestico && g.marca && g.noSerie && g.modelo && g.antiguedad && g.montoGarantizado).length === 0}
                          whileHover={{ scale: isSubmitting ? 1 : 1.05, boxShadow: isSubmitting ? undefined : "0 15px 30px rgba(34, 197, 94, 0.4)" }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                            isSubmitting || garantias.filter(g => g.electrodomestico && g.marca && g.noSerie && g.modelo && g.antiguedad && g.montoGarantizado).length === 0
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full"
                              />
                              <span>Enviando...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xl">🚀</span>
                              <span>Enviar Recrédito</span>
                            </>
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* Formulario súper moderno */
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <form className="space-y-8">
                  {formSections.map((section, sectionIndex) => (
                    <motion.section
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                      className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
                    >
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            {section.icon}
                          </div>
                          <div>
                            <h3 className={`text-3xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                              {section.title}
                            </h3>
                            <p className="text-slate-600 font-medium">Sección {sectionIndex + 1} de {formSections.length}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {section.fields.map((field, fieldIndex) => (
                            <motion.div
                              key={field.key}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: sectionIndex * 0.1 + fieldIndex * 0.05 }}
                              className={field.key === 'promotora' || field.key === 'cliente' || field.key === 'aval' ? 'md:col-span-2' : ''}
                            >
                              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                <span className="text-lg">{field.icon}</span>
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </label>
                              
                              {field.type === 'select' ? (
                                <select
                                  name={field.key}
                                  value={form[field.key as keyof FormData]}
                                  onChange={handleChange}
                                  required={field.required}
                                  className={inputBase}
                                >
                                  <option value="">-- Seleccione una opción --</option>
                                  {field.options?.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  name={field.key}
                                  value={form[field.key as keyof FormData]}
                                  onChange={(e) => {
                                    if (field.type === 'tel') {
                                      const formatted = formatPhoneInput(e.target.value);
                                      setForm(prev => ({ ...prev, [field.key]: formatted }));
                                    } else {
                                      handleChange(e);
                                    }
                                  }}
                                  required={field.required}
                                  min={field.type === 'number' ? '0' : undefined}
                                  step={field.type === 'number' && field.key.includes('monto') ? '0.01' : undefined}
                                  placeholder={field.placeholder}
                                  className={inputBase}
                                />
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                  ))}

                  {/* Botón para continuar a garantías */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 via-orange-100/50 to-red-100/50 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                      <div className="text-center">
                        <motion.button
                          type="button"
                          onClick={() => setShowGarantias(true)}
                          disabled={!isFormComplete}
                          whileHover={{ scale: !isFormComplete ? 1 : 1.05, boxShadow: !isFormComplete ? undefined : "0 20px 40px rgba(251, 146, 60, 0.4)" }}
                          whileTap={{ scale: !isFormComplete ? 1 : 0.98 }}
                          className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 mx-auto shadow-2xl ${
                            !isFormComplete
                              ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white'
                          }`}
                        >
                          <span className="text-2xl">🔒</span>
                          <span>Continuar a Garantías</span>
                          <span className="text-2xl">→</span>
                        </motion.button>
                        
                        {!isFormComplete && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-4 text-sm text-red-600 flex items-center justify-center gap-2"
                          >
                            <span className="text-lg">⚠️</span>
                            <span>Complete todos los campos requeridos para continuar</span>
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Garantía súper moderno */}
          <AnimatePresence>
            {modalGarantiaIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setModalGarantiaIndex(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/80 to-white/60 rounded-3xl"></div>
                  
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                          🔒
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-800">Garantía {(modalGarantiaIndex || 0) + 1}</h3>
                          <p className="text-sm text-slate-600">Complete la información del electrodoméstico</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setModalGarantiaIndex(null)}
                        className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors duration-200"
                      >
                        ✕
                      </motion.button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Tipo de Electrodoméstico<span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          value={garantias[modalGarantiaIndex || 0]?.electrodomestico || ''}
                          onChange={(e) => handleGarantiaChange(modalGarantiaIndex || 0, 'electrodomestico', e.target.value)}
                          className={inputBase}
                        >
                          <option value="">-- Seleccione un tipo --</option>
                          {tiposElectrodomesticos.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Marca<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantias[modalGarantiaIndex || 0]?.marca || ''}
                          onChange={(e) => handleGarantiaChange(modalGarantiaIndex || 0, 'marca', e.target.value)}
                          placeholder="Ej. Samsung, LG, Sony"
                          className={inputBase}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Número de Serie<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantias[modalGarantiaIndex || 0]?.noSerie || ''}
                          onChange={(e) => handleGarantiaChange(modalGarantiaIndex || 0, 'noSerie', e.target.value)}
                          placeholder="Número de serie del producto"
                          className={inputBase}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Modelo<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantias[modalGarantiaIndex || 0]?.modelo || ''}
                          onChange={(e) => handleGarantiaChange(modalGarantiaIndex || 0, 'modelo', e.target.value)}
                          placeholder="Modelo del producto"
                          className={inputBase}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Antigüedad<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={garantias[modalGarantiaIndex || 0]?.antiguedad || ''}
                          onChange={(e) => handleGarantiaChange(modalGarantiaIndex || 0, 'antiguedad', e.target.value)}
                          placeholder="Ej. 2 años, 6 meses"
                          className={inputBase}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Monto Garantizado<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="number"
                          value={garantias[modalGarantiaIndex || 0]?.montoGarantizado || ''}
                          onChange={(e) => handleGarantiaChange(modalGarantiaIndex || 0, 'montoGarantizado', e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <motion.button
                        type="button"
                        onClick={() => setModalGarantiaIndex(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      >
                        Cancelar
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setModalGarantiaIndex(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                      >
                        Guardar Garantía
                      </motion.button>
                    </div>
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
};

export default RecreditoClientes;