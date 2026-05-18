import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl, FormLabel, TextField, Button, Card, Alert, Link as MuiLink
} from '@mui/material';
import { supabase } from '../../lib/supabase';
import logo from '../../assets/images/login.png';

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

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage('Revisa tu correo electrónico. Te hemos enviado un enlace para restablecer tu contraseña.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Imagen izquierda (desktop) */}
        <div className="login-image-col">
          <img src={logo} alt="Sistema de Asistencia" className="login-image" />
        </div>

        {/* Formulario */}
        <div className="login-form-col">
          <Card className="login-mui-card" variant="outlined">
            <div className="login-mobile-logo">
              <img src={logo} alt="Logo" />
            </div>

            <h1 className="login-title">Restablecer contraseña</h1>
            <p className="login-subtitle">
              Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
            </p>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  size="medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className="login-submit-btn"
              >
                {loading ? 'Enviando...' : 'Enviar enlace'}
              </Button>

              {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

              <MuiLink
                component="button"
                type="button"
                onClick={() => navigate('/login')}
                className="login-forgot-link"
                variant="body2"
                sx={{ mt: 1 }}
              >
                Volver al inicio de sesión
              </MuiLink>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;