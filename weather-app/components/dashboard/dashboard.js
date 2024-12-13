import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import axios from 'axios';

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD700' }} />;
    case 'clouds':
      return <CloudIcon sx={{ fontSize: 40, color: '#90A4AE' }} />;
    case 'rain':
      return <OpacityIcon sx={{ fontSize: 40, color: '#2196F3' }} />;
    case 'thunderstorm':
      return <ThunderstormIcon sx={{ fontSize: 40, color: '#673AB7' }} />;
    case 'snow':
      return <AcUnitIcon sx={{ fontSize: 40, color: '#00ACC1' }} />;
    default:
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD700' }} />;
  }
};

const Dashboard = ({ location }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(false);
    
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=6a1135adf8e1bb1844a8b6d56812b69e`
        );
    
        // Group data by date
        const groupedData = response.data.list.reduce((acc, entry) => {
          const date = entry.dt_txt.split(' ')[0]; // Extract date from dt_txt
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(entry);
          return acc;
        }, {});
    
        // Process each group to calculate daily averages
        const formattedData = Object.keys(groupedData).map((date) => {
          const dayEntries = groupedData[date];
          const avgTemp =
            dayEntries.reduce((sum, entry) => sum + entry.main.temp, 0) / dayEntries.length;
          const condition = dayEntries[0].weather[0].main; // Take the condition of the first entry
          const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    
          return {
            day,
            temp: Math.round(avgTemp),
            condition,
          };
        });
    
        setWeeklyForecast(formattedData.slice(0, 7)); // Take only the next 7 days
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [location]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Weekly Forecast for {location}
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
          Failed to load weather data. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {weeklyForecast.map((day, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  {getWeatherIcon(day.condition)}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {day.day}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, fontWeight: 'bold', color: '#1976D2' }}
                  >
                    {day.temp}°C
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#757575' }}>
                    {day.condition}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
