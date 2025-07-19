
import React from 'react';

interface FormData {
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  curp: string;
  fecha_nac: string;
  sexo: string;
  estado_civil: string;
  edad: string;
  activo: boolean;
}

interface ClientPersonalInfoProps {
  data: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateChange: (fecha: string) => void;
  onCURPChange: (curp: string) => void;
  errors: Partial<FormData>;
  copySuccess: boolean;
  onCopyCURP: () => void;
  onOpenCURPPage: () => void;
}

export default function ClientPersonalInfo({
  data,
  onChange,
  onDateChange,
  onCURPChange,
  errors,
  copySuccess,
  onCopyCURP,
  onOpenCURPPage
}: ClientPersonalInfoProps) {
  const inputBase = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white";

  function formatCURP(value: string) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fecha = e.target.value;
    onDateChange(fecha);

    if (fecha) {
      const today = new Date();
      const birthDate = new Date(fecha);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      // Llamar onChange para actualizar la edad
      onChange({ target: { name: 'edad', value: age > 0 ? age.toString() : '' } } as any);
    } else {
      onChange({ target: { name: 'edad', value: '' } } as any);
    }
  }

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
          👤
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Información Personal del Cliente</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            value={data.nombre}
            onChange={onChange}
            placeholder="Juan"
            className={inputBase}
            required
          />
          {errors.nombre && <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>}
        </div>

        {/* Apellido Paterno */}
        <div>
          <label htmlFor="apellido_p" className="block text-sm font-medium text-gray-700 mb-2">
            Apellido Paterno<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="apellido_p"
            name="apellido_p"
            value={data.apellido_p}
            onChange={onChange}
            placeholder="Pérez"
            className={inputBase}
            required
          />
          {errors.apellido_p && <div className="text-red-500 text-sm mt-1">{errors.apellido_p}</div>}
        </div>

        {/* Apellido Materno */}
        <div>
          <label htmlFor="apellido_m" className="block text-sm font-medium text-gray-700 mb-2">
            Apellido Materno<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="apellido_m"
            name="apellido_m"
            value={data.apellido_m}
            onChange={onChange}
            placeholder="López"
            className={inputBase}
            required
          />
          {errors.apellido_m && <div className="text-red-500 text-sm mt-1">{errors.apellido_m}</div>}
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label htmlFor="fecha_nac" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de nacimiento<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="fecha_nac"
            name="fecha_nac"
            type="date"
            value={data.fecha_nac}
            onChange={handleDateChange}
            className={inputBase}
            required
          />
        </div>

        {/* Sexo */}
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-2">
            Sexo<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="sexo"
            name="sexo"
            value={data.sexo}
            onChange={onChange}
            className={inputBase}
            required
          >
            <option value="">Seleccione…</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        {/* Estado Civil */}
        <div>
          <label htmlFor="estado_civil" className="block text-sm font-medium text-gray-700 mb-2">
            Estado Civil<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="estado_civil"
            name="estado_civil"
            value={data.estado_civil}
            onChange={onChange}
            className={inputBase}
            required
          >
            <option value="">Seleccione…</option>
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
            <option value="union_libre">Unión Libre</option>
            <option value="viudo">Viudo</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>

        {/* CURP */}
        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="curp" className="block text-sm font-medium text-gray-700 mb-2">
            CURP<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <input
              id="curp"
              name="curp"
              value={data.curp}
              onChange={e => onCURPChange(formatCURP(e.target.value))}
              placeholder="PELJ850315HDFRRN09"
              maxLength={18}
              className={inputBase}
              required
            />
            
            {/* Botón para copiar CURP */}
            <button
              type="button"
              onClick={onCopyCURP}
              disabled={!data.curp}
              className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                copySuccess 
                  ? 'bg-green-500 text-white' 
                  : data.curp 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title="Copiar CURP al portapapeles"
            >
              {copySuccess ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copiar
                </>
              )}
            </button>

            {/* Botón para ir a página de CURP */}
            <button
              type="button"
              onClick={onOpenCURPPage}
              className="px-4 py-3 rounded-lg font-medium bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-200 flex items-center gap-2"
              title="Ir a página oficial de CURP"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              CURP
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Formato: 18 caracteres (4 letras + 6 números + 8 caracteres)
          </p>
        </div>
      </div>
    </section>
  );
}
