import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function NuevoCliente() {
  const [form, setForm] = useState({
    checked: '',
    nombre: '',
    documento: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    ocupacion: '',
    empresa: '',
    ingresos: '',
    autorizoCreditos: false,
    aceptoTerminos: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Cliente - Sistema de Créditos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Registrar Nuevo Cliente
          </h1>
          <p className="text-slate-600">
            Completa los datos básicos para el perfil del cliente
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Guardar cliente - implementar lógica aquí');
            }}
          >
            {/* Datos Básicos */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                📝 Datos Básicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre completo */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Nombre completo <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Juan Pérez López"
                  />
                </div>

                {/* Documento de identidad */}
                <div>
                  <label
                    htmlFor="documento"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Documento (Cédula / DNI) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="documento"
                    name="documento"
                    value={form.documento}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0123456789"
                  />
                </div>

                {/* Fecha de nacimiento */}
                <div>
                  <label
                    htmlFor="fecha_nacimiento"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Fecha de nacimiento <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Contacto */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                📞 Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Teléfono */}
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Teléfono <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+52 555 123 4567"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Correo electrónico <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="cliente@ejemplo.com"
                  />
                </div>

                {/* Dirección */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="direccion"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Dirección completa <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Calle, número, colonia, ciudad, CP"
                  />
                </div>
              </div>
            </section>

            {/* Laborales */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                💼 Información Laboral
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ocupación */}
                <div>
                  <label
                    htmlFor="ocupacion"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Ocupación / Cargo
                  </label>
                  <input
                    id="ocupacion"
                    name="ocupacion"
                    value={form.ocupacion}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej. Ingeniero"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label
                    htmlFor="empresa"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Empresa / Empleador
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                {/* Ingresos */}
                <div>
                  <label
                    htmlFor="ingresos"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Ingresos mensuales
                  </label>
                  <input
                    id="ingresos"
                    name="ingresos"
                    type="number"
                    step="0.01"
                    value={form.ingresos}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </section>

            {/* Consentimientos */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                ✅ Consentimientos
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="autorizoCreditos"
                    checked={form.autorizoCreditos}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  Autorizo consulta a burós de crédito <span className="text-red-600">*</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="aceptoTerminos"
                    checked={form.aceptoTerminos}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  Acepto términos y condiciones <span className="text-red-600">*</span>
                </label>
              </div>
            </section>

            {/* Acciones */}
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
              >
                Guardar Cliente
              </button>
              <button
                type="button"
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-md font-medium transition"
                onClick={() => window.history.back()}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
