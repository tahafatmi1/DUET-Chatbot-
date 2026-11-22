import Hero from './components/Hero.jsx';
import Programs from './components/Programs.jsx';
import Process from './components/Process.jsx';
import Calculator from './components/Calculator.jsx';
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
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}
