import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await login(data.email, data.password);
      toast.success('Login realizado com sucesso!');
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || err.response?.data?.detail || 'Erro ao realizar login. Verifique suas credenciais.';
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

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;
