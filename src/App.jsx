import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Rewards from './components/Rewards';
import Features from './components/Features';
import AIAssistant from './components/AIAssistant';
import Destinations from './components/Destinations';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import MobileApp from './components/MobileApp';
import Footer from './components/Footer';
import ScrollPlane from './components/ScrollPlane';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import ApartmentsPage from './pages/ApartmentsPage';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FCFBF9] text-slate-900 transition-colors duration-300 dark:bg-[#0a1628] dark:text-slate-100 selection:bg-brand-gold-500 selection:text-brand-emerald-950 overflow-x-hidden">
      <ScrollPlane />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <AIAssistant />
        <Statistics />
        <Destinations />
        <Testimonials />
        <Rewards />
        <MobileApp />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    async function getUserCountry() {
      try {
        const res = await fetch('https://ipwho.is/');
        if (!res.ok) throw new Error('Failed to fetch IP location');
        const data = await res.json();
        console.log("User detected location:", data);
        console.log("User country:", data.country);
      } catch (err) {
        console.error("Failed to detect location:", err);
      }
    }
    getUserCountry();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/hotel/:id" element={<HotelDetailPage />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
      <Route path="/apartments" element={<ApartmentsPage />} />
    </Routes>
  );
}

export default App;
