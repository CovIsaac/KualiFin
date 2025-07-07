import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function AdminPanel() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    puesto: '',
    telefono: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí deberías hacer la petición a tu backend para registrar el empleado
    setSuccess(true);
    setForm({ nombre: '', correo: '', puesto: '', telefono: '', password: '' });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Panel Administrativo - Registrar Empleado" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-white/20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Registrar Nuevo Empleado</h2>
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-center font-semibold">¡Empleado registrado exitosamente!</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Nombre completo</label>
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Correo electrónico</label>
              <input type="email" name="correo" value={form.correo} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Puesto</label>
              <select name="puesto" value={form.puesto} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none">
                <option value="" disabled>Selecciona un puesto</option>
                <option value="Promotor">Promotor</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Contraseña</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">Registrar</button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
