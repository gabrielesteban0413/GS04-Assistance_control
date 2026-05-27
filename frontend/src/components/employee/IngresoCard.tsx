import React from 'react';

import {
  Typography,
  Paper
} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';

import '../../assets/styles/cards.css';

interface Props {
  onClick: () => void;
}

const IngresoCard: React.FC<Props> = ({
  onClick,
}) => {
  return (
    <Paper
      className="ingreso-card"
      onClick={onClick}
      elevation={3}
    >
      <LoginIcon
        style={{
          fontSize: 40,
          marginBottom: 8,
        }}
      />

      <Typography
        variant="h6"
        style={{
          fontWeight: 'bold',
        }}
      >
        Registrar Ingreso
      </Typography>

      <Typography
        variant="caption"
        style={{
          opacity: 0.8,
        }}
      >
        Marcar llegada al trabajo
      </Typography>
    </Paper>
  );
};

export default IngresoCard;