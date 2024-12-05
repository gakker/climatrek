import React from 'react';
import Head from 'next/head';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import CurrentWeather from '../components/dashboard/CurrentWeather';
import ForecastGrid from '../components/dashboard/ForecastGrid';
import { Container, Box } from '@mui/material';

const Home = () => {
  return (
    <>
      <Head>
        <title>ClimaTrek - Weather Dashboard</title>
        <meta name="description" content="Track the latest weather updates with ClimaTrek" />
      </Head>
      <Navigation />
      <Container sx={{ py: 4 }}>
        <Box>
          <CurrentWeather />
          <ForecastGrid />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
