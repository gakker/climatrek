import React from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";

const SunriseSunsetVisualization = ({ sunData }) => {
  const chartData = {
    labels: ["Midnight", "Sunrise", "Noon", "Sunset", "Midnight"],
    datasets: [
      {
        label: "Sun Position",
        data: [0, 25, 100, 75, 0], // Example Data
        borderColor: "#FFA726",
        backgroundColor: "rgba(255, 167, 38, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
        Sunrise: {sunData.sunrise}, Sunset: {sunData.sunset}
      </Typography>
      <Line data={chartData} />
    </Box>
  );
};

export default SunriseSunsetVisualization;
