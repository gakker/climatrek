import React from "react";
import { Box, Typography } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";

const GraphSection = ({ lineGraphData, barGraphData, comparisonGraphData }) => {
  return (
    <Box sx={{ mt: 6 }}>
      {/* Temperature Trends */}
      <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
        Temperature Trends
      </Typography>
      <Line data={lineGraphData} />

      {/* Precipitation Overview */}
      <Typography variant="h6" sx={{ textAlign: "center", mt: 6 }}>
        Precipitation Overview
      </Typography>
      <Bar data={barGraphData} />

      {/* Compare Temperatures */}
      <Typography variant="h6" sx={{ textAlign: "center", mt: 6 }}>
        Compare Temperatures
      </Typography>
      <Bar data={comparisonGraphData} />
    </Box>
  );
};

export default GraphSection;
