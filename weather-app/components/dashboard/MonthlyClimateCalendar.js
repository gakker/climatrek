import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

const MonthlyClimateCalendar = ({ monthlyData }) => {
  const getIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WbSunnyIcon color="warning" />;
      case "Clouds":
        return <CloudIcon color="action" />;
      case "Rain":
        return <UmbrellaIcon color="primary" />;
      default:
        return <WbSunnyIcon />;
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {monthlyData.map((day) => (
        <Grid item xs={12} sm={6} md={3} key={day.date}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">{day.date}</Typography>
            {getIcon(day.condition)}
            <Typography variant="body1">{`Temp: ${day.temp}°C`}</Typography>
            <Typography variant="body2">{day.condition}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MonthlyClimateCalendar;
