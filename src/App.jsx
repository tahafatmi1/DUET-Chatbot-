import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Facts from './components/Facts.jsx';
import Programs from './components/Programs.jsx';
import Process from './components/Process.jsx';
import Campus from './components/Campus.jsx';
import CpnEstimator from './components/CpnEstimator.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import FloatingAsk from './components/FloatingAsk.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Facts />
        <Programs />
        <Process />
        <Campus />
        <CpnEstimator />
        <Faq />
      </main>
      <Footer />
      <FloatingAsk />
    </>
  );
}
