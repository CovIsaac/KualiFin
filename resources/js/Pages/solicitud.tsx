import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Solicitud() {
  // Estados principales del flujo
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
    if (documentsApproved && !showWizard) {
      setTimeout(() => setShowWizard(true), 500);
    }
  }, [documentsApproved, showWizard]);

  const inputBase = "w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white";

  return (
    <AuthenticatedLayout>
      <Head title="Nueva Solicitud de Crédito - Sistema de Créditos" />

      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl">
                  📋
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-blue-600 mb-2">
                    Nueva Solicitud de Crédito
                  </h1>
                  <p className="text-slate-600">
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
                <div className="space-y-4">
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    {steps.map((step) => (
                      <div key={step.number} className={`flex items-center gap-2 transition-colors duration-200 ${
                        currentStep >= step.number ? 'text-blue-600' : 'text-slate-400'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                          currentStep >= step.number 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {step.number}
                        </div>
                        <span className="hidden sm:block font-medium text-sm">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!showWizard ? (
            <div className="space-y-6">
              {/* Selección de Promotora */}
              <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                    👩‍💼
                  </div>
                  <h2 className="text-xl font-bold text-blue-600">
                    Selección de Promotora
                  </h2>
                </div>
                
                <label className="block text-sm font-medium text-slate-700 mb-2">
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
              </section>

              {/* Selección de Cliente */}
              {promotora && (
                <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                      👤
                    </div>
                    <h2 className="text-xl font-bold text-purple-600">
                      Selección de Cliente
                    </h2>
                  </div>
                  
                  <label className="block text-sm font-medium text-slate-700 mb-2">
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
                </section>
              )}

              {/* Validación de Documentos */}
              {cliente && (
                <div className="space-y-6">
                  {/* Documentos del Cliente */}
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
                        📄
                      </div>
                      <h3 className="text-xl font-bold text-green-600">
                        Documentos de {cliente}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {docTypes.map((key) => {
                        const status = clienteValidation[key];
                        
                        return (
                          <div
                            key={key}
                            className={`rounded-xl p-4 border-2 transition-colors duration-200 ${
                              status === 'accepted' 
                                ? 'bg-green-50 border-green-400' 
                                : status === 'rejected'
                                ? 'bg-red-50 border-red-400'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="text-center">
                              <img
                                src={clienteImages[key]}
                                alt={key}
                                onClick={() => setPreviewSrc(clienteImages[key])}
                                className="w-full h-32 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                              />
                              
                              <h4 className="font-bold text-slate-800 mb-4">
                                {key === 'ine' ? 'INE' : key === 'curp' ? 'CURP' : 'Comprobante de Domicilio'}
                              </h4>
                              
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={() => setClienteValidation(v => ({ ...v, [key]: 'accepted' }))}
                                  className={`p-2 rounded-full transition-colors duration-200 ${
                                    status === 'accepted' 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                                  }`}
                                >
                                  <CheckCircleIcon className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => setClienteValidation(v => ({ ...v, [key]: 'rejected' }))}
                                  className={`p-2 rounded-full transition-colors duration-200 ${
                                    status === 'rejected' 
                                      ? 'bg-red-500 text-white' 
                                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                                  }`}
                                >
                                  <XCircleIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Documentos del Aval */}
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                        📋
                      </div>
                      <h3 className="text-xl font-bold text-indigo-600">
                        Documentos del Aval
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {docTypes.map((key) => {
                        const status = avalValidation[key];
                        
                        return (
                          <div
                            key={key}
                            className={`rounded-xl p-4 border-2 transition-colors duration-200 ${
                              status === 'accepted' 
                                ? 'bg-green-50 border-green-400' 
                                : status === 'rejected'
                                ? 'bg-red-50 border-red-400'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="text-center">
                              <img
                                src={avalImages[key]}
                                alt={`aval-${key}`}
                                onClick={() => setPreviewSrc(avalImages[key])}
                                className="w-full h-32 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                              />
                              
                              <h4 className="font-bold text-slate-800 mb-4">
                                {key === 'ine' ? 'INE' : key === 'curp' ? 'CURP' : 'Comprobante de Domicilio'}
                              </h4>
                              
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={() => setAvalValidation(v => ({ ...v, [key]: 'accepted' }))}
                                  className={`p-2 rounded-full transition-colors duration-200 ${
                                    status === 'accepted' 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                                  }`}
                                >
                                  <CheckCircleIcon className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => setAvalValidation(v => ({ ...v, [key]: 'rejected' }))}
                                  className={`p-2 rounded-full transition-colors duration-200 ${
                                    status === 'rejected' 
                                      ? 'bg-red-500 text-white' 
                                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                                  }`}
                                >
                                  <XCircleIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Mensaje de estado */}
                  {documentsApproved && (
                    <div className="bg-green-600 rounded-xl p-6 text-white text-center">
                      <div className="text-4xl mb-4">🎉</div>
                      <h3 className="text-xl font-bold mb-2">¡Documentos Aprobados!</h3>
                      <p className="text-green-100">Preparando formulario de solicitud...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* WIZARD DE PASOS */
            <div className="space-y-6">
              {/* Contenido del paso actual */}
              <div>
                {/* Paso 1: Domicilio */}
                {currentStep === 1 && (
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                        🏠
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-blue-600">
                          Datos de Domicilio
                        </h3>
                        <p className="text-slate-600">Información del lugar de residencia</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      ].map((field) => (
                        <div
                          key={field.key}
                          className={field.fullWidth ? 'md:col-span-2' : ''}
                        >
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <input
                            type={field.type || 'text'}
                            className={inputBase}
                            value={domicilio[field.key as keyof typeof domicilio]}
                            onChange={(e) => setDomicilio(d => ({ ...d, [field.key]: e.target.value }))}
                            placeholder={field.key === 'cp' ? '12345' : ''}
                          />
                        </div>
                      ))}
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      </div>
                    </div>
                  </section>
                )}

                {/* Paso 2: Ocupación */}
                {currentStep === 2 && (
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                        💼
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-purple-600">
                          Datos de Ocupación
                        </h3>
                        <p className="text-slate-600">Información laboral y de ingresos</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Actividad que Realiza<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.actividad}
                          onChange={(e) => setOcupacion(o => ({ ...o, actividad: e.target.value }))}
                          placeholder="Ej. Comerciante, Empleado, etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nombre de la Empresa
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.empresa}
                          onChange={(e) => setOcupacion(o => ({ ...o, empresa: e.target.value }))}
                          placeholder="Nombre de la empresa o negocio"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Domicilio Secundario - Calle y Número<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.domSecCalle}
                          onChange={(e) => setOcupacion(o => ({ ...o, domSecCalle: e.target.value }))}
                          placeholder="Dirección del trabajo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Colonia<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.domSecColonia}
                          onChange={(e) => setOcupacion(o => ({ ...o, domSecColonia: e.target.value }))}
                          placeholder="Colonia del trabajo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Municipio<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.domSecMunicipio}
                          onChange={(e) => setOcupacion(o => ({ ...o, domSecMunicipio: e.target.value }))}
                          placeholder="Municipio del trabajo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Teléfono<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.telefono}
                          onChange={(e) => setOcupacion(o => ({ ...o, telefono: formatPhoneInput(e.target.value) }))}
                          placeholder="123-456-7890"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Antigüedad<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={inputBase}
                          value={ocupacion.antiguedad}
                          onChange={(e) => setOcupacion(o => ({ ...o, antiguedad: e.target.value }))}
                          placeholder="Ej. 2 años, 6 meses"
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
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
                          <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <input
                            type="checkbox"
                            checked={ocupacion.ingresosAdicionales}
                            onChange={(e) => setOcupacion(o => ({ ...o, ingresosAdicionales: e.target.checked }))}
                            className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                          />
                          <label className="font-medium text-blue-800">¿Tiene ingresos adicionales?</label>
                        </div>
                      </div>
                      
                      {ocupacion.ingresosAdicionales && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Concepto</label>
                            <input
                              className={inputBase}
                              value={ocupacion.ingresoConcepto}
                              onChange={(e) => setOcupacion(o => ({ ...o, ingresoConcepto: e.target.value }))}
                              placeholder="Ej. Ventas, Comisiones"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Monto</label>
                            <input
                              type="number"
                              className={inputBase}
                              value={ocupacion.ingresoMonto}
                              onChange={(e) => setOcupacion(o => ({ ...o, ingresoMonto: e.target.value }))}
                              placeholder="0.00"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Frecuencia</label>
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
                          </div>
                        </>
                      )}
                    </div>
                  </section>
                )}

                {/* Paso 3: Información Familiar */}
                {currentStep === 3 && (
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
                        👨‍👩‍👧‍👦
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-600">
                          Información Familiar
                        </h3>
                        <p className="text-slate-600">Datos del núcleo familiar</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: 'nombreConyugue', label: 'Nombre de Cónyuge', required: false },
                        { key: 'celularConyugue', label: 'Celular Cónyuge', required: false },
                        { key: 'numeroHijos', label: 'Número de Hijos', required: false, type: 'number' },
                        { key: 'actividadConyugue', label: 'Actividad del Cónyuge', required: false },
                        { key: 'ingresosSemanales', label: 'Ingresos Semanales', required: false },
                        { key: 'domicilioTrabajo', label: 'Domicilio de Trabajo', required: false, fullWidth: true },
                        { key: 'personasEnDomicilio', label: 'Personas en Domicilio', required: true, type: 'number' },
                        { key: 'dependientesEconomicos', label: 'Dependientes Económicos', required: true, type: 'number' },
                      ].map((field) => (
                        <div
                          key={field.key}
                          className={field.fullWidth ? 'md:col-span-2' : ''}
                        >
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <input
                            type={field.type || 'text'}
                            className={inputBase}
                            value={infoFamiliar[field.key as keyof typeof infoFamiliar]}
                            onChange={(e) => setInfoFamiliar(f => ({ ...f, [field.key]: e.target.value }))}
                            placeholder={field.type === 'number' ? '0' : ''}
                          />
                        </div>
                      ))}
                      
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <input
                            type="checkbox"
                            checked={infoFamiliar.viveConUsted}
                            onChange={(e) => setInfoFamiliar(f => ({ ...f, viveConUsted: e.target.checked }))}
                            className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
                          />
                          <label className="font-medium text-green-800">¿El cónyuge vive con usted?</label>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Paso 4: Avales */}
                {currentStep === 4 && (
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xl">
                        🤝
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-orange-600">
                          Datos de Avales
                        </h3>
                        <p className="text-slate-600">Referencias personales</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {['aval1', 'aval2'].map((key, idx) => (
                        <div
                          key={key}
                          className="bg-slate-50 rounded-lg border border-slate-200 p-6"
                        >
                          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              idx === 0 ? 'bg-blue-600' : 'bg-purple-600'
                            }`}>
                              {idx + 1}
                            </span>
                            Aval {idx + 1}
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700 mb-2">
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
                              <label className="block text-sm font-medium text-slate-700 mb-2">
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
                              <label className="block text-sm font-medium text-slate-700 mb-2">
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
                              <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      ))}
                    </div>
                  </section>
                )}

                {/* Paso 5: Garantías */}
                {currentStep === 5 && (
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                        🔒
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-indigo-600">
                          Datos de Garantías
                        </h3>
                        <p className="text-slate-600">Electrodomésticos como garantía (mínimo 1 requerido)</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {garantias.map((garantia, index) => {
                        const isCompleta = isGarantiaCompleta(garantia);
                        
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
                          <div
                            key={index}
                            onClick={() => abrirModalGarantia(index)}
                            className={`rounded-lg p-4 cursor-pointer border-2 transition-all duration-200 hover:shadow-md ${
                              isCompleta 
                                ? 'bg-green-50 border-green-400' 
                                : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center text-xl ${
                                isCompleta 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-indigo-600 text-white'
                              }`}>
                                {isCompleta ? '✅' : electrodomesticos[index].icon}
                              </div>
                              
                              <h4 className="font-bold text-slate-800 mb-2">
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
                              
                              <div className="mt-3">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                  isCompleta 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-indigo-100 text-indigo-600'
                                }`}>
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
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Indicador de progreso */}
                    <div className="mt-6 text-center">
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm">
                            📊
                          </div>
                          <div>
                            <h4 className="font-bold text-indigo-800">Progreso de Garantías</h4>
                            <p className="text-indigo-600 text-sm">
                              {garantias.filter(isGarantiaCompleta).length} de 8 garantías completadas
                            </p>
                          </div>
                        </div>
                        
                        <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${(garantias.filter(isGarantiaCompleta).length / 8) * 100}%` }}
                          />
                        </div>
                        
                        <p className="text-indigo-700 text-sm mt-2 font-medium">
                          {garantiasValid 
                            ? '¡Excelente! Ya puedes continuar al siguiente paso.' 
                            : 'Completa al menos una garantía para continuar.'
                          }
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Paso 6: Resumen */}
                {currentStep === 6 && (
                  <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
                        ✅
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-600">
                          Resumen Final
                        </h3>
                        <p className="text-slate-600">Revise toda la información antes de enviar</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Resumen por secciones */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Información General */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span>ℹ️</span> Información General
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Promotora:</strong> {promoters.find(p => p.id === promotora)?.name}</p>
                            <p><strong>Cliente:</strong> {cliente}</p>
                          </div>
                        </div>

                        {/* Domicilio */}
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                            <span>🏠</span> Domicilio
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Dirección:</strong> {domicilio.calle} {domicilio.numero}</p>
                            <p><strong>Colonia:</strong> {domicilio.colonia}</p>
                            <p><strong>C.P.:</strong> {domicilio.cp}</p>
                            <p><strong>Tipo:</strong> {domicilio.tipoVivienda}</p>
                          </div>
                        </div>

                        {/* Ocupación */}
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                            <span>💼</span> Ocupación
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Actividad:</strong> {ocupacion.actividad}</p>
                            <p><strong>Empresa:</strong> {ocupacion.empresa}</p>
                            <p><strong>Ingresos:</strong> ${ocupacion.monto} {ocupacion.periodo}</p>
                            <p><strong>Antigüedad:</strong> {ocupacion.antiguedad}</p>
                          </div>
                        </div>

                        {/* Avales */}
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                          <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                            <span>🤝</span> Avales
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <p><strong>Aval 1:</strong> {avales.aval1.nombre}</p>
                              <p className="text-orange-600">({avales.aval1.parentesco})</p>
                            </div>
                            <div>
                              <p><strong>Aval 2:</strong> {avales.aval2.nombre}</p>
                              <p className="text-orange-600">({avales.aval2.parentesco})</p>
                            </div>
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
                                <p className="font-bold text-green-600">${garantia.montoGarantizado}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botón de envío */}
                      <div className="text-center pt-4">
                        <button
                          onClick={() => alert('¡Solicitud enviada exitosamente! 🎉')}
                          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200 flex items-center gap-3 mx-auto"
                        >
                          <span>🚀</span>
                          Enviar Solicitud
                        </button>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Controles de navegación */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                      currentStep === 1
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50 bg-white'
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
                            : 'bg-slate-300'
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
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
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

          {/* Modal de Garantías */}
          {modalGarantiaAbierto && garantiaSeleccionada !== null && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                        🔒
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          Garantía {garantiaSeleccionada + 1}
                        </h3>
                        <p className="text-sm text-slate-600">Complete la información del electrodoméstico</p>
                      </div>
                    </div>
                    <button
                      onClick={cerrarModalGarantia}
                      className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); guardarGarantia(); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">
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

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={cerrarModalGarantia}
                        className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Modal de vista previa */}
          {previewSrc && (
            <div 
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewSrc(null)}
            >
              <div 
                className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setPreviewSrc(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold transition-colors duration-200"
                >
                  ✕
                </button>
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}