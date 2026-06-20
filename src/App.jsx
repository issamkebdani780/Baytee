import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AIAssistant from './components/AIAssistant';
import Destinations from './components/Destinations';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ScrollPlane from './components/ScrollPlane';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FCFBF9] text-slate-900 transition-colors duration-300 dark:bg-[#07140e] dark:text-slate-100 selection:bg-brand-gold-500 selection:text-brand-emerald-950 overflow-x-hidden">
      {/* Scroll Plane Effect */}
      <ScrollPlane />

      {/* Sticky Premium Navigation Header */}
      <Header />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Banner & Search Widget */}
        <Hero />

        {/* Feature Grid Section */}
        <Features />

        {/* Dynamic AI Assistant Section */}
        <AIAssistant />

        {/* Stat Metrics Counter Panel */}
        <Statistics />

        {/* High Fidelity Destinations Gallery */}
        <Destinations />

        {/* Reviews Carousel Slider */}
        <Testimonials />

        {/* Flexible Subscription Plans */}
        <Pricing />

        {/* Final Conversion Call To Action */}
        <FinalCTA />
      </main>

      {/* Multi-Column Corporate Footer */}
      <Footer />
    </div>
  );
}

export default App;
