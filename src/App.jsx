import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import Quiz from './components/Quiz'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import StarField from './components/StarField'
import './index.css'

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#080c14' }}>
      <StarField />
      <div className="relative" style={{ zIndex: 10 }}>
        <Header />
        <main>
          <Hero />
          <About />
          <Destinations />
          <Quiz />
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  )
}
