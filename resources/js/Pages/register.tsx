import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrarEmpleado() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    puesto: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Helper para formatear teléfono
  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSuccess(true);
    setForm({ 
      nombre: '', 
      correo: '', 
      puesto: '', 
      telefono: '', 
      password: '', 
      confirmPassword: '' 
    });

    // Auto-reset después de 5 segundos
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const inputBase = "w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md placeholder-slate-400";

  const puestos = [
    { value: 'promotor', label: 'Promotor', icon: '👩‍💼', color: 'from-blue-500 to-cyan-500' },
    { value: 'supervisor', label: 'Supervisor', icon: '👨‍💼', color: 'from-purple-500 to-violet-500' },
    { value: 'administrador', label: 'Administrador', icon: '🧑‍💻', color: 'from-orange-500 to-red-500' },
    { value: 'gerente', label: 'Gerente', icon: '👔', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Registrar Empleado - Panel Administrativo" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      <span className="animate-pulse">👨‍💼</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Registrar Empleado
                    </h1>
                    <p className="text-slate-600 font-medium text-lg">
                      Agregar nuevo miembro al equipo de trabajo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {success ? (
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
                    ¡Empleado Registrado Exitosamente!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-xl text-green-100 mb-6"
                  >
                    El nuevo empleado ha sido agregado al sistema correctamente.
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
                className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Información Personal */}
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          👤
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          Información Personal
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre completo */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="md:col-span-2"
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">👤</span>
                            Nombre completo
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="text"
                              name="nombre"
                              value={form.nombre}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('nombre')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="Ej. Juan Pérez López"
                              className={`${inputBase} ${focusedField === 'nombre' ? 'shadow-lg shadow-blue-500/20' : ''}`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                              focusedField === 'nombre' ? 'opacity-100' : 'opacity-0'
                            }`}></div>
                          </div>
                        </motion.div>

                        {/* Correo electrónico */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">📧</span>
                            Correo electrónico
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="email"
                              name="correo"
                              value={form.correo}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('correo')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="usuario@empresa.com"
                              className={`${inputBase} ${focusedField === 'correo' ? 'shadow-lg shadow-purple-500/20' : ''}`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                              focusedField === 'correo' ? 'opacity-100' : 'opacity-0'
                            }`}></div>
                          </div>
                        </motion.div>

                        {/* Teléfono */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">📞</span>
                            Teléfono
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="tel"
                              name="telefono"
                              value={form.telefono}
                              onChange={(e) => {
                                const formatted = formatPhoneInput(e.target.value);
                                setForm(prev => ({ ...prev, telefono: formatted }));
                              }}
                              onFocus={() => setFocusedField('telefono')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="123-456-7890"
                              className={`${inputBase} ${focusedField === 'telefono' ? 'shadow-lg shadow-green-500/20' : ''}`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                              focusedField === 'telefono' ? 'opacity-100' : 'opacity-0'
                            }`}></div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.section>

                    {/* Información Laboral */}
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          💼
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Información Laboral
                        </h2>
                      </div>

                      {/* Puesto */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <span className="text-lg">🎯</span>
                          Puesto de trabajo
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {puestos.map((puesto, index) => (
                            <motion.label
                              key={puesto.value}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 group ${
                                form.puesto === puesto.value
                                  ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg shadow-blue-200/50'
                                  : 'border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-blue-300 hover:shadow-lg'
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                              
                              <div className="relative z-10 flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="puesto"
                                  value={puesto.value}
                                  checked={form.puesto === puesto.value}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all duration-300 bg-gradient-to-br ${puesto.color} text-white group-hover:scale-110`}>
                                  {puesto.icon}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800">{puesto.label}</p>
                                  <p className="text-sm text-slate-600">Rol en el sistema</p>
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </motion.div>
                    </motion.section>

                    {/* Seguridad */}
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                          🔒
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          Configuración de Seguridad
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contraseña */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">🔑</span>
                            Contraseña
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="password"
                              name="password"
                              value={form.password}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('password')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="••••••••"
                              className={`${inputBase} ${focusedField === 'password' ? 'shadow-lg shadow-orange-500/20' : ''}`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                              focusedField === 'password' ? 'opacity-100' : 'opacity-0'
                            }`}></div>
                          </div>
                        </motion.div>

                        {/* Confirmar contraseña */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.0 }}
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">🔐</span>
                            Confirmar contraseña
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="password"
                              name="confirmPassword"
                              value={form.confirmPassword}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('confirmPassword')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="••••••••"
                              className={`${inputBase} ${
                                focusedField === 'confirmPassword' ? 'shadow-lg shadow-red-500/20' : ''
                              } ${
                                form.confirmPassword && form.password !== form.confirmPassword 
                                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                  : form.confirmPassword && form.password === form.confirmPassword
                                  ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                                  : ''
                              }`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                              focusedField === 'confirmPassword' ? 'opacity-100' : 'opacity-0'
                            }`}></div>
                          </div>
                          {form.confirmPassword && form.password !== form.confirmPassword && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-2"
                            >
                              <span>⚠️</span>
                              Las contraseñas no coinciden
                            </motion.p>
                          )}
                          {form.confirmPassword && form.password === form.confirmPassword && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-green-600 flex items-center gap-2"
                            >
                              <span>✅</span>
                              Las contraseñas coinciden
                            </motion.p>
                          )}
                        </motion.div>
                      </div>
                    </motion.section>

                    {/* Botón de envío */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="text-center pt-6"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || form.password !== form.confirmPassword || !form.password}
                        whileHover={{ 
                          scale: isSubmitting || form.password !== form.confirmPassword || !form.password ? 1 : 1.05, 
                          boxShadow: isSubmitting || form.password !== form.confirmPassword || !form.password ? undefined : "0 20px 40px rgba(34, 197, 94, 0.4)" 
                        }}
                        whileTap={{ scale: isSubmitting || form.password !== form.confirmPassword || !form.password ? 1 : 0.98 }}
                        className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 mx-auto shadow-2xl ${
                          isSubmitting || form.password !== form.confirmPassword || !form.password
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
                            <span>Registrando empleado...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl">👨‍💼</span>
                            <span>Registrar Empleado</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
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