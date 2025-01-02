import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import MonthSelector from "./MonthSelector";
import MonthlyClimateCalendar from "./MonthlyClimateCalendar";

const DynamicMonthlyClimate = ({ location }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMonthlyData = async (month) => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      const filteredData = response.data.list
        .map((entry) => ({
          date: entry.dt_txt.split(" ")[0],
          temp: Math.round(entry.main.temp),
          condition: entry.weather[0].main,
        }))
        .filter((entry) => new Date(entry.date).getMonth() === month);

      setMonthlyData(filteredData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyData(selectedMonth);
  }, [selectedMonth]);

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Monthly Climate Overview
      </Typography>

      {/* Month Selector */}
      <MonthSelector onMonthChange={setSelectedMonth} />

      {/* Loading / Error / Calendar */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
          Failed to load monthly climate data. Please try again later.
        </Typography>
      ) : (
        <MonthlyClimateCalendar monthlyData={monthlyData} />
      )}
    </Box>
  );
};

export default DynamicMonthlyClimate;
