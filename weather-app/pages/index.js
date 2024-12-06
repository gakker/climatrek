import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../components/layout/Footer';
import CurrentWeather from '../components/dashboard/CurrentWeather';
import ForecastGrid from '../components/dashboard/ForecastGrid';
import Navigation from '../components/layout/Navigation';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const [location, setLocation] = useState('New York');

  const handleLocationSearch = (newLocation) => {
    setLocation(newLocation);
    console.log(`Searching weather for: ${newLocation}`);
  };

  return (
    <>
      <Head>
        <title>ClimaTrek</title>
        <meta name="description" content="Track the latest weather updates with ClimaTrek" />
      </Head>
      <Navigation onSearch={handleLocationSearch} />
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Weather for: {location}
        </Typography>
        <CurrentWeather />
        <ForecastGrid />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
