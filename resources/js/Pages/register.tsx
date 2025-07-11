import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrarEmpleado() {
  // Inertia useForm para manejar estado, envío y errores
  const { data, setData, post, processing, reset ,errors} = useForm({
    name: '',
    email: '',
    rol: '',
    telefono: '',
    password: '',
    password_confirmation: '',
  });
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Disparamos animación de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Helper para formatear teléfono con guiones
  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
  };

  const inputBase =
    'w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md placeholder-slate-400';

  const puestos = [
    { value: 'promotor',      label: 'Promotor',      icon: '👩‍💼', color: 'from-blue-500 to-cyan-500' },
    { value: 'supervisor',    label: 'Supervisor',    icon: '👨‍💼', color: 'from-purple-500 to-violet-500' },
    { value: 'administrador', label: 'Administrador', icon: '🧑‍💻', color: 'from-orange-500 to-red-500' },
    { value: 'ejecutivo',     label: 'Ejecutivo',     icon: '👔',    color: 'from-green-500 to-emerald-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('users.store'), {
      onSuccess: () => {
        setSuccess(true);
        reset('name','email','rol','telefono','password','password_confirmation');
        setTimeout(() => setSuccess(false), 5000);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Registrar Empleado – Panel Administrativo" />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Fondos animados */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
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
              /* Mensaje de éxito */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-12 text-white text-center shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.5 }}
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
                    <div className="w-6 h-6 border-2 border-green-200 border-t-transparent rounded-full animate-spin" />
                    <span>Redirigiendo automáticamente...</span>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* Formulario */
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
                            Nombre completo<span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="text"
                              name="name"
                              value={data.name}
                              onChange={e => setData('name', e.target.value)}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="Ej. Juan Pérez López"
                              className={`${inputBase} ${focusedField === 'name' ? 'shadow-lg shadow-blue-500/20' : ''}`}
                            />
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
                            Correo electrónico<span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="email"
                              name="email"
                              value={data.email}
                              onChange={e => setData('email', e.target.value)}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="usuario@empresa.com"
                              className={` ${inputBase}  ${focusedField === 'email' ? 'shadow-lg shadow-purple-500/20' : ''} ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}/>
                              {errors.email && (
                              <p className="mt-2 text-sm text-red-600">
                                {errors.email}
                              </p>
                              )}
                          </div>
                        </motion.div>
                        {/* Teléfono */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">📞</span> Teléfono
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="tel"
                              name="telefono"
                              value={data.telefono}
                              onChange={e => setData('telefono', formatPhoneInput(e.target.value))}
                              onFocus={() => setFocusedField('telefono')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="123-456-7890"
                              className={`${inputBase} ${focusedField === 'telefono' ? 'shadow-lg shadow-green-500/20' : ''}`}
                            />
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
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <span className="text-lg">🎯</span> Puesto de trabajo<span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {puestos.map((p, idx) => (
                            <motion.label
                              key={p.value}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 group ${
                                data.rol === p.value
                                  ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50'
                                  : 'border-slate-200 bg-white hover:border-blue-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="rol"
                                value={p.value}
                                checked={data.rol === p.value}
                                onChange={e => setData('rol', e.target.value)}
                                className="sr-only"
                                required
                              />
                              {/* Icon container ajustado al diseño */}
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gradient-to-br ${p.color} text-white`}>
                                {p.icon}
                              </div>
                              <div className="mt-2">
                                <p className="font-bold text-slate-800">{p.label}</p>
                                <p className="text-sm text-slate-600">Rol en el sistema</p>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </motion.div>
                    </motion.section>

                    {/* Configuración de Seguridad */}
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
                            <span className="text-lg">🔑</span> Contraseña<span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="password"
                              name="password"
                              value={data.password}
                              onChange={e => setData('password', e.target.value)}
                              onFocus={() => setFocusedField('password')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="••••••••"
                              className={`${inputBase} ${focusedField === 'password' ? 'shadow-lg shadow-orange-500/20' : ''}`}
                            />
                          </div>
                        </motion.div>
                        {/* Confirmar contraseña */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.0 }}
                        >
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span className="text-lg">🔐</span> Confirmar contraseña<span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="password"
                              name="password_confirmation"
                              value={data.password_confirmation}
                              onChange={e => setData('password_confirmation', e.target.value)}
                              onFocus={() => setFocusedField('password_confirmation')}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder="••••••••"
                              className={`${inputBase} ${focusedField === 'password_confirmation' ? 'shadow-lg shadow-red-500/20' : ''}`}
                            />
                          </div>
                          {data.password_confirmation && data.password !== data.password_confirmation && (
                            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-600 flex items-center gap-2">
                              <span>⚠️</span> Las contraseñas no coinciden
                            </motion.p>
                          )}
                          {data.password_confirmation && data.password === data.password_confirmation && (
                            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-green-600 flex items-center gap-2">
                              <span>✅</span> Las contraseñas coinciden
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
                        disabled={processing}
                        whileHover={{
                          scale: processing ? 1 : 1.05,
                          boxShadow: processing ? undefined : '0 20px 40px rgba(34,197,94,0.4)',
                        }}
                        whileTap={{ scale: processing ? 1 : 0.98 }}
                        className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 mx-auto shadow-2xl ${
                          processing
                            ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                        }`}
                      >
                        {processing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full"
                            />
                            Registrando empleado...
                          </>
                        ) : (
                          <>
                            <span className="text-2xl">👨‍💼</span> Registrar Empleado
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </AuthenticatedLayout>
  );
}
