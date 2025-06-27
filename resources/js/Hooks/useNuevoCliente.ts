import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export function useNuevoCliente() {
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, key: keyof typeof form) => {
    e.preventDefault();
    setDragOver(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      setData(key, file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    post(route('clientes.store'), {
      forceFormData: true,
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
    setSubmitting,
    handleSubmit,
  };
}
