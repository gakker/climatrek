import React from "react";
import { Grid, Card, Typography, Box, Stack } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

const MonthlyClimateCalendar = ({ monthlyData }) => {
  const getIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WbSunnyIcon color="warning" fontSize="large" />;
      case "Clouds":
        return <CloudIcon color="action" fontSize="large" />;
      case "Rain":
        return <UmbrellaIcon color="primary" fontSize="large" />;
      default:
        return <WbSunnyIcon fontSize="large" />;
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
      {monthlyData.map((day) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={day.date}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: 1,
              border: "1px solid #e0e0e0",
              backgroundColor: "#f9f9f9",
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            <Stack spacing={1} alignItems="center">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {day.date}
              </Typography>
              <Box>{getIcon(day.condition)}</Box>
              <Typography variant="body1" sx={{ fontWeight: "500", color: "#555" }}>
                {`Temp: ${day.temp}°C`}
              </Typography>
              <Typography variant="body2" sx={{ color: "#777" }}>
                {day.condition}
              </Typography>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MonthlyClimateCalendar;
