import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import Home from './pages/Home/Home';

export default function App() {
  return (
    <div className="bg-brand-dark text-slate-200 font-sans antialiased selection:bg-cyan-400 selection:text-black overflow-x-hidden min-h-screen">
      {/* Atmospheric orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulseGlow" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] animate-pulseGlow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] animate-pulseGlow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Home />
      </main>
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
