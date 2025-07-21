import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

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

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    setShowError(false);
    post(route('login'), {
      onError: () => setShowError(true),
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      <Head title="Iniciar sesión - Sistema de Créditos" />

      {/* Background simple y limpio */}
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        {/* Container principal */}
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Logo */}
              <div className="inline-block mb-6">
                <div className="bg-blue-600 rounded-xl p-4 shadow-md">
                  <img 
                    src="/images/Logo.png" 
                    alt="Logo" 
                    className="h-12 w-auto object-contain filter brightness-0 invert" 
                  />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-blue-600 mb-2">
                KualiFin
              </h1>
              <p className="text-slate-600 font-medium">
                Bienvenido al sistema de créditos
              </p>

              {/* Status message */}
              {status && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                  {status}
                </div>
              )}
            </div>

            {/* Formulario */}
            <form onSubmit={submit} className="space-y-6">
              {/* Email field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <span>📧</span>
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="usuario@empresa.com"
                  className={`w-full border rounded-xl px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                />
                {errors.email && (
                  <div className="mt-2 text-sm text-red-600 font-medium flex items-center gap-2">
                    <span>⚠️</span>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <span>🔒</span>
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full border rounded-xl px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                />
                {errors.password && (
                  <div className="mt-2 text-sm text-red-600 font-medium flex items-center gap-2">
                    <span>⚠️</span>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-slate-700 font-medium">
                    Recuérdame
                  </span>
                </label>
                {canResetPassword && (
                  <Link
                    href={route('password.request')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={processing}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-md flex items-center justify-center gap-3 ${
                  processing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Iniciar sesión</span>
                  </>
                )}
              </button>

              {/* Error message */}
              {(errors.email || errors.password || showError) && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="text-center text-sm text-red-700 font-medium flex items-center justify-center gap-2">
                    <span>❌</span>
                    <span>Usuario o contraseña incorrectos</span>
                  </div>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <span>🔐</span>
                <span>Conexión segura y encriptada</span>
                <span>🔐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}