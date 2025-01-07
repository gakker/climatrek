import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import axios from "axios";

const CurrentWeather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      setWeatherData(response.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
        Failed to load weather data. Please try again later.
      </Typography>
    );
  }

  return (
    <Card sx={{ minWidth: 275, textAlign: "center", mb: 3 }}>
      <CardContent>
        {weatherData ? (
          <>
            <Typography variant="h5" gutterBottom>
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
                width={100}
                height={100}
              />
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {Math.round(weatherData.main.temp)}°C
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {weatherData.weather[0].description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Feels like: {Math.round(weatherData.main.feels_like)}°C | Humidity: {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body2">
              Wind: {weatherData.wind.speed} m/s | Visibility: {weatherData.visibility / 1000} km
            </Typography>
          </>
        ) : (
          <Typography variant="body1">No weather data available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
