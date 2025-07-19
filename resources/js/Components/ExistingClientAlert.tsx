
import React from 'react';

interface Cliente {
  id: number;
  nombre: string;
  estado: string;
  montoCredito: number;
  fechaUltimoCredito: string;
  telefono: string;
  curp: string;
}

interface ExistingClientAlertProps {
  selectedClient: Cliente;
}

export default function ExistingClientAlert({ selectedClient }: ExistingClientAlertProps) {
  function getEstadoBadge(estado: string) {
    const configs = {
      activo: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800', 
        border: 'border-blue-300',
        icon: '💳',
        label: 'Crédito Activo'
      },
      moroso: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        border: 'border-red-300',
        icon: '⚠️',
        label: 'Cliente Moroso'
      },
      pagado: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        border: 'border-green-300',
        icon: '✅',
        label: 'Crédito Pagado'
      },
    };

    const config = configs[estado as keyof typeof configs];
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <span className="text-sm">{config.icon}</span>
        {config.label}
      </span>
    );
  }

  return (
    <div className={`rounded-lg p-6 border-2 ${
      selectedClient.estado === 'moroso' 
        ? 'bg-red-50 border-red-300' 
        : selectedClient.estado === 'activo'
        ? 'bg-blue-50 border-blue-300'
        : 'bg-green-50 border-green-300'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
          selectedClient.estado === 'moroso' 
            ? 'bg-red-500 text-white' 
            : selectedClient.estado === 'activo'
            ? 'bg-blue-500 text-white'
            : 'bg-green-500 text-white'
        }`}>
          {selectedClient.estado === 'moroso' ? '⚠️' : selectedClient.estado === 'activo' ? '💳' : '✅'}
        </div>
        <div className="flex-1">
          <h4 className={`text-lg font-semibold mb-2 ${
            selectedClient.estado === 'moroso' ? 'text-red-800' : 
            selectedClient.estado === 'activo' ? 'text-blue-800' : 'text-green-800'
          }`}>
            Cliente Existente Detectado
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Información del Cliente:</p>
              <p>📞 Teléfono: {selectedClient.telefono}</p>
              <p>🆔 CURP: {selectedClient.curp}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Historial Crediticio:</p>
              <p>💰 Último monto: ${selectedClient.montoCredito.toLocaleString()}</p>
              <p>📅 Fecha: {selectedClient.fechaUltimoCredito}</p>
            </div>
          </div>
          <div className="mt-4">
            {getEstadoBadge(selectedClient.estado)}
          </div>
        </div>
      </div>
      
      {selectedClient.estado === 'moroso' && (
        <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-200">
          <p className="text-red-800 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            ¡ATENCIÓN! Este cliente tiene un estado moroso. Revise el historial antes de proceder.
          </p>
        </div>
      )}
    </div>
  );
}
