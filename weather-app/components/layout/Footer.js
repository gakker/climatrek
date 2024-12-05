import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        py: 2,
        textAlign: 'center',
        mt: 3,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} ClimaTrek. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
