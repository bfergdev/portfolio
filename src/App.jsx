import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import ParticleBackground from './components/ParticleBackground'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [gamepads, setGamepads] = useState([
    { id: 0, x: 0, y: -100, color: 'text-primary-400' }
  ])
  const [nextId, setNextId] = useState(1)

  const resetGamepads = () => {
    setGamepads([{ id: 0, x: 0, y: -100, color: 'text-primary-400' }])
    setNextId(1)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Navigation activeSection={activeSection} onResetGamepads={resetGamepads} />
      
      <main className="relative z-10">
        <section id="home">
          <Hero gamepads={gamepads} setGamepads={setGamepads} nextId={nextId} setNextId={setNextId} />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  )
}

export default App
