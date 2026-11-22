import Hero from './components/Hero.jsx';
import Programs from './components/Programs.jsx';
import Process from './components/Process.jsx';
import CpnEstimator from './components/CpnEstimator.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="aurora min-h-screen">
      <Hero />
      <main>
        <ChatWindow />
        <Programs />
        <Process />
        <CpnEstimator />
      </main>
      <Footer />
    </div>
  );
}
