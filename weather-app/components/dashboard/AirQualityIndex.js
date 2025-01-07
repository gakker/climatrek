import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import AirIcon from "@mui/icons-material/Air";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import NatureIcon from "@mui/icons-material/Nature"; 

const pollutantIcons = {
  pm2_5: <GrainIcon color="primary" />,
  pm10: <WhatshotIcon color="secondary" />,
  no2: <AirIcon color="info" />,
  co: <NatureIcon color="success" />,
  o3: <AirIcon color="warning" />,
};

const AirQualityIndex = ({ location }) => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAqiData = async () => {
    try {
      setLoading(true);
      setError(false);

      // Fetch coordinates for the location
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      if (geoResponse.data.length === 0) {
        throw new Error("Location not found");
      }

      const { lat, lon } = geoResponse.data[0];

      // Fetch AQI data for the coordinates
      const aqiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      setAqiData(aqiResponse.data.list[0]);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAqiData();
  }, [location]);

  const getAqiLevel = (aqi) => {
    switch (aqi) {
      case 1:
        return { label: "Good", color: "green" };
      case 2:
        return { label: "Fair", color: "blue" };
      case 3:
        return { label: "Moderate", color: "orange" };
      case 4:
        return { label: "Poor", color: "red" };
      case 5:
        return { label: "Very Poor", color: "purple" };
      default:
        return { label: "Unknown", color: "gray" };
    }
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Air Quality Index (AQI)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Failed to load air quality data. Please try again later.
        </Typography>
      ) : aqiData ? (
        <Card
          sx={{
            maxWidth: "95%", // Adjusted width to be wider
            margin: "0 auto",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: getAqiLevel(aqiData.main.aqi).color,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            AQI Level: {getAqiLevel(aqiData.main.aqi).label}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(aqiData.main.aqi / 5) * 100}
            sx={{
              height: 12,
              borderRadius: 5,
              mb: 4,
              backgroundColor: "#f0f0f0",
            }}
          />
          <Grid container spacing={3}>
            {Object.entries(aqiData.components).map(([key, value]) => (
              <Grid item xs={6} md={4} lg={3} key={key}>
                <Card
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 2,
                  }}
                >
                  {pollutantIcons[key] || <AirIcon />}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    {key.toUpperCase()}
                  </Typography>
                  <Typography variant="body2">{value} µg/m³</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      ) : (
        <Typography>No air quality data available.</Typography>
      )}
    </Box>
  );
};

export default AirQualityIndex;
