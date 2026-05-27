import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Avatar,
  Grid
} from '@mui/material';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import IngresoCard from '../../components/employee/IngresoCard';
import SalidaCard from '../../components/employee/SalidaCard';

import '../../assets/styles/dashboardempleados.css';

interface DashboardPageProps {
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  onLogout
}) => {

  const navigate = useNavigate();

  const [userName] = useState('Ana María');

  const [userEmail] = useState(
    'ana.morales@empresa.com'
  );

  const [fechaActual] = useState(
    new Date().toLocaleDateString(
      'es-ES',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      }
    )
  );

  const [horaActual] = useState(
    new Date().toLocaleTimeString(
      'es-ES',
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    )
  );

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState('');

  const [snackbarSeverity, setSnackbarSeverity] =
    useState<
      'success' |
      'info' |
      'warning' |
      'error'
    >('success');

  const showMessage = (
    message: string,
    severity:
      | 'success'
      | 'info'
      | 'warning'
      | 'error'
  ) => {

    setSnackbarMessage(message);

    setSnackbarSeverity(severity);

    setOpenSnackbar(true);
  };

  const handleRegistrarIngreso = () => {

    const ahora = new Date();

    const hora =
      ahora.toLocaleTimeString(
        'es-ES',
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      );

    const fecha =
      ahora.toLocaleDateString('es-ES');

    showMessage(
      `Ingreso registrado a las ${hora} del ${fecha}`,
      'success'
    );
  };

  const handleRegistrarSalida = () => {

    const ahora = new Date();

    const hora =
      ahora.toLocaleTimeString(
        'es-ES',
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      );

    const fecha =
      ahora.toLocaleDateString('es-ES');

    showMessage(
      `Salida registrada a las ${hora} del ${fecha}`,
      'success'
    );
  };

  const handleLogout = () => {

    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (

    <Box className="dashboard-container">

      <Card className="dashboard-card">

        <CardContent className="dashboard-card-content">

          {/* USUARIO */}

          <Box className="dashboard-user">

            <Avatar className="dashboard-avatar">

              {userName.charAt(0)}

            </Avatar>

            <Box>

              <Typography className="dashboard-user-title">

                ¡Hola, {userName}!

              </Typography>

              <Typography className="dashboard-user-email">

                {userEmail}

              </Typography>

            </Box>

          </Box>

          {/* FECHA Y HORA */}

          <Grid
            container
            spacing={2}
            className="dashboard-info-container"
          >

            <Grid size={6}>

              <Box className="dashboard-info-box">

                <TodayIcon className="dashboard-info-icon" />

                <Typography className="dashboard-info-text">

                  {fechaActual}

                </Typography>

              </Box>

            </Grid>

            <Grid size={6}>

              <Box className="dashboard-info-box">

                <AccessTimeIcon className="dashboard-info-icon" />

                <Typography className="dashboard-info-text">

                  {horaActual}

                </Typography>

              </Box>

            </Grid>

          </Grid>

          {/* CARDS */}

          <Grid
            container
            spacing={3}
            className="dashboard-cards"
          >

            <Grid size={{ xs: 12, sm: 6 }}>

              <IngresoCard
                onClick={handleRegistrarIngreso}
              />

            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>

              <SalidaCard
                onClick={handleRegistrarSalida}
              />

            </Grid>

          </Grid>

          {/* LOGOUT */}

          <Box className="dashboard-logout">

            <Button
              variant="text"
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              size="small"
              className="dashboard-logout-button"
            >

              Cerrar Sesión

            </Button>

          </Box>

        </CardContent>

      </Card>

      {/* ALERTA */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() =>
          setOpenSnackbar(false)
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >

        <Alert
          severity={snackbarSeverity}
          className="dashboard-alert"
          iconMapping={{
            success:
              <CheckCircleIcon fontSize="inherit" />
          }}
        >

          {snackbarMessage}

        </Alert>

      </Snackbar>

    </Box>
  );
};

export default DashboardPage;