import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link2, DollarSign, Clock, FileText } from 'lucide-react';
import type { ProductResponse, UpdateProductPayload } from '../types/productTypes';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

// Schema para criação de produto
const productSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  url: z.string().url('Insira um link válido do e-commerce (ex: https://...)'),
  target_price: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? null : Number(val)),
    z.number().positive('O preço deve ser um valor positivo').nullable()
  ),
  check_interval_minutes: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? 60 : Number(val)),
    z.number().int().min(1, 'Mínimo de 1 minuto').max(1440, 'Máximo de 1440 minutos (24h)')
  ),
});

interface ProductFormValues {
  name: string;
  url: string;
  target_price: number | null;
  check_interval_minutes: number;
}

interface ProductFormProps {
  initialData?: ProductResponse;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      url: initialData?.url || '',
      target_price: initialData?.target_price || null,
      check_interval_minutes: initialData?.check_interval_minutes || 60,
    },
  });

  const handleFormSubmit = async (data: ProductFormValues) => {
    if (isEditMode) {
      const editPayload: UpdateProductPayload = {
        name: data.name,
        target_price: data.target_price,
        check_interval_minutes: data.check_interval_minutes,
      };
      await onSubmit(editPayload);
    } else {
      await onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nome do Produto"
        placeholder="Cadeira de Escritório Presidente"
        error={errors.name?.message}
        leftIcon={<FileText size={16} />}
        {...register('name')}
      />

      <Input
        label="Link do Produto"
        placeholder="https://www.mercadolivre.com.br/produto-exemplo"
        error={errors.url?.message}
        disabled={isEditMode}
        helperText={isEditMode ? 'O link não pode ser alterado.' : 'Copie e cole a URL completa do e-commerce.'}
        leftIcon={<Link2 size={16} />}
        {...register('url')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Preço Alvo (BRL) - Opcional"
          type="number"
          step="0.01"
          placeholder="150.00"
          error={errors.target_price?.message}
          helperText="Alerta quando preço for menor ou igual"
          leftIcon={<DollarSign size={16} />}
          {...register('target_price')}
        />

        <Input
          label="Frequência de Checagem (Minutos)"
          type="number"
          placeholder="60"
          error={errors.check_interval_minutes?.message}
          helperText="Entre 1 (1m) e 1440 (24h)"
          leftIcon={<Clock size={16} />}
          {...register('check_interval_minutes')}
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-800">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEditMode ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
