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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Cliente - Sistema de Créditos" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Registrar Nuevo Cliente
          </h1>
          <p className="text-slate-600">
            Complete los datos básicos del cliente y adjunte la documentación requerida
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Guardar cliente - implementar lógica aquí');
            }}
          >
            {/* Datos Básicos */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
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
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="sexo" className="block text-sm font-medium text-slate-700 mb-1">
                    Sexo <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="sexo"
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
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
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📎</span>
                Documentos
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ine" className="block text-sm font-medium text-slate-700 mb-1">
                    INE <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="ine"
                    name="ine"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="curp" className="block text-sm font-medium text-slate-700 mb-1">
                    CURP <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="curp"
                    name="curp"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="comprobante" className="block text-sm font-medium text-slate-700 mb-1">
                    Comprobante de Domicilio <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="comprobante"
                    name="comprobante"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-slate-200">
              <button
                type="button"
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-md font-medium transition-colors duration-200"
                onClick={() => window.history.back()}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Guardar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
