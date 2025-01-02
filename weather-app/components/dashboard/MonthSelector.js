import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const months = [
  { name: "Jan", year: new Date().getFullYear() },
  { name: "Feb" },
  { name: "Mar" },
  { name: "Apr" },
  { name: "May" },
  { name: "Jun" },
  { name: "Jul" },
  { name: "Aug" },
  { name: "Sep" },
  { name: "Oct" },
  { name: "Nov" },
  { name: "Dec" },
];

const MonthSelector = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthClick = (index) => {
    setSelectedMonth(index);
    onMonthChange(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <Box sx={{ }}>
      <Slider {...settings}>
        {months.map((month, index) => (
          <Box
            key={index}
            onClick={() => handleMonthClick(index)}
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer", 
            }}
          >
            <Button
              variant={selectedMonth === index ? "contained" : "outlined"}
              sx={{
                minWidth: "70px",
                height: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                gap: "4px",
                backgroundColor: selectedMonth === index ? "rgba(25, 118, 210, 0.8)" : "white"
              }}
            >
              {month.name === "Jan" && (
                <Typography
                  variant="caption"
                  sx={{ fontSize: "10px", color: selectedMonth === index ? "white" : "#1976d2" }}
                >
                  {month.year}
                </Typography>
              )}
              {month.name}
            </Button>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MonthSelector;
