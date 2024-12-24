import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { WiThermometer, WiRain, WiStrongWind } from "react-icons/wi";
import { Line, Bar } from "react-chartjs-2";
import HourlyForecast from "./HourlyForecast";
import iconMapping from "../../utils/iconMapping";
import WeatherDetails from "./WeatherDetails";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const Dashboard = ({ location }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

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
        const maxTemp = Math.max(
          ...dayEntries.map((entry) => entry.main.temp_max)
        );
        const minTemp = Math.min(
          ...dayEntries.map((entry) => entry.main.temp_min)
        );
        const condition = dayEntries[0].weather[0].main;
        const precipitation = Math.max(
          ...dayEntries.map((entry) => entry.pop * 100)
        );
        const windSpeed = Math.max(
          ...dayEntries.map((entry) => entry.wind.speed)
        );
        const day = new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
        });

        return {
          day,
          temp: Math.round(avgTemp),
          tempMax: Math.round(maxTemp),
          tempMin: Math.round(minTemp),
          condition,
          precipitation,
          windSpeed,
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

  const averageTemperature =
    weeklyForecast.reduce((sum, day) => sum + day.temp, 0) /
    weeklyForecast.length;

  const totalPrecipitation = weeklyForecast.reduce(
    (sum, day) => sum + day.precipitation,
    0
  );

  const highestWindSpeed = Math.max(
    ...weeklyForecast.map((day) => day.windSpeed)
  );

  const lineGraphData = {
    labels: weeklyForecast.map((day) => day.day),
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: weeklyForecast.map((day) => day.tempMax),
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.4)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Min Temperature (°C)",
        data: weeklyForecast.map((day) => day.tempMin),
        borderColor: "#03A9F4",
        backgroundColor: "rgba(3, 169, 244, 0.4)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barGraphData = {
    labels: weeklyForecast.map((day) => day.day),
    datasets: [
      {
        label: "Precipitation (%)",
        data: weeklyForecast.map((day) => day.precipitation || 0),  // Handle potential undefined values
        backgroundColor: "rgba(33, 150, 243, 0.4)",
      },
    ],
  };
  

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Weekly Weather Dashboard
      </Typography>

      {/* Weekly Highlights Card */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          background: `linear-gradient(to right, #FF9800, #FFC107)`,
          color: "#FFFFFF",
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Weekly Highlights
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: "center" }}>
                <WiThermometer size={48} color="#FFF" />
                <Typography variant="h6">Avg Temp</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {averageTemperature.toFixed(1)}°C
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: "center" }}>
                <WiRain size={48} color="#FFF" />
                <Typography variant="h6">Total Rain</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {totalPrecipitation.toFixed(1)}%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: "center" }}>
                <WiStrongWind size={48} color="#FFF" />
                <Typography variant="h6">Max Wind</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {highestWindSpeed} km/h
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
          Failed to load weather data. Please try again later.
        </Typography>
      ) : (
        <>
          {/* Weekly Cards */}
          <Grid container spacing={3}>
            {weeklyForecast.map((day, index) => {
              const WeatherIcon = iconMapping[day.condition] || WiDaySunny;

              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      background: `linear-gradient(to bottom right, rgba(25, 118, 210, 0.8), rgba(33, 150, 243, 0.8))`,
                      color: "#FFFFFF",
                      boxShadow: 3,
                      borderRadius: 3,
                      cursor: "pointer",
                      border:
                        day.day ===
                        new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        })
                          ? "3px solid #FFEB3B"
                          : "none",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 8px 20px rgba(33, 150, 243, 0.5)",
                      },
                    }}
                    onClick={() => handleDayClick(day)}
                  >
                    <CardContent>
                      <WeatherIcon size={60} color="#FFEB3B" />
                      <Typography variant="h6">{day.day}</Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#FFEB3B" }}
                      >
                        {day.temp}°C
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#E3F2FD" }}>
                        {day.condition}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Graphs */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
              Temperature Trends
            </Typography>
            <Line data={lineGraphData} options={graphOptions} />

            <Typography variant="h6" sx={{ textAlign: "center", mt: 6 }}>
              Precipitation Overview
            </Typography>
            <Bar data={barGraphData} options={graphOptions} />
          </Box>
        </>
      )}

      <HourlyForecast
        hourlyData={hourlyForecast}
        selectedDay={selectedDay}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />

      <WeatherDetails
        weatherMetrics={{
          days: weeklyForecast.map((day) => day.day),
          temperature: weeklyForecast.map((day) => day.temp),
          humidity: weeklyForecast.map((day) => day.hourly[0].main.humidity),
          wind: weeklyForecast.map((day) => day.hourly[0].wind.speed),
          precipitation: weeklyForecast.map((day) => day.precipitation),
        }}
      />
    </Box>
  );
};

export default Dashboard;
