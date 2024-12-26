// components/Dashboard/WeeklyHighlights.js
import React from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { WiThermometer, WiRain, WiStrongWind } from "react-icons/wi";

const WeeklyHighlights = ({ weeklyForecast }) => {
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

  return (
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
  );
};

export default WeeklyHighlights;
