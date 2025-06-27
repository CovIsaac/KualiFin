import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export function useNuevoCliente() {
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [avalDragOver, setAvalDragOver] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Formulario del cliente
  const { data: form, setData, post } = useForm<{
    nombre: string;
    edad: string;
    sexo: string;
    estado_civil: string;
    ine: File | null;
    curp: File | null;
    comprobante: File | null;
  }>({
    nombre: '',
    edad: '',
    sexo: '',
    estado_civil: '',
    ine: null,
    curp: null,
    comprobante: null,
  });

  // Formulario del aval
  const [avalForm, setAvalForm] = useState<{
    nombre: string;
    edad: string;
    sexo: string;
    estado_civil: string;
    ine: File | null;
    curp: File | null;
    comprobante: File | null;
  }>({
    nombre: '',
    edad: '',
    sexo: '',
    estado_civil: '',
    ine: null,
    curp: null,
    comprobante: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'file') {
      const file = (target as HTMLInputElement).files?.[0] || null;
      setData(name as keyof typeof form, file);
    } else {
      setData(name as keyof typeof form, value);
    }
  };

  const handleAvalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'file') {
      const file = (target as HTMLInputElement).files?.[0] || null;
      setAvalForm(prev => ({ ...prev, [name]: file }));
    } else {
      setAvalForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, key: keyof typeof form) => {
    e.preventDefault();
    setDragOver(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      setData(key, file);
    }
  };

  const handleAvalDrop = (e: React.DragEvent<HTMLLabelElement>, key: keyof typeof avalForm) => {
    e.preventDefault();
    setAvalDragOver(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      setAvalForm(prev => ({ ...prev, [key]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Simular guardado del cliente y pasar al siguiente paso
    setTimeout(() => {
      setSuccessMessage('✅ Datos del cliente guardados. Ahora complete los datos del aval.');
      setCurrentStep(2);
      setSubmitting(false);
    }, 1500);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Crear FormData con todos los datos
    const formData = new FormData();
    
    // Datos del cliente
    formData.append('cliente_nombre', form.nombre);
    formData.append('cliente_edad', form.edad);
    formData.append('cliente_sexo', form.sexo);
    formData.append('cliente_estado_civil', form.estado_civil);
    if (form.ine) formData.append('cliente_ine', form.ine);
    if (form.curp) formData.append('cliente_curp', form.curp);
    if (form.comprobante) formData.append('cliente_comprobante', form.comprobante);

    // Datos del aval
    formData.append('aval_nombre', avalForm.nombre);
    formData.append('aval_edad', avalForm.edad);
    formData.append('aval_sexo', avalForm.sexo);
    formData.append('aval_estado_civil', avalForm.estado_civil);
    if (avalForm.ine) formData.append('aval_ine', avalForm.ine);
    if (avalForm.curp) formData.append('aval_curp', avalForm.curp);
    if (avalForm.comprobante) formData.append('aval_comprobante', avalForm.comprobante);

    post(route('clientes.store'), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        setSuccessMessage('✅ Cliente y aval registrados correctamente.');
        // Resetear formularios
        setData({
          nombre: '',
          edad: '',
          sexo: '',
          estado_civil: '',
          ine: null,
          curp: null,
          comprobante: null,
        });
        setAvalForm({
          nombre: '',
          edad: '',
          sexo: '',
          estado_civil: '',
          ine: null,
          curp: null,
          comprobante: null,
        });
        setCurrentStep(1);
      },
      onError: () => {
        setErrorMessage('❌ Hubo un error al registrar el cliente y aval. Revisa los campos.');
      },
      onFinish: () => setSubmitting(false),
    });
  };

  return {
    form,
    submitting,
    dragOver,
    setDragOver,
    handleChange,
    handleDrop,
    handleSubmit,
    successMessage,
    errorMessage,
    currentStep,
    setCurrentStep,
    avalForm,
    handleAvalChange,
    handleAvalDrop,
    avalDragOver,
    setAvalDragOver,
    handleFinalSubmit,
  };
}