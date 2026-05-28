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
  Grid,
  Modal,
  TextField
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

  const [openSnackbar,
    setOpenSnackbar] =
    useState(false);

  const [snackbarMessage,
    setSnackbarMessage] =
    useState('');

  const [snackbarSeverity,
    setSnackbarSeverity] =
    useState<
      'success'
      | 'info'
      | 'warning'
      | 'error'
    >('success');

  /* MODAL */

  const [openModal,
    setOpenModal] =
    useState(false);

  const [email,
    setEmail] =
    useState('');

  const [tipoRegistro,
    setTipoRegistro] =
    useState<
      'ingreso'
      | 'salida'
      | null
    >(null);

  /* MENSAJES */

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

  /* INGRESO */

  const handleRegistrarIngreso =
    () => {

      setTipoRegistro(
        'ingreso'
      );

      setOpenModal(true);
    };

  /* SALIDA */

  const handleRegistrarSalida =
    () => {

      setTipoRegistro(
        'salida'
      );

      setOpenModal(true);
    };

  /* VALIDAR EMAIL */

  const validarCorreo = (
    correo: string
  ) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      correo
    );
  };

  /* CONFIRMAR */

  const handleConfirmarRegistro =
    () => {

      if (!email) {

        showMessage(
          'Debes ingresar un correo electrónico',
          'warning'
        );

        return;
      }

      if (!validarCorreo(email)) {

        showMessage(
          'Correo electrónico inválido',
          'error'
        );

        return;
      }

      const ahora =
        new Date();

      const hora =
        ahora.toLocaleTimeString(
          'es-ES',
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        );

      if (
        tipoRegistro ===
        'ingreso'
      ) {

        showMessage(
          `Ingreso registrado a las ${hora}`,
          'success'
        );

      } else {

        showMessage(
          `Salida registrada a las ${hora}`,
          'success'
        );
      }

      setEmail('');

      setOpenModal(false);
    };

  return (

    <Box className="dashboard-container">

      <Card className="dashboard-card">

        <CardContent className="dashboard-card-content">

          {/* USUARIO */}

          <Box className="dashboard-user">

            <Avatar className="dashboard-avatar">

              E

            </Avatar>

            <Box>

              <Typography className="dashboard-user-title">

                Empleado

              </Typography>

              <Typography className="dashboard-user-email">

                empleado@empresa.com

              </Typography>

            </Box>

          </Box>

          {/* CARDS */}

          <Grid
            container
            spacing={3}
            className="dashboard-cards"
          >

            <Grid size={{ xs: 12, sm: 6 }}>

              <IngresoCard
                onClick={
                  handleRegistrarIngreso
                }
              />

            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>

              <SalidaCard
                onClick={
                  handleRegistrarSalida
                }
              />

            </Grid>

          </Grid>

        </CardContent>

      </Card>

      {/* MODAL */}

      <Modal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
      >

        <Box className="dashboard-modal">

          <Typography
            variant="h6"
            className="dashboard-modal-title"
          >

            {tipoRegistro ===
            'ingreso'
              ? 'Registrar Ingreso'
              : 'Registrar Salida'}

          </Typography>

          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="dashboard-modal-input"
          />

          <Button
            variant="contained"
            onClick={
              handleConfirmarRegistro
            }
            className="dashboard-modal-button"
          >

            Confirmar

          </Button>

        </Box>

      </Modal>

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
          severity={
            snackbarSeverity
          }
          className="dashboard-alert"
          iconMapping={{
            success:
              <CheckCircleIcon
                fontSize="inherit"
              />
          }}
        >

          {snackbarMessage}

        </Alert>

      </Snackbar>

    </Box>
  );
};

export default DashboardPage;