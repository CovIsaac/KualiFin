import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  });

  const [showError, setShowError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    setShowError(false);
    post(route('login'), {
      onError: () => setShowError(true),
      onFinish: () => reset('password'),
    });
  };

  const inputBase = "w-full border border-slate-300/50 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md placeholder-slate-400";

  return (
    <>
      <Head title="Iniciar sesión - Sistema de Créditos" />

      {/* Background con gradiente animado súper moderno */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center px-4">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Container principal súper moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Card principal con efectos de cristal */}
          <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/30 group">
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 p-8">
              {/* Header súper moderno */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-8"
              >
                {/* Logo con efectos */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-lg"></div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-xl"
                  >
                    <img 
                      src="/images/Logo.png" 
                      alt="Logo" 
                      className="h-12 w-auto object-contain filter brightness-0 invert" 
                    />
                  </motion.div>
                </div>

                {/* Status message */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl text-green-700 text-sm font-medium"
                    >
                      {status}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Formulario súper moderno */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                onSubmit={submit}
                className="space-y-6"
              >
                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="relative"
                >
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    <span className="text-lg">📧</span>
                    Correo electrónico
                  </label>
                  <div className="relative group">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="username"
                      placeholder="usuario@empresa.com"
                      className={`${inputBase} ${
                        errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                      } ${focusedField === 'email' ? 'shadow-lg shadow-blue-500/20' : ''}`}
                    />
                    {/* Efecto de brillo en focus */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                      focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 text-sm text-red-600 font-medium flex items-center gap-2"
                      >
                        <span className="text-base">⚠️</span>
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="relative"
                >
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    <span className="text-lg">🔒</span>
                    Contraseña
                  </label>
                  <div className="relative group">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={`${inputBase} ${
                        errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                      } ${focusedField === 'password' ? 'shadow-lg shadow-purple-500/20' : ''}`}
                    />
                    {/* Efecto de brillo en focus */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${
                      focusedField === 'password' ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 text-sm text-red-600 font-medium flex items-center gap-2"
                      >
                        <span className="text-base">⚠️</span>
                        {errors.password}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Remember & Forgot */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="flex items-center justify-between"
                >
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center text-sm cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={data.remember}
                      onChange={(e) => setData('remember', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                    />
                    <span className="ml-2 text-slate-700 font-medium group-hover:text-blue-600 transition-colors duration-200">
                      Recuérdame
                    </span>
                  </motion.label>
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                >
                  <motion.button
                    type="submit"
                    disabled={processing}
                    whileHover={{ scale: processing ? 1 : 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: processing ? 1 : 0.98 }}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                      processing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {processing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Iniciando sesión...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">🚀</span>
                        <span>Iniciar sesión</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                  {(errors.email || errors.password || showError) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-4 group"
                    >
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-100/0 via-red-100/20 to-red-100/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      <div className="relative z-10 text-center text-sm text-red-700 font-medium flex items-center justify-center gap-2">
                        <span className="text-base">❌</span>
                        <span>Usuario o contraseña incorrectos</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Footer decorativo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="mt-8 text-center"
              >
              </motion.div>
            </div>
          </div>

          {/* Elementos decorativos adicionales */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-sm opacity-60 animate-pulse"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-sm opacity-60 animate-pulse"
          />
        </motion.div>
      </div>

      {/* Estilos CSS adicionales */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}