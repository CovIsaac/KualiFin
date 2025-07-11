import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrarEmpleado() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    rol: '',
    telefono: '',
    password: '',
    password_confirmation: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.password !== data.password_confirmation) return;

    post(route('register.user'), {
      onStart: () => setSuccess(false),
      onSuccess: () => {
        setSuccess(true);
        setData({
          name: '',
          email: '',
          rol: '',
          telefono: '',
          password: '',
          password_confirmation: '',
        });

        // Redirige tras 4 segundos si quieres (opcional)
        setTimeout(() => {
          setSuccess(false);
          // router.visit('/empleados'); // Descomenta si quieres redirigir
        }, 4000);
      },
      onError: () => {
        setSuccess(false);
      },
    });
  };



  const inputBase = `
    w-full border border-slate-300 rounded-xl px-4 py-3 shadow-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md placeholder-slate-400
  `;

  const puestos = [
    { value: 'promotor', label: 'Promotor', icon: '👩‍💼', color: 'from-blue-500 to-cyan-500' },
    { value: 'supervisor', label: 'Supervisor', icon: '👨‍💼', color: 'from-purple-500 to-violet-500' },
    { value: 'administrador', label: 'Administrador', icon: '🧑‍💻', color: 'from-orange-500 to-red-500' },
    { value: 'ejecutivo', label: 'Ejecutivo', icon: '👔', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <AnimatePresence>
          {success && (
            <motion.div
              key="success-toast"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative max-w-md w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-10 text-white text-center shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 animate-bounce">🎉</div>
                  <h2 className="text-2xl font-bold mb-2">¡Empleado Registrado!</h2>
                  {/* <p className="text-base text-green-100">Redirigiendo automáticamente...</p> */}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>



        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-2xl w-full space-y-8"
          autoComplete="off"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl shadow-xl animate-pulse">
              👨‍💼
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Registrar Empleado
              </h1>
              <p className="text-slate-600 font-medium text-lg">Agregar nuevo miembro al equipo</p>
            </div>
          </div>

          {/* Información Personal */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                👤
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Información Personal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">👤</span> Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Ej. Juan Pérez López"
                  className={`${inputBase} ${
                    focusedField === 'name' ? 'shadow-lg shadow-blue-500/20' : ''
                  } ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">📧</span> Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="usuario@empresa.com"
                  className={`${inputBase} ${
                    focusedField === 'email' ? 'shadow-lg shadow-purple-500/20' : ''
                  } ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">📞</span> Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={data.telefono}
                  maxLength={10}
                  onChange={e => setData('telefono', e.target.value)}
                  onFocus={() => setFocusedField('telefono')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="1234567890"
                  className={`${inputBase} ${
                    focusedField === 'telefono' ? 'shadow-lg shadow-green-500/20' : ''
                  } ${errors.telefono ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.telefono && <p className="mt-1 text-red-600 text-sm">{errors.telefono}</p>}
              </div>
            </div>
          </section>

          {/* Información Laboral */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                💼
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Información Laboral
              </h2>
            </div>

            <div>
              <label htmlFor="rol" className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="text-lg">🎯</span> Puesto de trabajo <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {puestos.map((puesto, index) => (
                  <motion.label
                    key={puesto.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 group ${
                      data.rol === puesto.value
                        ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg shadow-blue-200/50'
                        : 'border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-blue-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    <div className="relative z-10 flex items-center gap-3">
                      <input
                        type="radio"
                        name="rol"
                        value={puesto.value}
                        checked={data.rol === puesto.value}
                        onChange={e => setData('rol', e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all duration-300 bg-gradient-to-br ${puesto.color} text-white group-hover:scale-110`}
                      >
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
              {errors.rol && <p className="mt-1 text-red-600 text-sm">{errors.rol}</p>}
            </div>
          </section>

          {/* Seguridad */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                🔒
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Configuración de Seguridad
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <span className="text-lg">🔑</span> Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="••••••••"
                  className={`${inputBase} ${
                    focusedField === 'password' ? 'shadow-lg shadow-orange-500/20' : ''
                  } ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <span className="text-lg">🔐</span> Confirmar contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  onFocus={() => setFocusedField('password_confirmation')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="••••••••"
                  className={`${inputBase} ${focusedField === 'password_confirmation' ? 'shadow-lg shadow-red-500/20' : ''} ${
                    data.password_confirmation && data.password !== data.password_confirmation
                      ? 'border-red-500 focus:ring-red-500'
                      : ''
                  } ${
                    data.password_confirmation && data.password === data.password_confirmation
                      ? 'border-green-500 focus:ring-green-500'
                      : ''
                  }`}
                />
                {(data.password_confirmation && data.password !== data.password_confirmation) && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span>⚠️</span> Las contraseñas no coinciden
                  </p>
                )}
                {(data.password_confirmation && data.password === data.password_confirmation) && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <span>✅</span> Las contraseñas coinciden
                  </p>
                )}
              </div>
            </div>
          </section>
          <motion.div></motion.div>
          <button
            type="submit"
            disabled={processing || data.password !== data.password_confirmation}
            className={`w-full py-4 rounded-3xl font-black text-2xl transition-all duration-300 flex items-center justify-center gap-4 mx-auto shadow-2xl ${
              processing || data.password !== data.password_confirmation
                ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
            }`}
          >
            {processing ? (
              <>
                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registrando...
              </>
            ) : (
              <>
                <span className="text-3xl">👨‍💼</span>
                Registrar Empleado
              </>
            )}
          </button>
        </motion.form>
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
