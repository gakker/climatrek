import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../components/layout/Footer';
import CurrentWeather from '../components/dashboard/CurrentWeather';
import ForecastGrid from '../components/dashboard/ForecastGrid';
import Navigation from '../components/layout/Navigation';
import { Container, Typography } from '@mui/material';
import Dashboard from '../components/dashboard/dashboard';

const Home = () => {
  const [location, setLocation] = useState('lahore');

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
        <CurrentWeather  location={location}/>
        <Dashboard location = {location}/> 
      </Container>
      <Footer />
    </>
  );
};

export default Home;
