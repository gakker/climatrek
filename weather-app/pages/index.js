import Head from 'next/head';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="A simple weather forecast app" />
      </Head>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h2>Welcome to the Weather App</h2>
        <p>Get the latest weather updates for any location.</p>
      </main>
    </>
  );
};

export default Home;
