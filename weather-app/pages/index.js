import Head from 'next/head';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <>
      <Head>
        <title>ClimaTrek</title>
        <meta name="description" content="A simple weather forecast app" />
      </Head>
      <Navigation />
      <main style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>Welcome to ClimaTrek</h2>
        <p>Get the latest weather updates for any location.</p>
      </main>
      <Footer />
    </>
  );
};

export default Home;
