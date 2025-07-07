import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function AdminDashboard() {
  return (
    <AuthenticatedLayout>
      <Head title="Panel Administrativo" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-white/20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Panel Administrativo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/registrarEmpleado" className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 shadow-lg hover:scale-105 transition-transform border border-blue-200">
              <span className="text-5xl mb-4">🧑‍💼</span>
              <span className="font-bold text-lg text-blue-700">Registrar Empleado</span>
            </Link>
            {/* Aquí puedes agregar más opciones administrativas */}
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg border border-slate-200 opacity-60 cursor-not-allowed">
              <span className="text-5xl mb-4">🔒</span>
              <span className="font-bold text-lg text-slate-500">Próximamente</span>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
