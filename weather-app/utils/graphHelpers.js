// utils/graphHelpers.js
export const generateLineGraphData = (weeklyForecast) => ({
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
  });
  
  export const generateBarGraphData = (weeklyForecast) => ({
    labels: weeklyForecast.map((day) => day.day),
    datasets: [
      {
        label: "Precipitation (%)",
        data: weeklyForecast.map((day) => day.precipitation || 0),
        backgroundColor: "rgba(33, 150, 243, 0.4)",
      },
    ],
  });
  
  export const generateComparisonGraphData = (weeklyForecast) => ({
    labels: weeklyForecast.map((day) => day.day),
    datasets: [
      {
        label: "Average Temp (°C)",
        data: weeklyForecast.map((day) => day.temp),
        backgroundColor: "rgba(76, 175, 80, 0.6)",
      },
      {
        label: "Max Temp (°C)",
        data: weeklyForecast.map((day) => day.tempMax),
        backgroundColor: "rgba(244, 67, 54, 0.6)",
      },
      {
        label: "Min Temp (°C)",
        data: weeklyForecast.map((day) => day.tempMin),
        backgroundColor: "rgba(33, 150, 243, 0.6)",
      },
    ],
  });
  