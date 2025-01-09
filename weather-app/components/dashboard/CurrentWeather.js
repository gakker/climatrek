import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
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
        .format("h:mm A");
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

  const getWeatherIcon = (icon) =>
    icon ? `https://openweathermap.org/img/wn/${icon}@4x.png` : "";

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 700,
        margin: "0 auto",
        borderRadius: 4,
        background: "linear-gradient(to bottom, #2196F3, #FFFFFF)",

        padding: 3,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load weather data.</Typography>
      ) : weatherData ? (
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h6">{currentTime}</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Image
              src={getWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              width={80}
              height={80}
            />
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              {Math.round(weatherData.main.temp)}°C
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", textTransform: "capitalize", mb: 3 }}
          >
            {weatherData.weather[0].description}
          </Typography>

          {/* Horizontal Metrics Layout */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 3,
              padding: 2,
              borderRadius: 2,
              background: "#94c0f3",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">Air Quality</Typography>
              <Typography variant="h6">33</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">Wind</Typography>
              <Typography variant="h6">
                {Math.round(weatherData.wind.speed)} mph
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">Humidity</Typography>
              <Typography variant="h6">{weatherData.main.humidity}%</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">Visibility</Typography>
              <Typography variant="h6">
                {(weatherData.visibility / 1609.34).toFixed(1)} mi
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">Pressure</Typography>
              <Typography variant="h6">
                {weatherData.main.pressure} in
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">Dew Point</Typography>
              <Typography variant="h6">7°F</Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
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
        <Typography>No weather data available.</Typography>
      )}
    </Card>
  );
};

export default CurrentWeather;
