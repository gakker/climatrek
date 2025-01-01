import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog, WiThunderstorm } from "react-icons/wi"; // Weather icons from react-icons
import axios from "axios";

const MonthlyClimateCalendar = ({ location }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMonthlyClimateData();
  }, [location]);

  const fetchMonthlyClimateData = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      // Process the 5-day data into daily data
      const groupedData = response.data.list.reduce((acc, entry) => {
        const date = entry.dt_txt.split(" ")[0]; // Extract date
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
      }, {});

      // Simulate monthly data by reusing the 5-day data for the whole month
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const simulatedData = Array.from({ length: daysInMonth }, (_, day) => {
        const date = Object.keys(groupedData)[day % Object.keys(groupedData).length];
        const dayEntries = groupedData[date] || [];
        const avgTemp = dayEntries.reduce((sum, entry) => sum + entry.main.temp, 0) / dayEntries.length || "--";
        const condition = dayEntries[0]?.weather[0]?.main || "N/A";
        return { day: day + 1, temp: Math.round(avgTemp), condition };
      });

      setMonthlyData(simulatedData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={36} color="#FFD700" />;
      case "Clouds":
        return <WiCloud size={36} color="#B0C4DE" />;
      case "Rain":
        return <WiRain size={36} color="#4682B4" />;
      case "Snow":
        return <WiSnow size={36} color="#ADD8E6" />;
      case "Fog":
      case "Mist":
        return <WiFog size={36} color="#A9A9A9" />;
      case "Thunderstorm":
        return <WiThunderstorm size={36} color="#4B0082" />;
      default:
        return <WiCloud size={36} color="#B0C4DE" />;
    }
  };

  const generateCalendarGrid = () =>
    monthlyData.map((data) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={data.day}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {`${data.day}`}
          </Typography>
          {getWeatherIcon(data.condition)}
          <Typography variant="body2">{`${data.temp}°C`}</Typography>
          <Typography variant="body2">{data.condition}</Typography>
        </Paper>
      </Grid>
    ));

  if (loading) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
        Loading calendar...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{ textAlign: "center", mt: 3 }}>
        Failed to load monthly climate data. Please try again later.
      </Typography>
    );
  }

  return (
    <Box >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
        Monthly Climate Calendar
      </Typography>
      <Grid container spacing={2}>{generateCalendarGrid()}</Grid>
    </Box>
  );
};

export default MonthlyClimateCalendar;
