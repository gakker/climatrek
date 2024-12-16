import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import HourlyForecast from "./HourlyForecast";
import iconMapping from "../../utils/iconMapping";
const Dashboard = ({ location }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        const groupedData = response.data.list.reduce((acc, entry) => {
          const date = entry.dt_txt.split(" ")[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(entry);
          return acc;
        }, {});

        const formattedData = Object.keys(groupedData).map((date) => {
          const dayEntries = groupedData[date];
          const avgTemp =
            dayEntries.reduce((sum, entry) => sum + entry.main.temp, 0) /
            dayEntries.length;
          const condition = dayEntries[0].weather[0].main;
          const day = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
          });

          return {
            day,
            temp: Math.round(avgTemp),
            condition,
            hourly: dayEntries,
          };
        });

        setWeeklyForecast(formattedData.slice(0, 7));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const handleDayClick = (dayData) => {
    setSelectedDay(dayData.day);
    setHourlyForecast(dayData.hourly);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDay(null);
    setHourlyForecast([]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Weekly Forecast for {location}
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
          Failed to load weather data. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            {weeklyForecast.map((day, index) => {
              const WeatherIcon = iconMapping[day.condition] || WiDaySunny; // Default to WiDaySunny if no match

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      background: "#e3f2fd",
                      boxShadow: 3,
                      borderRadius: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDayClick(day)}
                  >
                    <CardContent>
                      <WeatherIcon size={60} color="#1976D2" />
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        {day.day}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ mt: 1, fontWeight: "bold", color: "#1976D2" }}
                      >
                        {day.temp}°C
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#757575" }}>
                        {day.condition}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}

      <HourlyForecast
        hourlyData={hourlyForecast}
        selectedDay={selectedDay}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default Dashboard;
