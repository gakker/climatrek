import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from "react-chartjs-2";

const WeatherDetails = ({ weatherMetrics }) => {
  const generateChartData = (data, label, color) => ({
    labels: weatherMetrics.days,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}33`, 
        tension: 0.4,
        fill: true,
      },
    ],
  });

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Weather Details
      </Typography>
      <Grid container spacing={3}>
        {/* Temperature */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Temperature
              </Typography>
              <Line
                data={generateChartData(
                  weatherMetrics.temperature,
                  "Temperature (°C)",
                  "#FF5722"
                )}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    y: { title: { display: true, text: "°C" } },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        {/* Humidity */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Humidity
              </Typography>
              <Line
                data={generateChartData(
                  weatherMetrics.humidity,
                  "Humidity (%)",
                  "#03A9F4"
                )}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    y: { title: { display: true, text: "%" } },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        {/* Wind */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Wind Speed
              </Typography>
              <Line
                data={generateChartData(
                  weatherMetrics.wind,
                  "Wind Speed (m/s)",
                  "#8BC34A"
                )}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    y: { title: { display: true, text: "m/s" } },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        {/* Precipitation */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Precipitation
              </Typography>
              <Line
                data={generateChartData(
                  weatherMetrics.precipitation,
                  "Precipitation (mm)",
                  "#673AB7"
                )}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    y: { title: { display: true, text: "mm" } },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeatherDetails;
