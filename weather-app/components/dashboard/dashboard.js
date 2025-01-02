import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography, Box, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import WeeklyHighlights from "./WeeklyHighlights";
import WeeklyCard from "./WeeklyCard";
import GraphSection from "./GraphSection";
import HourlyForecast from "./HourlyForecast";
import WeatherDetails from "./WeatherDetails";
import MonthlyClimateCalendar from "./MonthlyClimateCalendar";
import SunriseSunsetVisualization from "./SunriseSunsetVisualization";
import {
  generateLineGraphData,
  generateBarGraphData,
  generateComparisonGraphData,
} from "../../utils/graphHelpers";
import DynamicMonthlyClimate from "./DynamicMonthlyClimate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = ({ location }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sunData, setSunData] = useState(null);

  useEffect(() => {
    const cachedData = sessionStorage.getItem(`forecast_${location}`);
    if (cachedData) {
      setWeeklyForecast(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const currentWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      const sunrise = new Date(
        currentWeather.data.sys.sunrise * 1000
      ).toLocaleTimeString();
      const sunset = new Date(
        currentWeather.data.sys.sunset * 1000
      ).toLocaleTimeString();

      setSunData({ sunrise, sunset });

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

      sessionStorage.setItem(
        `forecast_${location}`,
        JSON.stringify(formattedData.slice(0, 7))
      );
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

  const lineGraphData = generateLineGraphData(weeklyForecast);
  const barGraphData = generateBarGraphData(weeklyForecast);
  const comparisonGraphData = generateComparisonGraphData(weeklyForecast);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Weekly Weather Dashboard
      </Typography>

      <WeeklyHighlights weeklyForecast={weeklyForecast} />

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
            {weeklyForecast.map((day, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <WeeklyCard dayData={day} onClick={() => handleDayClick(day)} />
              </Grid>
            ))}
          </Grid>

          {/* Graph Section */}
          <GraphSection
            lineGraphData={lineGraphData}
            barGraphData={barGraphData}
            comparisonGraphData={comparisonGraphData}
          />

          {/* Sunrise and Sunset Visualization */}
          {sunData && (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                Sunrise & Sunset Visualization
              </Typography>
              <SunriseSunsetVisualization sunData={sunData} />
            </Box>
          )}
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

      {/* Monthly Climate Calendar */}
      {/* <Box sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, background:'rgb(130 182 224 / 80%)' }}>
          <MonthlyClimateCalendar location={location} />
        </Paper>
      </Box> */}
      {/* <DynamicMonthlyClimate location={location} /> */}

      <Box sx={{ mt: 6 }}>
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: 2, background: "rgb(130 182 224 / 80%)" }}
        >
          <DynamicMonthlyClimate location={location} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
