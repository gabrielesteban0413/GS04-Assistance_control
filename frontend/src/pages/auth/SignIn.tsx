import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Checkbox, FormControlLabel, Divider, FormLabel,
  FormControl, Link, TextField, Typography, Card, Alert
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

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
    <div className="login-container">
      <div className="login-card">
        <div className="login-image-col">
          <img src={logo} alt="Sistema de Asistencia" className="login-image" />
        </div>

        <div className="login-form-col">
          <Card className="login-mui-card" variant="outlined">
            <div className="login-mobile-logo">
              <img src={logo} alt="Logo" />
            </div>

            <h1 className="login-title">Sistema de Asistencia</h1>
            <p className="login-subtitle">Ingrese sus datos de inicio de sesión a continuación</p>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <FormControl>
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  size="medium"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  size="medium"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    color="primary"
                  />
                }
                label="Recordarme"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                className="login-submit-btn"
              >
                {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>

              {loginErrorMessage && (
                <Alert severity="error" style={{ marginTop: '0.5rem' }}>
                  {loginErrorMessage}
                </Alert>
              )}

              <Link
                component="button"
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="login-forgot-link"
                variant="body2"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </form>

            <Divider sx={{ my: 2 }}>o continuar con</Divider>

            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              ¿No tienes una cuenta?{' '}
              <Link
                href="#"
                variant="body2"
                className="login-register-link"
                onClick={() => alert('Registrarse')}
              >
                Regístrate
              </Link>
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;