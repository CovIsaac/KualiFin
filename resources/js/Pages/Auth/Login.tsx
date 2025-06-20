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

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          {/* Logo/Header */}
          <div className="mb-6 text-center">
            <div className="inline-block mb-2">
              <span className="text-3xl font-bold text-blue-600">KualiFin</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">Iniciar sesión</h2>
            {status && (
              <div className="mt-2 text-sm text-green-600">{status}</div>
            )}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
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
                className={`w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.email && (
                <div className="mt-1 text-sm text-red-600">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                autoComplete="current-password"
                placeholder="********"
                className={`w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.password && (
                <div className="mt-1 text-sm text-red-600">{errors.password}</div>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-slate-700">Recuérdame</span>
              </label>
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
            >
              Entrar
            </button>

            {/* Error */}
            {(errors.email || errors.password || showError) && (
              <div className="mt-4 text-center text-sm text-red-700 bg-red-100 border border-red-300 rounded-md px-4 py-3">
                Usuario o contraseña incorrectos.
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
