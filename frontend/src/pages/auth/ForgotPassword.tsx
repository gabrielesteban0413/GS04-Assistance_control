import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../lib/supabase';
import logo from '../../assets/images/login.png';
import '../../assets/styles/auth.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: `${window.location.origin}/reset-password`,
    // });

    // if (resetError) {
    //   setError(resetError.message);
    // } else {
    //   setMessage('Revisa tu correo electrónico. Te hemos enviado un enlace para restablecer tu contraseña.');
    // }
    // setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Imagen izquierda (desktop) */}
        <div className="auth-image-col">
          <img src={logo} alt="Sistema de Asistencia" className="auth-image" />
        </div>

        {/* Formulario */}
        <div className="auth-form-col">
          <div className="auth-mui-card">
            <div className="auth-mobile-logo">
              <img src={logo} alt="Logo" />
            </div>

            <h1 className="auth-title">Restablecer contraseña</h1>
            <p className="auth-subtitle">
              Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
            </p>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="auth-form-control">
                <label htmlFor="email" className="auth-label">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  autoComplete="email"
                  autoFocus
                  required
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar enlace'}
              </button>

              {message && (
                <div className="auth-alert-success">
                  {message}
                </div>
              )}
              {error && (
                <div className="auth-alert-error">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="auth-forgot-link"
              >
                Volver al inicio de sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;