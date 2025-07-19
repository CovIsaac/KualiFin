
import React from 'react';

interface ClientFiles {
  INE_doc: File | null;
  CURP_doc: File | null;
  comprobante_doc: File | null;
}

interface ClientDocumentsProps {
  clienteFiles: ClientFiles;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ClientDocuments({ clienteFiles, onFileChange }: ClientDocumentsProps) {
  const docKeys = ['INE_doc', 'CURP_doc', 'comprobante_doc'] as const;

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
          📎
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Documentos del Cliente</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docKeys.map((key, index) => {
          const labelText =
            key === 'INE_doc'
              ? 'INE'
              : key === 'CURP_doc'
              ? 'CURP'
              : 'Comprobante de Domicilio';

          const colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-orange-500'
          ];

          return (
            <label
              key={key}
              htmlFor={key}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
            >
              <input
                id={key}
                name={key} 
                type="file"
                accept="image/*,.pdf"
                onChange={onFileChange}
                className="sr-only"
              />
              
              {clienteFiles[key] ? (
                <div className="flex flex-col items-center text-green-600">
                  <div className={`w-12 h-12 ${colors[index]} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
                    ✅
                  </div>
                  <span className="text-sm font-medium text-center text-gray-700 truncate max-w-full">
                    {clienteFiles[key]!.name}
                  </span>
                  <span className="text-xs text-green-600 mt-1">Archivo cargado</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <div className={`w-12 h-12 ${colors[index]} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
                    📄
                  </div>
                  <span className="text-sm font-medium text-center">{labelText}</span>
                  <span className="text-xs text-gray-400 mt-1">Haz clic para subir</span>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
}
