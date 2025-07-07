import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const CircularButton = ({ onClick, padding }) => {
  return (
    <Tooltip title="Informasi">
      <IconButton
        onClick={onClick} // fungsi untuk dijalankan tombol pada saat di-pencet
        sx={{
          position: 'fixed',
          top: 16,
          left: padding, // sesuaikan dengan sidebar width + padding
          zIndex: 1300,
          backgroundColor: 'transparent',
          color: 'primary.main',
          borderRadius: '50%',
          width: 48,
          height: 48,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // efek hover transparan
          },
        }}
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CircularButton;
