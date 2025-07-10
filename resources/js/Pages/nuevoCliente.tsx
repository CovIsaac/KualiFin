import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, CloudArrowUpIcon, ExclamationTriangleIcon, UserIcon } from '@heroicons/react/24/outline';

// Datos simulados de clientes existentes
const clientesExistentes = [
  { 
    id: 1, 
    nombre: 'Juan Pérez López', 
    estado: 'activo', 
    montoCredito: 15000, 
    fechaUltimoCredito: '2024-01-15',
    telefono: '555-123-4567',
    curp: 'PELJ850315HDFRRN09'
  },
  { 
    id: 2, 
    nombre: 'Juan Carlos Mendoza', 
    estado: 'moroso', 
    montoCredito: 8500, 
    fechaUltimoCredito: '2023-11-20',
    telefono: '555-987-6543',
    curp: 'MECJ900822HDFRRL05'
  },
  { 
    id: 3, 
    nombre: 'Juana María Rodríguez', 
    estado: 'pagado', 
    montoCredito: 12000, 
    fechaUltimoCredito: '2023-08-10',
    telefono: '555-456-7890',
    curp: 'ROBJ880710MDFDRN02'
  },
  { 
    id: 4, 
    nombre: 'Ana García Martínez', 
    estado: 'activo', 
    montoCredito: 20000, 
    fechaUltimoCredito: '2024-02-01',
    telefono: '555-234-5678',
    curp: 'GAMA920405MDFRRN08'
  },
  { 
    id: 5, 
    nombre: 'Ana Sofía Hernández', 
    estado: 'moroso', 
    montoCredito: 7500, 
    fechaUltimoCredito: '2023-09-15',
    telefono: '555-345-6789',
    curp: 'HEAS950618MDFRRN01'
  },
  { 
    id: 6, 
    nombre: 'Roberto Silva Torres', 
    estado: 'pagado', 
    montoCredito: 18000, 
    fechaUltimoCredito: '2023-12-05',
    telefono: '555-567-8901',
    curp: 'SITR870925HDFRRB04'
  }
];

export default function NuevoCliente() {
  const [step, setStep] = useState<1>(1);
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof clientesExistentes[0] | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Cliente
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    fecha_nac: '',
    edad: '',
    sexo: '',
    estado_civil: '',
    curp: '',
    activo: true
  });
  const [clienteFiles, setClienteFiles] = useState<{ ine: File | null; curp: File | null; comprobante: File | null }>({
    ine: null,
    curp: null,
    comprobante: null,
  });

  const { data, setData, post } = useForm({
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    curp: '',
    fecha_nac: '',
    sexo: '',
    activo: true,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Filtrar clientes basado en la búsqueda
  const filteredClients = clientesExistentes.filter(client =>
    client.nombre.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  const inputBase =
    "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    target: 'cliente'
  ) {
    const { name } = e.target;
    const value = (e.target as HTMLInputElement).type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    if (target === 'cliente') {
      setCliente(c => ({ ...c, [name]: value }));
      if (['nombre', 'apellido_p', 'apellido_m', 'curp', 'fecha_nac', 'sexo', 'activo'].includes(name)) {
        setData(name as keyof typeof data, value);
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  const { name, files } = e.target;
  if (!files?.[0]) return;

  setClienteFiles(prev => ({
    ...prev,
    [name]: files[0]
  }));
}


  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);
    setCliente(c => ({ ...c, nombre: value }));
    setData('nombre', value);
    setShowSuggestions(value.length > 0);
    setSelectedClient(null);
  }

  function selectClient(client: typeof clientesExistentes[0]) {
    setSelectedClient(client);
    setCliente(c => ({ ...c, nombre: client.nombre }));
    setData('nombre', client.nombre);
    setSearchQuery(client.nombre);
    setShowSuggestions(false);
  }

  function clearSelection() {
    setSelectedClient(null);
    setSearchQuery('');
    setCliente(c => ({ ...c, nombre: '' }));
    setData('nombre', '');
    setShowSuggestions(false);
  }

  function handleSubmit() {
    if (
      !data.nombre ||
      !data.apellido_p ||
      !data.apellido_m ||
      !data.curp ||
      !data.fecha_nac ||
      !data.sexo
    ) {
      setErrorMessage('Todos los campos obligatorios deben llenarse');
      setSuccessMessage('');
      return;
    }

    const curpRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{8}$/;
    if (!curpRegex.test(data.curp)) {
      setErrorMessage('La CURP no tiene un formato válido');
      setSuccessMessage('');
      return;
    }

    post(route('clientes.store'), {
      onSuccess: () => {
        setSuccessMessage('Cliente registrado correctamente');
        setErrorMessage('');
      },
      onError: () => {
        setErrorMessage('Hubo un error al registrar el cliente');
        setSuccessMessage('');
      },
    });
  }

  // Formatear CURP en tiempo real
  function formatCURP(value: string) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18);
  }

  function getEstadoBadge(estado: string) {
    const configs = {
      activo: { 
        bg: 'bg-gradient-to-r from-blue-100 to-cyan-100', 
        text: 'text-blue-800', 
        border: 'border-blue-300',
        icon: '💳',
        label: 'Crédito Activo'
      },
      moroso: { 
        bg: 'bg-gradient-to-r from-red-100 to-pink-100', 
        text: 'text-red-800', 
        border: 'border-red-300',
        icon: '⚠️',
        label: 'Cliente Moroso'
      },
      pagado: { 
        bg: 'bg-gradient-to-r from-green-100 to-emerald-100', 
        text: 'text-green-800', 
        border: 'border-green-300',
        icon: '✅',
        label: 'Crédito Pagado'
      },
    };

    const config = configs[estado as keyof typeof configs];
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border-2 ${config.bg} ${config.text} ${config.border}`}>
        <span className="text-sm">{config.icon}</span>
        {config.label}
      </span>
    );
  }

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
                      <span className="animate-pulse">👤</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Datos del Cliente
                    </h1>
                    <p className="text-slate-600 font-medium text-lg mt-2">
                      Información personal y documentos
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

                {/* Indicadores de paso */}
                
              </div>
            </div>
          </motion.div>

          <form>
            <AnimatePresence mode='wait' initial={false}>
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
                        {/* Campo de búsqueda de nombre con autocompletado */}
                        <div className="sm:col-span-2 relative" ref={searchInputRef}>
                          <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-2">
                            Nombre completo<span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="nombre"
                              name="nombre"
                              value={searchQuery}
                              onChange={handleSearchChange}
                              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                              placeholder="Ej. Juan Pérez López (escriba para buscar clientes existentes)"
                              className={`${inputBase} ${selectedClient ? 'pr-12' : ''}`}
                            />
                            {selectedClient && (
                              <motion.button
                                type="button"
                                onClick={clearSelection}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 transition-colors duration-200"
                              >
                                ✕
                              </motion.button>
                            )}
                          </div>

                          {/* Sugerencias de autocompletado */}
                          <AnimatePresence>
                            {showSuggestions && filteredClients.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
                              >
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
                                  <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    Clientes encontrados ({filteredClients.length})
                                  </p>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                  {filteredClients.map((client, index) => (
                                    <motion.div
                                      key={client.id}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: index * 0.05 }}
                                      onClick={() => selectClient(client)}
                                      className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-300 border-b border-slate-100 last:border-b-0 group"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                          <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                                            {client.nombre}
                                          </h4>
                                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                                            <span>📞 {client.telefono}</span>
                                            <span>💰 ${client.montoCredito.toLocaleString()}</span>
                                            <span>📅 {client.fechaUltimoCredito}</span>
                                          </div>
                                        </div>
                                        <div className="ml-4">
                                          {getEstadoBadge(client.estado)}
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Alerta de cliente existente */}
                        <AnimatePresence>
                          {selectedClient && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                              className="sm:col-span-2"
                            >
                              <div className={`relative overflow-hidden rounded-2xl p-6 border-2 ${
                                selectedClient.estado === 'moroso' 
                                  ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300' 
                                  : selectedClient.estado === 'activo'
                                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300'
                                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                              } shadow-lg`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse"></div>
                                
                                <div className="relative z-10">
                                  <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                                      selectedClient.estado === 'moroso' 
                                        ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white' 
                                        : selectedClient.estado === 'activo'
                                        ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white'
                                        : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                                    }`}>
                                      {selectedClient.estado === 'moroso' ? '⚠️' : selectedClient.estado === 'activo' ? '💳' : '✅'}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className={`text-xl font-bold mb-2 ${
                                        selectedClient.estado === 'moroso' ? 'text-red-800' : 
                                        selectedClient.estado === 'activo' ? 'text-blue-800' : 'text-green-800'
                                      }`}>
                                        Cliente Existente Detectado
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <p className="font-semibold text-slate-700">Información del Cliente:</p>
                                          <p>📞 Teléfono: {selectedClient.telefono}</p>
                                          <p>🆔 CURP: {selectedClient.curp}</p>
                                        </div>
                                        <div>
                                          <p className="font-semibold text-slate-700">Historial Crediticio:</p>
                                          <p>💰 Último monto: ${selectedClient.montoCredito.toLocaleString()}</p>
                                          <p>📅 Fecha: {selectedClient.fechaUltimoCredito}</p>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        {getEstadoBadge(selectedClient.estado)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {selectedClient.estado === 'moroso' && (
                                    <div className="mt-4 p-4 bg-red-100/80 rounded-xl border border-red-200">
                                      <p className="text-red-800 font-semibold flex items-center gap-2">
                                        <ExclamationTriangleIcon className="w-5 h-5" />
                                        ¡ATENCIÓN! Este cliente tiene un estado moroso. Revise el historial antes de proceder.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div>
                          <label htmlFor="apellido_p" className="block text-sm font-semibold text-slate-700 mb-2">
                            Apellido Paterno<span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            id="apellido_p"
                            name="apellido_p"
                            value={cliente.apellido_p}
                            onChange={e => handleChange(e, 'cliente')}
                            placeholder="García"
                            className={inputBase}
                          />
                        </div>
                        <div>
                          <label htmlFor="apellido_m" className="block text-sm font-semibold text-slate-700 mb-2">
                            Apellido Materno<span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            id="apellido_m"
                            name="apellido_m"
                            value={cliente.apellido_m}
                            onChange={e => handleChange(e, 'cliente')}
                            placeholder="López"
                            className={inputBase}
                          />
                        </div>
                        <div>
                          <label htmlFor="fecha_nac" className="block text-sm font-semibold text-slate-700 mb-2">
                            Fecha de Nacimiento<span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            id="fecha_nac"
                            name="fecha_nac"
                            type="date"
                            value={cliente.fecha_nac}
                            onChange={e => handleChange(e, 'cliente')}
                            className={inputBase}
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="activo"
                            name="activo"
                            checked={cliente.activo}
                            onChange={e => handleChange(e, 'cliente')}
                            className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="activo" className="font-semibold text-slate-700">
                            Activo
                          </label>
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
                          onChange={e => {
                            handleChange(e, 'cliente');
                            setData('sexo', e.target.value);
                          }}
                          className={inputBase}
                        >
                            <option value="">Seleccione…</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                          </select>
                        </div>
                        <div>
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
                        <div>
                          <label htmlFor="curp" className="block text-sm font-semibold text-slate-700 mb-2">
                            CURP<span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            id="curp"
                            name="curp"
                          value={cliente.curp}
                          onChange={e => {
                            const formatted = formatCURP(e.target.value);
                            setCliente(c => ({ ...c, curp: formatted }));
                            setData('curp', formatted);
                          }}
                          placeholder="PELJ850315HDFRRN09"
                          maxLength={18}
                          className={inputBase}
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Formato: 18 caracteres (4 letras + 6 números + 8 caracteres)
                          </p>
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
                    onClick={() => window.history.back()}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  >
                    ← Cancelar
                  </motion.button>
                                    
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                  >
                    ✅ Guardar Cliente
                  </motion.button>
                  {successMessage && (
                    <p className="text-green-600 font-semibold mt-4">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-600 font-semibold mt-4">{errorMessage}</p>
                  )}

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