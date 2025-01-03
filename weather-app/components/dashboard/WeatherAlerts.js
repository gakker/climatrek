import React, { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherAlerts = ({ location }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,daily&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        const alertData = response.data.alerts || [];
        setAlerts(alertData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchAlerts();
    }
  }, [location]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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
        Failed to load weather alerts. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Weather Alerts
      </Typography>
      {alerts.length > 0 ? (
        <Slider {...settings}>
          {alerts.map((alert, index) => (
            <Card
              key={index}
              sx={{
                p: 2,
                bgcolor: alert.event.includes("Warning") ? "error.light" : "warning.light",
              }}
            >
              <Typography variant="h6">{alert.event}</Typography>
              <Typography variant="body2">
                {alert.description || "No description available"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", mt: 1, display: "block" }}
              >
                {`Issued by: ${alert.sender_name}`}
              </Typography>
            </Card>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
          No weather alerts for today.
        </Typography>
      )}
    </Box>
  );
};

export default WeatherAlerts;
