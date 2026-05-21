import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/login.png';
import '../../assets/styles/auth.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError(true);
      setEmailErrorMessage('El correo electrónico es requerido.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError(true);
      setEmailErrorMessage('Ingrese un correo electrónico válido.');
      return false;
    }
    setEmailError(false);
    setEmailErrorMessage('');
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña es requerida.');
      return false;
    }
    if (value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setPasswordError(false);
    setPasswordErrorMessage('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validateForm = (): boolean => validateEmail(email) && validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage('');
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      if (result.success && result.role) {
        if (result.role === 'admin') navigate('/admin/dashboard');
        else if (result.role === 'rrhh') navigate('/rrhh/dashboard');
        else navigate('/employee/dashboard');
      } else {
        setLoginErrorMessage(result.error || 'Error al iniciar sesión');
      }
    } catch (err: any) {
      setLoginErrorMessage(err.message || 'Error inesperado');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-image-col">
          <img src={logo} alt="Sistema de Asistencia" className="auth-image" />
        </div>
        <div className="auth-form-col">
          <div className="auth-mui-card">
            <div className="auth-mobile-logo">
              <img src={logo} alt="Logo" />
            </div>
            <h1 className="auth-title">Sistema de Asistencia</h1>
            <p className="auth-subtitle">Ingrese sus datos de inicio de sesión a continuación</p>
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="auth-form-control">
                <label htmlFor="email" className="auth-label">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  className={`auth-input ${emailError ? 'auth-input-error' : ''}`}
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <span className="auth-error-text">{emailErrorMessage}</span>}
              </div>

              <div className="auth-form-control">
                <label htmlFor="password" className="auth-label">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  placeholder="••••••"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`auth-input ${passwordError ? 'auth-input-error' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <span className="auth-error-text">{passwordErrorMessage}</span>}
              </div>

              <div className="auth-checkbox-wrapper">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="auth-checkbox"
                  />
                  Recordarme
                </label>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>

              {loginErrorMessage && (
                <div className="auth-alert-error">
                  {loginErrorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="auth-forgot-link"
              >
                ¿Has olvidado tu contraseña?
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;