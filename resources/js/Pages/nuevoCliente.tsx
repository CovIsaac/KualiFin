import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useNuevoCliente } from '@/Hooks/useNuevoCliente'; // ajusta la ruta según corresponda

export default function NuevoCliente() {
  const {
  form,
  submitting,
  dragOver,
  setDragOver,
  handleChange,
  handleDrop,
  setSubmitting,
  handleSubmit, // <--- Asegúrate de incluir esto
  successMessage,
  errorMessage,
} = useNuevoCliente();


  // Mantengo tus clases originales intactas
  const inputBase = `
    w-full border border-slate-200/60 rounded-xl px-4 py-3 text-slate-700 
    bg-white/80 backdrop-blur-sm shadow-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
    hover:border-slate-300 hover:shadow-md hover:bg-white/90
    transition-all duration-300 placeholder-slate-400
    font-medium
  `;

  const selectBase = `
    w-full border border-slate-200/60 rounded-xl px-4 py-3 text-slate-700 
    bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
    hover:border-slate-300 hover:shadow-md hover:bg-white/90
    transition-all duration-300 font-medium
  `;

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Cliente - Sistema de Créditos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header y sección Datos Básicos igual */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl"></div>

          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                  <span className="animate-pulse">👤</span>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Nuevo Cliente
                </h1>
                <p className="text-slate-600 font-medium text-lg">
                  Registre los datos básicos y documentos requeridos para iniciar el proceso de crédito
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-200/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Aquí tu formulario sin cambiar nada de estructura */}
        <form onSubmit={(handleSubmit)}className="space-y-8">
          {successMessage && (
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl shadow mb-6">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl shadow mb-6">
              {errorMessage}
            </div>
)}

          {/* Datos Básicos */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-3xl"></div>

            <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-blue-500/10 p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gradient-to-r from-blue-200/50 to-purple-200/50">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                    👤
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Datos Básicos
                  </h2>
                  <p className="text-slate-600 font-medium">Información personal del cliente</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 group">
                  <label htmlFor="nombre" className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                    Nombre completo <span className="text-red-500 animate-pulse">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Juan Pérez López"
                      className={`${inputBase} group-hover:shadow-lg group-hover:scale-[1.02]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="edad" className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></span>
                    Edad <span className="text-red-500 animate-pulse">*</span>
                  </label>
                  <div className="relative">
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
                      className={`${inputBase} group-hover:shadow-lg group-hover:scale-[1.02]`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm font-medium">
                      años
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="sexo" className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></span>
                    Sexo <span className="text-red-500 animate-pulse">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="sexo"
                      name="sexo"
                      value={form.sexo}
                      onChange={handleChange}
                      required
                      className={`${selectBase} group-hover:shadow-lg group-hover:scale-[1.02]`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2 group">
                  <label htmlFor="estado_civil" className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></span>
                    Estado Civil <span className="text-red-500 animate-pulse">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="estado_civil"
                      name="estado_civil"
                      value={form.estado_civil}
                      onChange={handleChange}
                      required
                      className={`${selectBase} group-hover:shadow-lg group-hover:scale-[1.02]`}
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
              </div>
            </div>
          </section>

          {/* Documentos */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-3xl"></div>

            <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-orange-500/10 p-8 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gradient-to-r from-orange-200/50 to-amber-200/50">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                    📎
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Documentos Requeridos
                  </h2>
                  <p className="text-slate-600 font-medium">Adjunte los documentos necesarios</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(['ine', 'curp', 'comprobante'] as const).map((key, index) => {
                  const labelText =
                    key === 'ine'
                      ? 'INE'
                      : key === 'curp'
                      ? 'CURP'
                      : 'Comprobante de domicilio';

                  const gradients = [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-pink-500',
                    'from-green-500 to-emerald-500',
                  ];

                  const bgGradients = [
                    'from-blue-50 to-cyan-50',
                    'from-purple-50 to-pink-50',
                    'from-green-50 to-emerald-50',
                  ];

                  return (
                    <div key={key} className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <span className={`w-2 h-2 bg-gradient-to-r ${gradients[index]} rounded-full`}></span>
                        {labelText} <span className="text-red-500 animate-pulse">*</span>
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
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(key);
                        }}
                        onDragLeave={() => setDragOver(null)}
                        onDrop={(e) => handleDrop(e, key)}
                        className={`
                          relative block w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer 
                          transition-all duration-300 overflow-hidden group-hover:scale-105
                          ${
                            dragOver === key
                              ? `border-blue-500 bg-gradient-to-br ${bgGradients[index]} scale-105`
                              : form[key]
                              ? `border-green-500 bg-gradient-to-br from-green-50 to-emerald-50`
                              : `border-slate-300 bg-gradient-to-br ${bgGradients[index]} hover:border-slate-400`
                          }
                        `}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        ></div>

                        <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                          {form[key] ? (
                            <>
                              <div
                                className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center text-white text-2xl mb-2 shadow-lg animate-bounce`}
                              >
                                ✓
                              </div>
                              <p className="text-sm font-bold text-slate-700 truncate w-full">
                                {form[key]!.name}
                              </p>
                              <p className="text-xs text-green-600 font-medium">
                                Archivo cargado
                              </p>
                            </>
                          ) : (
                            <>
                              <div
                                className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center text-white text-2xl mb-2 shadow-lg group-hover:animate-pulse`}
                              >
                                📂
                              </div>
                              <p className="text-sm font-bold text-slate-700 mb-1">
                                Seleccionar archivo
                              </p>
                              <p className="text-xs text-slate-500 font-medium">o arrastra aquí</p>
                            </>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Acciones */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>
            <div className="relative flex flex-col sm:flex-row justify-end gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="group relative px-8 py-3 border-2 border-slate-300 text-slate-700 hover:text-slate-800 rounded-xl font-bold transition-all duration-300 hover:border-slate-400 hover:shadow-lg hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <span>↩️</span>Cancelar
                </span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className={`
                  group relative px-8 py-3 rounded-xl font-bold transition-all duration-300 overflow-hidden
                  ${
                    submitting
                      ? 'bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105'
                  }
                  text-white shadow-xl
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <span className="relative flex items-center gap-2">
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <span>💾</span>Guardar Cliente
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
