import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Solicitud() {
  const [form, setForm] = useState({
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

  // Manejo básico para inputs
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Aquí podrías agregar funciones para manejar archivos y envío de formulario

  return (
    <AuthenticatedLayout>
      <Head title="Nueva Solicitud de Crédito - Sistema de Créditos" />
      <style>{`
        body {
          margin: 0;
          background: #f4f6f8;
          font-family: 'Roboto', sans-serif;
          color: #2d3748;
        }
        .header {
          background: #3182ce;
          color: #fff;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header .logo {
          font-weight: bold;
          font-size: 1.3rem;
          letter-spacing: 2px;
        }
        .header .user-menu {
          font-size: 1rem;
        }
        .container {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          background: #fff;
          width: 220px;
          padding: 2rem 1rem;
          box-shadow: 2px 0 8px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .sidebar a {
          color: #2d3748;
          text-decoration: none;
          font-weight: 500;
          padding: 0.7rem 1rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .sidebar a.active, .sidebar a:hover {
          background: #e3e8ee;
          color: #2563eb;
        }
        .main {
          flex: 1;
          padding: 2rem;
          background: #f4f6f8;
          min-height: 100vh;
        }
        .form-container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden;
        }
        .form-header {
          background: #3182ce;
          color: #fff;
          padding: 2rem;
          text-align: center;
        }
        .form-header h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
        }
        .form-header p {
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
        }
        .form-content {
          padding: 2rem;
        }
        .form-section {
          margin-bottom: 2.5rem;
        }
        .form-section h3 {
          color: #2d3748;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        .form-group label {
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3182ce;
        }
        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        .required {
          color: #e53e3e;
        }
        .file-upload-section {
          background: #f7fafc;
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .file-upload-item {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .file-upload-item:last-child {
          margin-bottom: 0;
        }
        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .file-icon {
          width: 40px;
          height: 40px;
          background: #3182ce;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1.5rem;
          user-select: none;
        }
        .file-details h4 {
          margin: 0;
          font-size: 0.9rem;
          color: #2d3748;
        }
        .file-details p {
          margin: 0.25rem 0 0 0;
          font-size: 0.8rem;
          color: #4a5568;
        }
        .file-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .status-required {
          background: #fed7d7;
          color: #c53030;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .status-optional {
          background: #e6fffa;
          color: #38a169;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .upload-btn {
          background: #3182ce;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.2s;
        }
        .upload-btn:hover {
          background: #2c5aa0;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }
        .btn {
          padding: 0.75rem 2rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 1rem;
        }
        .btn-primary {
          background: #3182ce;
          color: #fff;
        }
        .btn-primary:hover {
          background: #2c5aa0;
        }
        .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }
        .btn-secondary:hover {
          background: #cbd5e0;
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .sidebar {
            display: none;
          }
          .main {
            padding: 1rem;
          }
          .form-content {
            padding: 1.5rem;
          }
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>

        <main className="main">
          <div className="form-container">
            <div className="form-header">
              <h1>Nueva Solicitud de Crédito</h1>
              <p>Complete todos los campos requeridos y adjunte la documentación necesaria</p>
            </div>
            <div className="form-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Enviar solicitud - implementar lógica aquí');
                }}
              >
                {/* Información Personal */}
                <section className="form-section">
                  <h3>📋 Información Personal</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="nombres">
                        Nombres <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombres"
                        name="nombres"
                        value={form.nombres}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apellidos">
                        Apellidos <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        value={form.apellidos}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cedula">
                        Cédula de Identidad <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="cedula"
                        name="cedula"
                        value={form.cedula}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fecha_nacimiento">
                        Fecha de Nacimiento <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        value={form.fecha_nacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefono">
                        Teléfono <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="direccion">
                        Dirección Completa <span className="required">*</span>
                      </label>
                      <textarea
                        id="direccion"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </section>

                {/* Información Laboral */}
                <section className="form-section">
                  <h3>💼 Información Laboral</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="ocupacion">
                        Ocupación <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="ocupacion"
                        name="ocupacion"
                        value={form.ocupacion}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="empresa">Empresa/Empleador</label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ingresos">
                        Ingresos Mensuales <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        id="ingresos"
                        name="ingresos"
                        step="0.01"
                        value={form.ingresos}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tiempo_trabajo">Tiempo en el Trabajo (meses)</label>
                      <input
                        type="number"
                        id="tiempo_trabajo"
                        name="tiempo_trabajo"
                        value={form.tiempo_trabajo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="direccion_trabajo">Dirección del Trabajo</label>
                      <textarea
                        id="direccion_trabajo"
                        name="direccion_trabajo"
                        value={form.direccion_trabajo}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </section>

                {/* Información del Crédito */}
                <section className="form-section">
                  <h3>💰 Información del Crédito</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="monto_solicitado">
                        Monto Solicitado <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        id="monto_solicitado"
                        name="monto_solicitado"
                        step="0.01"
                        value={form.monto_solicitado}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="plazo">
                        Plazo (meses) <span className="required">*</span>
                      </label>
                      <select
                        id="plazo"
                        name="plazo"
                        value={form.plazo}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione...</option>
                        {[6, 12, 18, 24, 36].map((m) => (
                          <option key={m} value={m}>
                            {m} meses
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="proposito">
                        Propósito del Crédito <span className="required">*</span>
                      </label>
                      <textarea
                        id="proposito"
                        name="proposito"
                        placeholder="Describa para qué utilizará el crédito"
                        value={form.proposito}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </section>

                {/* Referencias */}
                <section className="form-section">
                  <h3>👥 Referencias Personales</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="ref1_nombre">
                        Referencia 1 - Nombre <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="ref1_nombre"
                        name="ref1_nombre"
                        value={form.ref1_nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ref1_telefono">
                        Referencia 1 - Teléfono <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="ref1_telefono"
                        name="ref1_telefono"
                        value={form.ref1_telefono}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ref2_nombre">Referencia 2 - Nombre</label>
                      <input
                        type="text"
                        id="ref2_nombre"
                        name="ref2_nombre"
                        value={form.ref2_nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ref2_telefono">Referencia 2 - Teléfono</label>
                      <input
                        type="tel"
                        id="ref2_telefono"
                        name="ref2_telefono"
                        value={form.ref2_telefono}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </section>

                {/* Documentos Requeridos */}
                <section className="form-section">
                  <h3>📎 Documentos Requeridos</h3>

                  {[
                    {
                      icon: '📄',
                      title: 'Cédula de Identidad (ambos lados)',
                      description: 'Formato: PDF, JPG, PNG - Máximo 5MB',
                      required: true,
                    },
                    {
                      icon: '💼',
                      title: 'Comprobante de Ingresos',
                      description: 'Últimos 3 meses - Formato: PDF, JPG, PNG',
                      required: true,
                    },
                    {
                      icon: '🏠',
                      title: 'Comprobante de Domicilio',
                      description: 'Recibo de servicios (máximo 3 meses)',
                      required: true,
                    },
                    {
                      icon: '🏦',
                      title: 'Estados de Cuenta Bancarios',
                      description: 'Últimos 3 meses - Formato: PDF',
                      required: false,
                    },
                    {
                      icon: '📋',
                      title: 'Referencias Comerciales',
                      description: 'Cartas de recomendación, historial crediticio',
                      required: false,
                    },
                  ].map(({ icon, title, description, required }, i) => (
                    <div key={i} className="file-upload-item">
                      <div className="file-info">
                        <div className="file-icon" aria-hidden="true">
                          {icon}
                        </div>
                        <div className="file-details">
                          <h4>{title}</h4>
                          <p>{description}</p>
                        </div>
                      </div>
                      <div className="file-status">
                        <span
                          className={
                            required ? 'status-required' : 'status-optional'
                          }
                        >
                          {required ? 'REQUERIDO' : 'OPCIONAL'}
                        </span>
                        <button
                          type="button"
                          className="upload-btn"
                          onClick={() =>
                            alert(
                              `Subir archivo para: ${title} (implementar funcionalidad)`
                            )
                          }
                        >
                          Subir
                        </button>
                      </div>
                    </div>
                  ))}
                </section>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      alert('Guardar borrador - implementar funcionalidad')
                    }
                  >
                    Guardar Borrador
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
    </AuthenticatedLayout>
  );
}
