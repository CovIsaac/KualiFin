import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function NuevoCliente() {
  const [form, setForm] = useState({
    // Datos Básicos
    nombre: '',
    edad: '',
    sexo: '',
    estado_civil: '',
    
    // Domicilio
    calle: '',
    numero_exterior: '',
    numero_interior: '',
    colonia: '',
    codigo_postal: '',
    tipo_vivienda: '',
    municipio: '',
    estado: '',
    tiempo_residencia: '',
    monto_renta_credito: '',
    
    // Contacto
    telefono_fijo: '',
    telefono_celular: '',
    email: '',
    
    // Información Laboral
    ocupacion: '',
    telefono_trabajo: '',
    nombre_empresa: '',
    antiguedad: '',
    calle_trabajo: '',
    numero_trabajo: '',
    colonia_trabajo: '',
    municipio_trabajo: '',
    familiar_con_credito: '',
    monto_percibe: '',
    frecuencia_pago: '',
    
    // Ingresos Adicionales
    tiene_ingresos_adicionales: false,
    concepto_adicional: '',
    monto_adicional: '',
    frecuencia_adicional: '',
    
    // Consentimientos
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

  // Función para manejar el toggle de ingresos adicionales
  function handleIngresosAdicionalesToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setForm((prev) => ({
      ...prev,
      tiene_ingresos_adicionales: checked,
      // Limpiar campos si se desactiva
      concepto_adicional: checked ? prev.concepto_adicional : '',
      monto_adicional: checked ? prev.monto_adicional : '',
      frecuencia_adicional: checked ? prev.frecuencia_adicional : '',
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
            Completa todos los datos del cliente para crear su perfil
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              
              // Validación especial para ocupación
              if (!form.ocupacion.trim()) {
                alert('⚠️ ATENCIÓN: La ocupación es obligatoria. Sin este dato el crédito será CANCELADO.');
                return;
              }
              
              alert('Guardar cliente - implementar lógica aquí');
            }}
          >
            {/* Datos Básicos */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">👤</span>
                Datos Básicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Nombre completo */}
                <div className="md:col-span-2">
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

                {/* Edad */}
                <div>
                  <label
                    htmlFor="edad"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
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
                    placeholder="25"
                  />
                </div>

                {/* Sexo */}
                <div>
                  <label
                    htmlFor="sexo"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
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

                {/* Estado Civil */}
                <div>
                  <label
                    htmlFor="estado_civil"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
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

            {/* Domicilio */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🏠</span>
                Domicilio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Calle */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="calle"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Calle <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="calle"
                    name="calle"
                    value={form.calle}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Av. Insurgentes Sur"
                  />
                </div>

                {/* Número Exterior */}
                <div>
                  <label
                    htmlFor="numero_exterior"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    No. Exterior <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="numero_exterior"
                    name="numero_exterior"
                    value={form.numero_exterior}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123"
                  />
                </div>

                {/* Número Interior */}
                <div>
                  <label
                    htmlFor="numero_interior"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    No. Interior
                  </label>
                  <input
                    id="numero_interior"
                    name="numero_interior"
                    value={form.numero_interior}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="A"
                  />
                </div>

                {/* Colonia */}
                <div>
                  <label
                    htmlFor="colonia"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Colonia <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="colonia"
                    name="colonia"
                    value={form.colonia}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Del Valle"
                  />
                </div>

                {/* Código Postal */}
                <div>
                  <label
                    htmlFor="codigo_postal"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    C.P. <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="codigo_postal"
                    name="codigo_postal"
                    value={form.codigo_postal}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{5}"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="03100"
                  />
                </div>

                {/* Tipo de Vivienda */}
                <div>
                  <label
                    htmlFor="tipo_vivienda"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Tipo de Vivienda <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="tipo_vivienda"
                    name="tipo_vivienda"
                    value={form.tipo_vivienda}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccione...</option>
                    <option value="propia">Propia</option>
                    <option value="rentada">Rentada</option>
                    <option value="familiar">Familiar</option>
                  </select>
                </div>

                {/* Municipio */}
                <div>
                  <label
                    htmlFor="municipio"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Municipio <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="municipio"
                    name="municipio"
                    value={form.municipio}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Benito Juárez"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Estado <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ciudad de México"
                  />
                </div>

                {/* Tiempo en Residencia */}
                <div>
                  <label
                    htmlFor="tiempo_residencia"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Tiempo en Residencia (años) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="tiempo_residencia"
                    name="tiempo_residencia"
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.tiempo_residencia}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2.5"
                  />
                </div>

                {/* Monto Renta/Crédito */}
                <div>
                  <label
                    htmlFor="monto_renta_credito"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Monto Mensual Renta/Crédito
                  </label>
                  <input
                    id="monto_renta_credito"
                    name="monto_renta_credito"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.monto_renta_credito}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8000.00"
                  />
                </div>
              </div>
            </section>

            {/* Contacto */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📞</span>
                Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Teléfono Fijo */}
                <div>
                  <label
                    htmlFor="telefono_fijo"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Teléfono Fijo
                  </label>
                  <input
                    id="telefono_fijo"
                    name="telefono_fijo"
                    type="tel"
                    value={form.telefono_fijo}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="55 1234 5678"
                  />
                </div>

                {/* Teléfono Celular */}
                <div>
                  <label
                    htmlFor="telefono_celular"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Teléfono Celular <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="telefono_celular"
                    name="telefono_celular"
                    type="tel"
                    value={form.telefono_celular}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="55 9876 5432"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="cliente@ejemplo.com"
                  />
                </div>
              </div>
            </section>

            {/* Información Laboral */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">💼</span>
                Información Laboral
              </h2>
              
              {/* Alerta sobre ocupación */}
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 text-lg">⚠️</span>
                  <p className="text-sm text-red-800 font-medium">
                    <strong>IMPORTANTE:</strong> La ocupación es obligatoria. En caso de no especificar, el crédito será <strong>CANCELADO</strong>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Ocupación */}
                <div>
                  <label
                    htmlFor="ocupacion"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Ocupación <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="ocupacion"
                    name="ocupacion"
                    value={form.ocupacion}
                    onChange={handleChange}
                    required
                    className="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Ej: Ingeniero, Contador, Vendedor..."
                  />
                </div>

                {/* Teléfono del Trabajo */}
                <div>
                  <label
                    htmlFor="telefono_trabajo"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Teléfono del Trabajo <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="telefono_trabajo"
                    name="telefono_trabajo"
                    type="tel"
                    value={form.telefono_trabajo}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="55 1234 5678"
                  />
                </div>

                {/* Nombre de la Empresa */}
                <div>
                  <label
                    htmlFor="nombre_empresa"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Nombre de la Empresa <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nombre_empresa"
                    name="nombre_empresa"
                    value={form.nombre_empresa}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                {/* Antigüedad */}
                <div>
                  <label
                    htmlFor="antiguedad"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Antigüedad (años) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="antiguedad"
                    name="antiguedad"
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.antiguedad}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2.5"
                  />
                </div>

                {/* Familiar con Crédito */}
                <div>
                  <label
                    htmlFor="familiar_con_credito"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    ¿Familiar con Crédito? <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="familiar_con_credito"
                    name="familiar_con_credito"
                    value={form.familiar_con_credito}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccione...</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Monto que Percibe */}
                <div>
                  <label
                    htmlFor="monto_percibe"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Monto que Percibe <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="monto_percibe"
                    name="monto_percibe"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.monto_percibe}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="15000.00"
                  />
                </div>

                {/* Frecuencia de Pago */}
                <div>
                  <label
                    htmlFor="frecuencia_pago"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Frecuencia de Pago <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="frecuencia_pago"
                    name="frecuencia_pago"
                    value={form.frecuencia_pago}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccione...</option>
                    <option value="semanal">Semanal</option>
                    <option value="quincenal">Quincenal</option>
                    <option value="mensual">Mensual</option>
                  </select>
                </div>
              </div>

              {/* Domicilio Secundario (Trabajo) */}
              <div className="mt-6">
                <h3 className="text-md font-medium text-slate-700 mb-4">Domicilio del Trabajo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Calle y Número del Trabajo */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="calle_trabajo"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Calle y Número <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="calle_trabajo"
                      name="calle_trabajo"
                      value={form.calle_trabajo}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Av. Reforma 123"
                    />
                  </div>

                  {/* Colonia del Trabajo */}
                  <div>
                    <label
                      htmlFor="colonia_trabajo"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Colonia <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="colonia_trabajo"
                      name="colonia_trabajo"
                      value={form.colonia_trabajo}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Centro"
                    />
                  </div>

                  {/* Municipio del Trabajo */}
                  <div>
                    <label
                      htmlFor="municipio_trabajo"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Municipio <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="municipio_trabajo"
                      name="municipio_trabajo"
                      value={form.municipio_trabajo}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Cuauhtémoc"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Ingresos Adicionales */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">💰</span>
                Ingresos Adicionales
              </h2>
              
              {/* Toggle para ingresos adicionales */}
              <div className="mb-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="tiene_ingresos_adicionales"
                    checked={form.tiene_ingresos_adicionales}
                    onChange={handleIngresosAdicionalesToggle}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    ¿Tiene ingresos adicionales?
                  </span>
                </label>
              </div>

              {/* Campos de ingresos adicionales (solo si está activado) */}
              {form.tiene_ingresos_adicionales && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                  {/* Concepto */}
                  <div>
                    <label
                      htmlFor="concepto_adicional"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Concepto <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="concepto_adicional"
                      name="concepto_adicional"
                      value={form.concepto_adicional}
                      onChange={handleChange}
                      required={form.tiene_ingresos_adicionales}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Freelance, Renta, Comisiones..."
                    />
                  </div>

                  {/* Monto Adicional */}
                  <div>
                    <label
                      htmlFor="monto_adicional"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Monto <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="monto_adicional"
                      name="monto_adicional"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.monto_adicional}
                      onChange={handleChange}
                      required={form.tiene_ingresos_adicionales}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="5000.00"
                    />
                  </div>

                  {/* Frecuencia Adicional */}
                  <div>
                    <label
                      htmlFor="frecuencia_adicional"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Frecuencia <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="frecuencia_adicional"
                      name="frecuencia_adicional"
                      value={form.frecuencia_adicional}
                      onChange={handleChange}
                      required={form.tiene_ingresos_adicionales}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Seleccione...</option>
                      <option value="semanal">Semanal</option>
                      <option value="quincenal">Quincenal</option>
                      <option value="mensual">Mensual</option>
                      <option value="eventual">Eventual</option>
                    </select>
                  </div>
                </div>
              )}

              {!form.tiene_ingresos_adicionales && (
                <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    Los campos de ingresos adicionales están cancelados (no aplican)
                  </p>
                </div>
              )}
            </section>

            {/* Consentimientos */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span>
                Consentimientos
              </h2>
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="autorizoCreditos"
                    checked={form.autorizoCreditos}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm text-slate-700">
                    Autorizo consulta a burós de crédito y verificación de información <span className="text-red-600">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="aceptoTerminos"
                    checked={form.aceptoTerminos}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm text-slate-700">
                    Acepto términos y condiciones del servicio <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>
            </section>

            {/* Acciones */}
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