// resources/js/Pages/Users/RegisterUserForm.tsx
import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RegisterUserForm() {
  // 1) Capturamos el flash de Inertia (puede ser undefined)
  const page = usePage<{ flash?: { success?: string } }>();
  const flashSuccess = page.props.flash?.success;

  // 2) Estado local para pantalla de éxito
  const [successLocal, setSuccessLocal] = useState(false);

  // 3) useForm de Inertia para manejar datos, envío y errores
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    rol: '',
    telefono: '',
    password: '',
    password_confirmation: '',
  });

  // 4) Disparamos un alert cuando recibimos flash.success del backend
  useEffect(() => {
    if (flashSuccess) {
      alert(flashSuccess);
    }
  }, [flashSuccess]);

  // 5) Formateo de teléfono: 123-456-7890
  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0,3)}-${digits.slice(3)}`;
    return digits;
  };

  const puestos = [
    { value: 'promotor',      label: 'Promotor',      icon: '👩‍💼' },
    { value: 'supervisor',    label: 'Supervisor',    icon: '👨‍💼' },
    { value: 'administrador', label: 'Administrador', icon: '🧑‍💻' },
    { value: 'ejecutivo',     label: 'Ejecutivo',     icon: '👔' },
  ];

  // 6) Manejador de envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('register.user'), {
      onSuccess: () => {
        setSuccessLocal(true);
        reset('name','email','rol','telefono','password','password_confirmation');
        setTimeout(() => setSuccessLocal(false), 5000);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Registrar Empleado – Panel Administrativo" />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Pantalla de éxito local */}
          {successLocal ? (
            <div className="bg-green-500 rounded-lg p-12 text-white text-center shadow-lg">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold mb-4">
                ¡Empleado Registrado Exitosamente!
              </h2>
              <p className="text-xl text-green-100 mb-6">
                El nuevo empleado ha sido agregado al sistema correctamente.
              </p>
              <div className="flex items-center justify-center gap-3 text-green-200">
                <div className="w-6 h-6 border-2 border-green-200 border-t-transparent rounded-full animate-spin" />
                <span>Redirigiendo automáticamente...</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border">
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Información Personal */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">👤</div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Información Personal
                      </h2>
                      <p className="text-gray-600">Datos básicos del empleado</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre completo */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                        placeholder="Ej. Juan Pérez López"
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Correo electrónico */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo electrónico<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        required
                        placeholder="usuario@empresa.com"
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={data.telefono}
                        onChange={e =>
                          setData('telefono', formatPhoneInput(e.target.value))
                        }
                        placeholder="123-456-7890"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                      />
                      {errors.telefono && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.telefono}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información Laboral */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">💼</div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Información Laboral
                      </h2>
                      <p className="text-gray-600">Rol y responsabilidades</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Puesto de trabajo<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {puestos.map(puesto => (
                        <label
                          key={puesto.value}
                          className={`relative rounded-lg p-4 cursor-pointer transition-colors duration-200 border-2 ${
                            data.rol === puesto.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 bg-white hover:border-blue-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="rol"
                            value={puesto.value}
                            checked={data.rol === puesto.value}
                            onChange={e => setData('rol', e.target.value)}
                            className="sr-only"
                            required
                          />
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                              {puesto.icon}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {puesto.label}
                              </p>
                              <p className="text-sm text-gray-600">
                                Rol en el sistema
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.rol && (
                      <p className="mt-2 text-sm text-red-600">{errors.rol}</p>
                    )}
                  </div>
                </div>

                {/* Configuración de Seguridad */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">🔒</div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Configuración de Seguridad
                      </h2>
                      <p className="text-gray-600">
                        Credenciales de acceso
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contraseña */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        required
                        placeholder="••••••••"
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.password
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    {/* Confirmar contraseña */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar contraseña<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Botón de envío */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={processing}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-3 mx-auto ${
                      processing
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        Registrando empleado...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">👨‍💼</span>
                        Registrar Empleado
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
