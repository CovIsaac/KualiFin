import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function NuevoCliente() {
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    sexo: '',
    estado_civil: '',
    ine: null as File | null,
    curp: null as File | null,
    comprobante: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  const inputBase =
    "w-full border border-slate-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Cliente - Sistema de Créditos" />

      {/* Aquí igualamos la anchura a max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">➕ Nuevo Cliente</h1>
          <p className="text-slate-600">
            Registre los datos básicos y documentos requeridos para iniciar el proceso de crédito.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitting(true);
            setTimeout(() => {
              alert('Cliente registrado correctamente');
              setSubmitting(false);
            }, 1500);
          }}
        >
          {/* Datos Básicos */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2 border-b border-blue-100 pb-2">
              <span className="text-xl">👤</span>
              Datos Básicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre completo <span className="text-red-600">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Juan Pérez López"
                  className={inputBase}
                />
              </div>
              <div>
                <label htmlFor="edad" className="block text-sm font-medium text-slate-700 mb-1">
                  Edad <span className="text-red-600">*</span>
                </label>
                <input
                  id="edad"
                  name="edad"
                  type="number"
                  min="18"
                  max="100"
                  value={form.edad}
                  onChange={handleChange}
                  required
                  placeholder="18"
                  className={inputBase}
                />
              </div>
              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-slate-700 mb-1">
                  Sexo <span className="text-red-600">*</span>
                </label>
                <select id="sexo" name="sexo" value={form.sexo} onChange={handleChange} required className={inputBase}>
                  <option value="">Seleccione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
              </div>
              <div>
                <label htmlFor="estado_civil" className="block text-sm font-medium text-slate-700 mb-1">
                  Estado Civil <span className="text-red-600">*</span>
                </label>
                <select
                  id="estado_civil"
                  name="estado_civil"
                  value={form.estado_civil}
                  onChange={handleChange}
                  required
                  className={inputBase}
                >
                  <option value="">Seleccione...</option>
                  <option value="soltero">Soltero</option>
                  <option value="casado">Casado</option>
                  <option value="union_libre">Unión Libre</option>
                  <option value="viudo">Viudo</option>
                  <option value="divorciado">Divorciado</option>
                </select>
              </div>
            </div>
          </section>

          {/* Documentos */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2 border-b border-blue-100 pb-2">
              <span className="text-xl">📎</span>
              Documentos Requeridos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['ine', 'curp', 'comprobante'] as const).map((key) => {
                const labelText =
                  key === 'ine'
                    ? 'INE'
                    : key === 'curp'
                    ? 'CURP'
                    : 'Comprobante de domicilio';
                return (
                  <div key={key} className="flex flex-col">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {labelText} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id={key}
                      name={key}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <label
                      htmlFor={key}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md cursor-pointer transition shadow-sm"
                    >
                      <span className="text-xl">📂</span>
                      <span className="text-sm font-medium text-slate-700">
                        {form[key]?.name || 'Seleccionar archivo'}
                      </span>
                    </label>
                    {form[key] && (
                      <p className="text-xs text-slate-500 mt-2 truncate">
                        {form[key]!.name}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Acciones */}
          <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-2 rounded-md font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-600 text-white px-6 py-2 rounded-md font-semibold transition shadow-md ${
                submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Guardando...' : 'Guardar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
