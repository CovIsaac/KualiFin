import React, { useState, useEffect } from "react";
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
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
      setCurrentStep(1);
    }, 5000);
  };

  // Helper para formatear teléfono
  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Validaciones por paso
  const clienteValid = form.fecha && form.cliente && form.telefono && form.promotora;
  
  const creditoValid = form.montoSolicitado && form.totalDescontar && form.numeroPagos && form.cantidadPago;
  
  const viviendaValid = form.casa && form.fechaCreditoAnterior && form.montoCreditoAnterior;
  
  const avalValid = form.aval && form.telefonoAval && form.casaAval && form.montoCreditoAval;
  
  const adicionalValid = form.pagosAtrasados && form.fechaCredito;
  
  const garantiasValid = garantias.some(g => 
    g.electrodomestico && g.marca && g.noSerie && g.modelo && g.antiguedad && g.montoGarantizado
  );

  // Definición de pasos del wizard
  const steps = [
    { number: 1, title: 'Cliente', description: 'Información del Cliente', icon: '👤', valid: Boolean(clienteValid) },
    { number: 2, title: 'Crédito', description: 'Detalles del Crédito', icon: '💰', valid: Boolean(creditoValid) },
    { number: 3, title: 'Vivienda', description: 'Información de Vivienda', icon: '🏠', valid: Boolean(viviendaValid) },
    { number: 4, title: 'Aval', description: 'Información del Aval', icon: '🤝', valid: Boolean(avalValid) },
    { number: 5, title: 'Adicional', description: 'Información Adicional', icon: '📋', valid: Boolean(adicionalValid) },
    { number: 6, title: 'Garantías', description: 'Datos de Garantías', icon: '🔒', valid: Boolean(garantiasValid) },
    { number: 7, title: 'Resumen', description: 'Confirmación Final', icon: '✅', valid: true },
  ];

  const canContinue = () => steps[currentStep - 1].valid;
  const nextStep = () => canContinue() && currentStep < steps.length && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Secciones del formulario
  const formSections = [
    {
      title: "Información del Cliente",
      icon: "👤",
      fields: [
        { key: 'fecha', label: 'Fecha', type: 'date', required: true },
        { key: 'cliente', label: 'Cliente', type: 'text', required: true, placeholder: 'Nombre completo del cliente' },
        { key: 'telefono', label: 'Teléfono', type: 'tel', required: true, placeholder: '123-456-7890' },
        { key: 'promotora', label: 'Nombre de Promotora', type: 'text', required: true, placeholder: 'Nombre de la promotora' },
      ]
    },
    {
      title: "Detalles del Crédito",
      icon: "💰",
      fields: [
        { key: 'montoSolicitado', label: 'Monto Solicitado', type: 'number', required: true, placeholder: '0.00' },
        { key: 'totalDescontar', label: 'Total a descontar (Recréditos)', type: 'number', required: true, placeholder: '0.00' },
        { key: 'numeroPagos', label: 'Número de pagos', type: 'number', required: true, placeholder: '12' },
        { key: 'cantidadPago', label: 'Cantidad por pago', type: 'number', required: true, placeholder: '0.00' },
      ]
    },
    {
      title: "Información de Vivienda",
      icon: "🏠",
      fields: [
        { key: 'casa', label: 'Casa', type: 'select', required: true, options: ['Propia', 'Rentada'] },
        { key: 'fechaCreditoAnterior', label: 'Fecha de Crédito Anterior', type: 'date', required: true },
        { key: 'montoCreditoAnterior', label: 'Monto de Crédito Anterior', type: 'number', required: true, placeholder: '0.00' },
      ]
    },
    {
      title: "Información del Aval",
      icon: "🤝",
      fields: [
        { key: 'aval', label: 'Aval', type: 'text', required: true, placeholder: 'Nombre completo del aval' },
        { key: 'telefonoAval', label: 'Teléfono del aval', type: 'tel', required: true, placeholder: '123-456-7890' },
        { key: 'casaAval', label: 'Casa de Aval', type: 'select', required: true, options: ['Propia', 'Rentada'] },
        { key: 'montoCreditoAval', label: 'Monto Crédito de Aval', type: 'number', required: true, placeholder: '0.00' },
      ]
    },
    {
      title: "Información Adicional",
      icon: "📋",
      fields: [
        { key: 'pagosAtrasados', label: 'Pagos Atrasados', type: 'number', required: true, placeholder: '0' },
        { key: 'semanaExtra', label: 'Semana Extra', type: 'text', required: false, placeholder: 'Información adicional' },
        { key: 'fechaCredito', label: 'Fecha de Crédito', type: 'date', required: true },
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

  // Verificar si una garantía está completa
  const isGarantiaCompleta = (garantia: Garantia) => {
    return garantia.electrodomestico && garantia.marca && garantia.noSerie && 
           garantia.modelo && garantia.antiguedad && garantia.montoGarantizado;
  };

  const inputBase = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";

  return (
    <AuthenticatedLayout>
      <Head title="Recrédito de Clientes - Sistema de Créditos" />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  🔄
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Recrédito de Clientes
                  </h1>
                  <p className="text-lg text-gray-600">
                    Gestión de renovación y ampliación de créditos existentes
                  </p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="space-y-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between">
                  {steps.map((step) => (
                    <div key={step.number} className={`flex items-center gap-2 transition-colors duration-200 ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                        currentStep >= step.number 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.number}
                      </div>
                      <span className="hidden sm:block font-medium text-sm">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {enviado ? (
            /* Mensaje de éxito */
            <div className="bg-green-500 rounded-lg p-12 text-white text-center shadow-lg">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold mb-4">¡Recrédito Procesado Exitosamente!</h2>
              <p className="text-xl text-green-100 mb-6">
                La solicitud de recrédito con garantías ha sido enviada correctamente y está siendo procesada.
              </p>
              <div className="flex items-center justify-center gap-3 text-green-200">
                <div className="w-6 h-6 border-2 border-green-200 border-t-transparent rounded-full animate-spin"></div>
                <span>Redirigiendo automáticamente...</span>
              </div>
            </div>
          ) : (
            /* Wizard de pasos */
            <div className="space-y-6">
              {/* Contenido del paso actual */}
              <div>
                {/* Pasos 1-5: Formulario */}
                {currentStep >= 1 && currentStep <= 5 && (
                  <section className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl">{formSections[currentStep - 1].icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{formSections[currentStep - 1].title}</h3>
                        <p className="text-gray-600">Paso {currentStep} de {steps.length}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formSections[currentStep - 1].fields.map((field) => (
                        <div
                          key={field.key}
                          className={field.key === 'promotora' || field.key === 'cliente' || field.key === 'aval' ? 'md:col-span-2' : ''}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Paso 6: Garantías */}
                {currentStep === 6 && (
                  <section className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl">🔒</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Garantías del Recrédito</h3>
                        <p className="text-gray-600">Configure las garantías que respaldarán el recrédito (mínimo 1 requerido)</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {garantias.map((garantia, index) => {
                        const isComplete = isGarantiaCompleta(garantia);
                        const isEmpty = !garantia.electrodomestico && !garantia.marca && !garantia.noSerie && !garantia.modelo && !garantia.antiguedad && !garantia.montoGarantizado;
                        
                        return (
                          <div
                            key={index}
                            onClick={() => setModalGarantiaIndex(index)}
                            className={`rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                              isComplete 
                                ? 'bg-green-50 border-2 border-green-300' 
                                : isEmpty
                                ? 'bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400'
                                : 'bg-yellow-50 border-2 border-yellow-300'
                            } shadow-sm`}
                          >
                            <div className="text-center">
                              <div className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center text-3xl ${
                                isComplete 
                                  ? 'bg-green-500 text-white' 
                                  : isEmpty
                                  ? 'bg-gray-300 text-gray-600'
                                  : 'bg-yellow-500 text-white'
                              }`}>
                                {isComplete ? '✅' : isEmpty ? garantiaIcons[index] || '📦' : '⚠️'}
                              </div>
                              
                              <h4 className="font-semibold text-gray-800 mb-2">
                                Garantía {index + 1}
                              </h4>
                              
                              {isComplete ? (
                                <div className="space-y-1 text-sm">
                                  <p className="font-medium text-green-700">{garantia.electrodomestico}</p>
                                  <p className="text-green-600">{garantia.marca} - {garantia.modelo}</p>
                                  <p className="text-green-600 font-semibold">{formatCurrency(Number(garantia.montoGarantizado))}</p>
                                </div>
                              ) : isEmpty ? (
                                <p className="text-gray-500 text-sm">Haz clic para agregar garantía</p>
                              ) : (
                                <div className="space-y-1 text-sm">
                                  <p className="text-yellow-700 font-medium">Incompleta</p>
                                  <p className="text-yellow-600">Faltan datos por completar</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Indicador de progreso */}
                    <div className="mt-6 text-center">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                            📊
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-800">Progreso de Garantías</h4>
                            <p className="text-blue-600 text-sm">
                              {garantias.filter(isGarantiaCompleta).length} de 8 garantías completadas
                            </p>
                          </div>
                        </div>
                        
                        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${(garantias.filter(isGarantiaCompleta).length / 8) * 100}%` }}
                          />
                        </div>
                        
                        <p className="text-blue-700 text-sm mt-2 font-medium">
                          {garantiasValid 
                            ? '¡Excelente! Ya puedes continuar al siguiente paso.' 
                            : 'Completa al menos una garantía para continuar.'
                          }
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Paso 7: Resumen */}
                {currentStep === 7 && (
                  <section className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl">✅</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Resumen Final</h3>
                        <p className="text-gray-600">Revise toda la información antes de enviar</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Resumen por secciones */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Información del Cliente */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span>👤</span> Información del Cliente
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Cliente:</strong> {form.cliente}</p>
                            <p><strong>Teléfono:</strong> {form.telefono}</p>
                            <p><strong>Promotora:</strong> {form.promotora}</p>
                            <p><strong>Fecha:</strong> {form.fecha}</p>
                          </div>
                        </div>

                        {/* Detalles del Crédito */}
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                            <span>💰</span> Detalles del Crédito
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Monto Solicitado:</strong> {formatCurrency(Number(form.montoSolicitado))}</p>
                            <p><strong>Total a Descontar:</strong> {formatCurrency(Number(form.totalDescontar))}</p>
                            <p><strong>Número de Pagos:</strong> {form.numeroPagos}</p>
                            <p><strong>Cantidad por Pago:</strong> {formatCurrency(Number(form.cantidadPago))}</p>
                          </div>
                        </div>

                        {/* Información de Vivienda */}
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                            <span>🏠</span> Información de Vivienda
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Tipo de Casa:</strong> {form.casa}</p>
                            <p><strong>Fecha Crédito Anterior:</strong> {form.fechaCreditoAnterior}</p>
                            <p><strong>Monto Crédito Anterior:</strong> {formatCurrency(Number(form.montoCreditoAnterior))}</p>
                          </div>
                        </div>

                        {/* Información del Aval */}
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                          <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                            <span>🤝</span> Información del Aval
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Aval:</strong> {form.aval}</p>
                            <p><strong>Teléfono:</strong> {form.telefonoAval}</p>
                            <p><strong>Casa:</strong> {form.casaAval}</p>
                            <p><strong>Monto Crédito:</strong> {formatCurrency(Number(form.montoCreditoAval))}</p>
                          </div>
                        </div>
                      </div>

                      {/* Garantías */}
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                        <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                          <span>🔒</span> Garantías ({garantias.filter(isGarantiaCompleta).length} registradas)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {garantias.filter(isGarantiaCompleta).map((garantia, index) => (
                            <div key={index} className="bg-white rounded-lg p-3 border border-indigo-200">
                              <div className="space-y-1 text-sm">
                                <p><strong>{garantia.electrodomestico}</strong></p>
                                <p className="text-indigo-600">{garantia.marca} - {garantia.modelo}</p>
                                <p className="font-bold text-green-600">{formatCurrency(Number(garantia.montoGarantizado))}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botón de envío */}
                      <div className="text-center pt-4">
                        <form onSubmit={handleSubmit}>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-3 mx-auto ${
                              isSubmitting
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                                <span>Enviando...</span>
                              </>
                            ) : (
                              <>
                                <span>🚀</span>
                                <span>Enviar Recrédito</span>
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Controles de navegación */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                      currentStep === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
                    }`}
                  >
                    <span>←</span>
                    Anterior
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {steps.map((step) => (
                      <div
                        key={step.number}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          currentStep >= step.number
                            ? 'bg-blue-600'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canContinue()}
                    className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                      !canContinue()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : currentStep === steps.length
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {currentStep === steps.length ? (
                      <>
                        <span>✅</span>
                        Finalizar
                      </>
                    ) : (
                      <>
                        Continuar
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Garantía */}
          {modalGarantiaIndex !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-lg">
                        🔒
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Garantía {(modalGarantiaIndex || 0) + 1}</h3>
                        <p className="text-sm text-gray-600">Complete la información del electrodoméstico</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalGarantiaIndex(null)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setModalGarantiaIndex(null)}
                      className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalGarantiaIndex(null)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Guardar Garantía
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default RecreditoClientes;