import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import moment from "moment-timezone";

const CurrentWeather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

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

  const updateCurrentTime = () => {
    if (weatherData && weatherData.timezone) {
      const localTime = moment()
        .utcOffset(weatherData.timezone / 60)
        .format("dddd, MMMM Do YYYY, h:mm:ss A");
      setCurrentTime(localTime);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    const timer = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(timer);
  }, [weatherData]);

  const getWeatherIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 600,
        textAlign: "center",
        mb: 3,
        margin: "0 auto",
        p: 3,
        background: "linear-gradient(to bottom, #2196F3, #FFFFFF)",
        borderRadius: 4,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load weather data.</Typography>
      ) : weatherData ? (
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {weatherData.name}, {weatherData.sys.country}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {currentTime || "Fetching time..."}
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
              src={getWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              width={80}
              height={80}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#1E90FF",
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              {Math.round(weatherData.main.temp)}°C
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {weatherData.weather[0].description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2">
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body2">
              <strong>Wind:</strong> {Math.round(weatherData.wind.speed)} m/s
            </Typography>
            <Typography variant="body2">
              <strong>Pressure:</strong> {weatherData.main.pressure} hPa
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Sunrise:</strong>{" "}
              {moment
                .unix(weatherData.sys.sunrise)
                .utcOffset(weatherData.timezone / 60)
                .format("h:mm A")}
            </Typography>
            <Typography variant="body2">
              <strong>Sunset:</strong>{" "}
              {moment
                .unix(weatherData.sys.sunset)
                .utcOffset(weatherData.timezone / 60)
                .format("h:mm A")}
            </Typography>
          </Box>
        </CardContent>
      ) : (
        <Typography variant="body1">No weather data available.</Typography>
      )}
    </Card>
  );
};

export default CurrentWeather;
