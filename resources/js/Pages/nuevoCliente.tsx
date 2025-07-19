
import React, { useState, FormEvent } from 'react';
import ClientPersonalInfo from '@/Components/ClientPersonalInfo';
import ClientDocuments from '@/Components/ClientDocuments';
import ExistingClientAlert from '@/Components/ExistingClientAlert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Datos simulados de clientes existentes (optimizado - solo los necesarios para búsqueda)
const clientesExistentes = [
  { 
    id: 1, 
    nombre: 'Juan Pérez López', 
    estado: 'activo', 
    montoCredito: 15000, 
    fechaUltimoCredito: '2024-01-15',
    telefono: '555-123-4567',
    curp: 'PELJ850315HDFRRN09'
  },
  { 
    id: 2, 
    nombre: 'Juan Carlos Mendoza', 
    estado: 'moroso', 
    montoCredito: 8500, 
    fechaUltimoCredito: '2023-11-20',
    telefono: '555-987-6543',
    curp: 'MECJ900822HDFRRL05'
  },
  { 
    id: 3, 
    nombre: 'Juana María Rodríguez', 
    estado: 'pagado', 
    montoCredito: 12000, 
    fechaUltimoCredito: '2023-08-10',
    telefono: '555-456-7890',
    curp: 'ROBJ880710MDFDRN02'
  },
  { 
    id: 4, 
    nombre: 'Ana García Martínez', 
    estado: 'activo', 
    montoCredito: 20000, 
    fechaUltimoCredito: '2024-02-01',
    telefono: '555-234-5678',
    curp: 'GAMA920405MDFRRN08'
  },
  { 
    id: 5, 
    nombre: 'Ana Sofía Hernández', 
    estado: 'moroso', 
    montoCredito: 7500, 
    fechaUltimoCredito: '2023-09-15',
    telefono: '555-345-6789',
    curp: 'HEAS950618MDFRRN01'
  },
  { 
    id: 6, 
    nombre: 'Roberto Silva Torres', 
    estado: 'pagado', 
    montoCredito: 18000, 
    fechaUltimoCredito: '2023-12-05',
    telefono: '555-567-8901',
    curp: 'SITR870925HDFRRB04'
  }
];

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

interface ClientFiles {
  INE_doc: File | null;
  CURP_doc: File | null;
  comprobante_doc: File | null;
}

export default function nuevoCliente() {
  const [selectedClient, setSelectedClient] = useState<typeof clientesExistentes[0] | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Datos del formulario
  const [data, setData] = useState<FormData>({
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    curp: '',
    fecha_nac: '',
    sexo: '',
    estado_civil: '',
    edad: '',
    activo: true,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Archivos del cliente
  const [clienteFiles, setClienteFiles] = useState<ClientFiles>({
    INE_doc: null,
    CURP_doc: null,
    comprobante_doc: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  function handleDateChange(fecha: string) {
    setData(prev => ({ ...prev, fecha_nac: fecha }));
  }

  function handleCURPChange(curp: string) {
    setData(prev => ({ ...prev, curp }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    if (!files?.[0]) return;

    setClienteFiles(prev => ({
      ...prev,
      [name]: files[0]
    }));
  }

  // Función para copiar CURP al portapapeles (optimizada)
  async function copyCURPToClipboard() {
    if (!data.curp) return;
    
    try {
      await navigator.clipboard.writeText(data.curp);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }

  // Función para abrir página de CURP
  function openCURPPage() {
    window.open('https://www.gob.mx/curp/', '_blank');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProcessing(true);

    // Simulación de envío
    setTimeout(() => {
      console.log('Cliente guardado:', data);
      console.log('Archivos:', clienteFiles);
      setProcessing(false);
      alert('Cliente guardado exitosamente');
    }, 1000);
  }

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                  👤
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Datos del Cliente</h1>
                  <p className="text-gray-600">Información personal y documentos</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-full"></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal del Cliente */}
            <ClientPersonalInfo
              data={data}
              onChange={handleChange}
              onDateChange={handleDateChange}
              onCURPChange={handleCURPChange}
              errors={errors}
              copySuccess={copySuccess}
              onCopyCURP={copyCURPToClipboard}
              onOpenCURPPage={openCURPPage}
            />

            {/* Documentos del Cliente */}
            <ClientDocuments
              clienteFiles={clienteFiles}
              onFileChange={handleFileChange}
            />

            {/* Cliente existente alerta */}
            {selectedClient && (
              <ExistingClientAlert selectedClient={selectedClient} />
            )}

            {/* Navegación */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  ← Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    processing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {processing ? 'Guardando...' : '✅ Guardar Cliente'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
