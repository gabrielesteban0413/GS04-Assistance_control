import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import logo from '../../assets/images/logo.png';
// Los estilos vienen de assets/styles/7-pages/_login.css (importado globalmente)

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.email) newErrors.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo inválido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setServerError('');

    try {
      await login(formData.email, formData.password);
      // Redirigir según rol (lo manejarás en otro lado o aquí mismo)
      // Por ahora redirige a dashboard genérico, luego lo refinas
      navigate('/dashboard');
    } catch (err: any) {
      setServerError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo-mobile" />
          <h1 className="login-title">Sistema de Asistencia</h1>
          <p className="login-subtitle">Ingrese sus credenciales</p>
        </div>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            placeholder="tu@empresa.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" name="remember" /> Recordarme
            </label>
            <button type="button" className="link-button" onClick={() => navigate('/forgot-password')}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="login-divider">
          <span>o continuar con</span>
        </div>

        <Button variant="outline" fullWidth onClick={() => alert('Google login')}>
          Iniciar sesión con Google
        </Button>

        <div className="login-footer">
          ¿No tienes una cuenta?{' '}
          <button type="button" className="link-button" onClick={() => alert('Registro')}>
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;