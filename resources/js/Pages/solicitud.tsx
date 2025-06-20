import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Solicitud() {
  const [form, setForm] = useState({
    cliente_id: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    ocupacion: '',
    empresa: '',
    ingresos: '',
    tiempo_trabajo: '',
    direccion_trabajo: '',
    monto_solicitado: '',
    plazo: '',
    proposito: '',
    ref1_nombre: '',
    ref1_telefono: '',
    ref2_nombre: '',
    ref2_telefono: '',
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nueva Solicitud de Crédito - Sistema de Créditos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Nueva Solicitud de Crédito
          </h1>
          <p className="text-slate-600">
            Complete todos los campos requeridos y adjunte la documentación necesaria
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Enviar solicitud - implementar lógica aquí');
            }}
          >
            {/* Secciones */}
            {[
              {
                key: 'cliente',
                title: '👤 Seleccionar Cliente',
                fields: (
                  <div className="flex flex-col md:flex-row md:items-end gap-4">
                    {/* Select de clientes (ejemplo con datos dummy) */}
                    <div className="flex-1">
                      <label
                        htmlFor="cliente_id"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Cliente <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="cliente_id"
                        name="cliente_id"
                        value={form.cliente_id}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                      >
                        <option value="">-- Seleccione un cliente --</option>
                        <option value="cliente1">Cliente 1</option>
                        <option value="cliente2">Cliente 2</option>
                        <option value="cliente3">Cliente 3</option>
                      </select>
                    </div>
              
                    {/* Botón para “Cliente Nuevo” */}
                    <Link
                      href={route('nuevoCliente')}
                      className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700
                                text-white px-4 py-2 rounded-md font-medium transition"
                    >
                      + Cliente Nuevo
                    </Link>
                  </div>
                ),
              },
              {
                key: 'laboral',
                title: '💼 Información Laboral',
                fields: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ocupación */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Ocupación <span className="text-red-600">*</span>
                      </label>
                      <input
                        name="ocupacion"
                        value={form.ocupacion}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Empresa */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Empresa/Empleador
                      </label>
                      <input
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Ingresos */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Ingresos Mensuales <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        name="ingresos"
                        value={form.ingresos}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Tiempo en el trabajo */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Tiempo en el Trabajo (meses)
                      </label>
                      <input
                        type="number"
                        name="tiempo_trabajo"
                        value={form.tiempo_trabajo}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Dirección laboral */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Dirección del Trabajo
                      </label>
                      <textarea
                        name="direccion_trabajo"
                        value={form.direccion_trabajo}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: 'credito',
                title: '💰 Información del Crédito',
                fields: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Monto */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Monto Solicitado <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        name="monto_solicitado"
                        value={form.monto_solicitado}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Plazo */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Plazo (meses) <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="plazo"
                        value={form.plazo}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Seleccione...</option>
                        {[6, 12, 18, 24, 36].map((m) => (
                          <option key={m} value={m}>
                            {m} meses
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Propósito */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Propósito del Crédito <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="proposito"
                        value={form.proposito}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: 'referencias',
                title: '👥 Referencias Personales',
                fields: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                    
                    {/* Ref 1 Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Referencia 1 - Nombre <span className="text-red-600">*</span>
                      </label>
                      <input
                        name="ref1_nombre"
                        value={form.ref1_nombre}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Ref 1 Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Referencia 1 - Teléfono <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="ref1_telefono"
                        value={form.ref1_telefono}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Ref 2 Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Referencia 2 - Nombre
                      </label>
                      <input
                        name="ref2_nombre"
                        value={form.ref2_nombre}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {/* Ref 2 Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Referencia 2 - Teléfono
                      </label>
                      <input
                        type="tel"
                        name="ref2_telefono"
                        value={form.ref2_telefono}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ),
              },
            ].map(({ key, title, fields }) => (
              <section key={key} className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>
                {fields}
              </section>
            ))}

            {/* Documentos Requeridos */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">📎 Documentos Requeridos</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: '📄',
                    title: 'Cédula de Identidad (ambos lados)',
                    description: 'PDF, JPG, PNG - Máx. 5MB',
                    required: true,
                  },
                  {
                    icon: '💼',
                    title: 'Comprobante de Ingresos',
                    description: 'Últimos 3 meses - PDF, JPG, PNG',
                    required: true,
                  },
                  {
                    icon: '🏠',
                    title: 'Comprobante de Domicilio',
                    description: 'Recibo servicios (≤3 meses)',
                    required: true,
                  },
                  {
                    icon: '🏦',
                    title: 'Estados de Cuenta Bancarios',
                    description: 'Últimos 3 meses - PDF',
                    required: false,
                  },
                  {
                    icon: '📋',
                    title: 'Referencias Comerciales',
                    description: 'Cartas, historial crediticio',
                    required: false,
                  },
                ].map(({ icon, title, description, required }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white border border-slate-200 rounded-md p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{icon}</div>
                      <div>
                        <h4 className="font-medium text-slate-800">{title}</h4>
                        <p className="text-sm text-slate-600">{description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          required
                            ? 'bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-medium'
                            : 'bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-medium'
                        }
                      >
                        {required ? 'REQUERIDO' : 'OPCIONAL'}
                      </span>
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                        onClick={() =>
                          alert(`Subir archivo para: ${title} (implementar)`)
                        }
                      >
                        Subir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Acciones */}
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                type="button"
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-md font-medium transition"
                onClick={() => alert('Guardar borrador - implementar')}
              >
                Guardar Borrador
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
              >
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
