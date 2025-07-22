import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function AdminDashboard() {
  // Opciones del panel administrativo
  const adminOptions = [
    {
      title: 'Registrar Empleado',
      description: 'Agregar nuevo miembro al equipo',
      icon: '👨‍💼',
      href: '/registrarEmpleado',
      available: true
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar cuentas y permisos',
      icon: '👥',
      href: '#',
      available: false
    },
    {
      title: 'Configuración del Sistema',
      description: 'Ajustes generales y parámetros',
      icon: '⚙️',
      href: '#',
      available: false
    },
    {
      title: 'Reportes Administrativos',
      description: 'Análisis y estadísticas del sistema',
      icon: '📊',
      href: '#',
      available: false
    },
    {
      title: 'Auditoría y Logs',
      description: 'Registro de actividades del sistema',
      icon: '📋',
      href: '#',
      available: false
    },
    {
      title: 'Respaldos y Seguridad',
      description: 'Gestión de copias de seguridad',
      icon: '🔒',
      href: '#',
      available: false
    }
  ];

  const getStatusBadgeColor = (available: boolean) => {
    return available 
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-orange-100 text-orange-800 border-orange-300';
  };

  return (
    <AuthenticatedLayout>
      <Head title="Panel Administrativo - Sistema de Créditos" />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <span className="text-4xl">🧑‍💼</span>
              Panel Administrativo
            </h1>
            <p className="text-lg text-gray-600">
              Centro de control y gestión del sistema de créditos
            </p>
          </div>

          {/* Herramientas Administrativas */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminOptions.map((option) => (
                  <div key={option.title} className="relative">
                    {option.available ? (
                      <Link href={option.href}>
                        <div className="bg-gray-50 rounded-lg p-6 border hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
                              {option.icon}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {option.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-4">
                              {option.description}
                            </p>

                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(option.available)}`}>
                              {option.available ? 'Disponible' : 'Próximamente'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-6 border opacity-60 cursor-not-allowed">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-400 rounded-lg flex items-center justify-center text-white text-2xl">
                            {option.icon}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-500 mb-2">
                            {option.title}
                          </h3>
                          
                          <p className="text-sm text-gray-400 mb-4">
                            {option.description}
                          </p>

                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(option.available)}`}>
                            {option.available ? 'Disponible' : 'Próximamente'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}