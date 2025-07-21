import React, { useState, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import ClientPersonalInfo from '@/Components/ClientPersonalInfo';
import ClientDocuments from '@/Components/ClientDocuments';
import ExistingClientAlert from '@/Components/ExistingClientAlert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Datos simulados de clientes existentes
const clientesExistentes = [
  { id: 1, nombre: 'Juan Pérez López', estado: 'activo', montoCredito: 15000, fechaUltimoCredito: '2024-01-15', telefono: '555-123-4567', curp: 'PELJ850315HDFRRN09' },
  { id: 2, nombre: 'Juan Carlos Mendoza', estado: 'moroso', montoCredito: 8500, fechaUltimoCredito: '2023-11-20', telefono: '555-987-6543', curp: 'MECJ900822HDFRRL05' },
  { id: 3, nombre: 'Juana María Rodríguez', estado: 'pagado', montoCredito: 12000, fechaUltimoCredito: '2023-08-10', telefono: '555-456-7890', curp: 'ROBJ880710MDFDRN02' },
  { id: 4, nombre: 'Ana García Martínez', estado: 'activo', montoCredito: 20000, fechaUltimoCredito: '2024-02-01', telefono: '555-234-5678', curp: 'GAMA920405MDFRRN08' },
  { id: 5, nombre: 'Ana Sofía Hernández', estado: 'moroso', montoCredito: 7500, fechaUltimoCredito: '2023-09-15', telefono: '555-345-6789', curp: 'HEAS950618MDFRRN01' },
  { id: 6, nombre: 'Roberto Silva Torres', estado: 'pagado', montoCredito: 18000, fechaUltimoCredito: '2023-12-05', telefono: '555-567-8901', curp: 'SITR870925HDFRRB04' }
];

export default function nuevoCliente() {
  const form = useForm({
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    curp: '',
    fecha_nac: '',
    sexo: '',
    estado_civil: '',
    activo: true,
    INE_doc: null,
    CURP_doc: null,
    comprobante_doc: null,
  });

  const [selectedClient, setSelectedClient] = useState<typeof clientesExistentes[0] | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    form.setData(e.target.name as any, e.target.value);
  }

  function handleDateChange(fecha: string) {
    form.setData('fecha_nac', fecha);
  }

  function handleCURPChange(curp: string) {
    form.setData('curp', curp);
    const match = clientesExistentes.find(c => c.curp === curp) ?? null;
    setSelectedClient(match);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      form.setData(e.target.name as any, e.target.files[0]);
    }
  }

  async function copyCURPToClipboard() {
    if (!form.data.curp) return;
    try {
      await navigator.clipboard.writeText(form.data.curp);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      /* noop */
    }
  }

  function openCURPPage() {
    window.open('https://www.gob.mx/curp/', '_blank');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.post(route('client.store'), {
      forceFormData: true,
      onSuccess: () => {
        alert('✅ Cliente guardado correctamente');
        form.reset();
        setSelectedClient(null);
      },
      onError: errors => {
        const messages = Object.values(errors).join('\n');
        alert(`❌ Error al guardar:\n${messages}`);
      },
    });
  }

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">👤</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Datos del Cliente</h1>
                  <p className="text-gray-600">Información personal y documentos</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-full" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
            <ClientPersonalInfo
              data={form.data}
              onChange={handleChange}
              onDateChange={handleDateChange}
              onCURPChange={handleCURPChange}
              errors={form.errors}
              copySuccess={copySuccess}
              onCopyCURP={copyCURPToClipboard}
              onOpenCURPPage={openCURPPage}
            />

            <ClientDocuments
              clienteFiles={{
                INE_doc: form.data.INE_doc,
                CURP_doc: form.data.CURP_doc,
                comprobante_doc: form.data.comprobante_doc,
              }}
              onFileChange={handleFileChange}
            />

            {selectedClient && <ExistingClientAlert selectedClient={selectedClient} />}

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
                  disabled={form.processing}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    form.processing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {form.processing ? 'Guardando...' : '✅ Guardar Cliente'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
