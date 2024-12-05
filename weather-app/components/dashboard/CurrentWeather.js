import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CurrentWeather = () => {
  return (
    <Card sx={{ minWidth: 275, textAlign: 'center', mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          New York, NY
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            25°C
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sunny
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
