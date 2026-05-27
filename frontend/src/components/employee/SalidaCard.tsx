import React from 'react';

import {
  Typography,
  Paper
} from '@mui/material';

import ScheduleIcon from '@mui/icons-material/Schedule';

import '../../assets/styles/cards.css';

interface Props {
  onClick: () => void;
}

const SalidaCard: React.FC<Props> = ({
  onClick,
}) => {
  return (
    <Paper
      className="salida-card"
      onClick={onClick}
      elevation={3}
    >
      <ScheduleIcon
        sx={{
          fontSize: 40,
          mb: 1,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
        }}
      >
        Registrar Salida
      </Typography>

      <Typography
        variant="caption"
        sx={{
          opacity: 0.8,
        }}
      >
        Marcar salida del trabajo
      </Typography>
    </Paper>
  );
};

export default SalidaCard;