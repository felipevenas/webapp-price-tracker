import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const registerSchema = z
  .object({
    full_name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await registerUser(data.email, data.full_name, data.password);
      toast.success('Cadastro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || err.response?.data?.detail || 'Erro ao realizar cadastro. Tente outro e-mail.';
      setFormError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {formError && (
        <div className="flex items-center space-x-2 bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm rounded-lg p-3">
          <AlertCircle size={16} className="shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <Input
        label="Nome Completo"
        placeholder="Seu Nome"
        error={errors.full_name?.message}
        leftIcon={<UserIcon size={16} />}
        {...register('full_name')}
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="usuario@email.com"
        error={errors.email?.message}
        leftIcon={<Mail size={16} />}
        {...register('email')}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••"
        error={errors.password?.message}
        leftIcon={<Lock size={16} />}
        {...register('password')}
      />

      <Input
        label="Confirmar Senha"
        type="password"
        placeholder="••••••"
        error={errors.confirmPassword?.message}
        leftIcon={<Lock size={16} />}
        {...register('confirmPassword')}
      />

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Cadastrar
      </Button>
    </form>
  );
};

export default RegisterForm;
