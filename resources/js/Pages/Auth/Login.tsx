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
      <Head title="Login - Sistema de Créditos" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8 flex flex-col items-center">
          <div className="w-30 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700 mb-6">
            KualiFin
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Iniciar sesión
          </h2>

          {status && (
            <div className="mb-4 text-sm text-green-600">{status}</div>
          )}

          <form onSubmit={submit} className="w-full flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-700 mb-1 mt-4">
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
              className={`border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.email && (
              <div className="text-red-600 text-sm mt-1">{errors.email}</div>
            )}

            <label htmlFor="password" className="text-sm text-gray-700 mb-1 mt-4">
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
              className={`border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.password && (
              <div className="text-red-600 text-sm mt-1">{errors.password}</div>
            )}

            {canResetPassword && (
              <div className="text-right mt-3">
                <Link
                  href={route('password.request')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition-colors duration-200"
            >
              Entrar
            </button>

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
