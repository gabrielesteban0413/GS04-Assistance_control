import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import logo from '../../assets/images/login.png';
import '../../assets/styles/auth.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Contraseña actualizada correctamente. Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
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
            <h1 className="auth-title">Nueva contraseña</h1>
            <p className="auth-subtitle">Ingresa tu nueva contraseña</p>
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="auth-form-control">
                <label htmlFor="password" className="auth-label">Nueva contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  required
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="auth-form-control">
                <label htmlFor="confirmPassword" className="auth-label">Confirmar contraseña</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••"
                  required
                  className="auth-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Actualizando...' : 'Actualizar contraseña'}
              </button>
              {message && <div className="auth-alert-success">{message}</div>}
              {error && <div className="auth-alert-error">{error}</div>}
              <button type="button" onClick={() => navigate('/login')} className="auth-forgot-link">
                Volver al inicio de sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;