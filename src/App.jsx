import Ticker from './components/layout/Ticker';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import TrustRibbon from './components/hero/TrustRibbon';
import StrategiesSection from './components/strategies/StrategiesSection';
import PerformanceSection from './components/performance/PerformanceSection';
import EdgeSection from './components/edge/EdgeSection';
import CalculatorSection from './components/calculator/CalculatorSection';
import FaqSection from './components/faq/FaqSection';
import ContactSection from './components/contact/ContactSection';

export default function App() {
  return (
    <div className="bg-brand-dark text-slate-200 font-sans antialiased selection:bg-brand-cyan selection:text-black overflow-x-hidden min-h-screen">
      {/* Background Atmospheric Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulseGlow" />
        <div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] animate-pulseGlow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] animate-pulseGlow"
          style={{ animationDelay: '4s' }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Live Ticker */}
      <Ticker />

      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <TrustRibbon />
        <StrategiesSection />
        <PerformanceSection />
        <EdgeSection />
        <CalculatorSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
