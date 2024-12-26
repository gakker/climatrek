// components/Dashboard/WeeklyCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { WiDaySunny } from "react-icons/wi"; // Default icon
import iconMapping from "../../utils/iconMapping";

const WeeklyCard = ({ dayData, onClick }) => {
  const WeatherIcon = iconMapping[dayData.condition] || WiDaySunny;

  return (
    <Card
      sx={{
        textAlign: "center",
        background: `linear-gradient(to bottom right, rgba(25, 118, 210, 0.8), rgba(33, 150, 243, 0.8))`,
        color: "#FFFFFF",
        boxShadow: 3,
        borderRadius: 3,
        cursor: "pointer",
        border:
          dayData.day ===
          new Date().toLocaleDateString("en-US", { weekday: "long" })
            ? "3px solid #FFEB3B"
            : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 20px rgba(33, 150, 243, 0.5)",
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <WeatherIcon size={60} color="#FFEB3B" />
        <Typography variant="h6">{dayData.day}</Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#FFEB3B" }}
        >
          {dayData.temp}°C
        </Typography>
        <Typography variant="body1" sx={{ color: "#E3F2FD" }}>
          {dayData.condition}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeeklyCard;
