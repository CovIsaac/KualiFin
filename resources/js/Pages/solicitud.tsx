import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos de datos
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

export default function Solicitud() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [enviado, setEnviado] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setEnviado(true);
    
    // Auto-reset después de 5 segundos
    setTimeout(() => {
      setEnviado(false);
      setForm(initialForm);
    }, 5000);
  };

  // Helper para formatear teléfono
  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
  };

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
        { key: 'totalDescontar', label: 'Total a descontar', type: 'number', required: true, icon: '💸', placeholder: '0.00' },
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      Complete todos los campos para procesar la solicitud
                    </p>
                  </div>
                </div>

                {/* Progress Bar súper moderno */}
                <div className="relative">
                  <div className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{ 
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
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
                    ¡Solicitud Enviada Exitosamente!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-xl text-green-100 mb-6"
                  >
                    La solicitud de crédito ha sido enviada correctamente y está siendo procesada por el equipo de revisión.
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
            ) : (
              /* Formulario súper moderno */
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
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

                  {/* Botón de envío */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-emerald-100/50 to-cyan-100/50 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                      <div className="text-center">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.05, boxShadow: isSubmitting ? undefined : "0 20px 40px rgba(34, 197, 94, 0.4)" }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 mx-auto shadow-2xl ${
                            isSubmitting
                              ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full"
                              />
                              <span>Enviando solicitud...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-2xl">📋</span>
                              <span>Enviar Solicitud</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </form>
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