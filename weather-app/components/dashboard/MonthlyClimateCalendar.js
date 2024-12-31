import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
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

      const groupedData = response.data.list.reduce((acc, entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
      }, {});

      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const simulatedData = Array.from({ length: daysInMonth }, (_, day) => {
        const date = Object.keys(groupedData)[day % Object.keys(groupedData).length];
        const dayEntries = groupedData[date] || [];
        const avgTemp = dayEntries.reduce((sum, entry) => sum + entry.main.temp, 0) / dayEntries.length || "--";
        const condition = dayEntries[0]?.weather[0]?.main || "N/A";
        const icon = dayEntries[0]?.weather[0]?.icon;
        return { day: day + 1, temp: Math.round(avgTemp), condition, icon };
      });

      setMonthlyData(simulatedData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const generateCalendarGrid = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

    const blankDays = Array(firstDay).fill(null);
    const calendarDays = blankDays.concat(monthlyData);

    return (
      <>
        {daysOfWeek.map((day) => (
          <Grid item xs={1.7} key={day} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2">{day}</Typography>
          </Grid>
        ))}
        {calendarDays.map((data, index) =>
          data ? (
            <Grid item xs={1.7} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Typography variant="body2">{data.day}</Typography>
                <img
                  src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                  alt={data.condition}
                  style={{ width: "50px" }}
                />
                <Typography variant="body2">{`${data.temp}°C`}</Typography>
                <Typography variant="body2">{data.condition}</Typography>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={1.7} key={index}></Grid>
          )
        )}
      </>
    );
  };

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
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
        Monthly Climate Calendar
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {generateCalendarGrid()}
      </Grid>
    </Box>
  );
};

export default MonthlyClimateCalendar;
