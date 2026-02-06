import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import ParticleBackground from './components/ParticleBackground'
import { supabase } from './lib/supabase'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  
  // Responsive controller positioning: above title on desktop, below on mobile
  const getInitialY = () => window.innerWidth >= 768 ? -80 : 50
  
  const [gamepads, setGamepads] = useState([
    { id: 0, x: 0, y: getInitialY(), color: 'text-primary-400' }
  ])
  const [nextId, setNextId] = useState(1)
  
  // Leaderboard state with Supabase persistence
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true)
  
  // Fetch leaderboard from Supabase on mount
  useEffect(() => {
    fetchLeaderboard()
  }, [])
  
  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(50)
      
      if (error) throw error
      setLeaderboard(data || [])
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      // Fallback to localStorage if Supabase fails
      const saved = localStorage.getItem('gameLeaderboard')
      setLeaderboard(saved ? JSON.parse(saved) : [])
    } finally {
      setIsLoadingLeaderboard(false)
    }
  }
  
  const addToLeaderboard = async (entry) => {
    try {
      // Remove timestamp field - Supabase uses created_at which is auto-generated
      const { timestamp, ...entryData } = entry
      
      // Insert into Supabase
      const { error } = await supabase
        .from('leaderboard')
        .insert([entryData])
      
      if (error) throw error
      
      // Refresh leaderboard
      await fetchLeaderboard()
    } catch (error) {
      console.error('Error adding to leaderboard:', error)
      // Fallback to localStorage
      const newLeaderboard = [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 50)
      setLeaderboard(newLeaderboard)
      localStorage.setItem('gameLeaderboard', JSON.stringify(newLeaderboard))
    }
  }

  const resetGamepads = () => {
    setGamepads([{ id: 0, x: 0, y: getInitialY(), color: 'text-primary-400' }])
    setNextId(1)
  }
  
  // Update controller position on window resize
  useEffect(() => {
    const handleResize = () => {
      setGamepads(prev => {
        // Only update if there's a single default gamepad
        if (prev.length === 1 && prev[0].id === 0) {
          return [{ ...prev[0], y: getInitialY() }]
        }
        return prev
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      <Navigation activeSection={activeSection} onResetGamepads={resetGamepads} leaderboard={leaderboard} />
      
      <main className="relative z-10">
        <section id="home">
          <Hero gamepads={gamepads} setGamepads={setGamepads} nextId={nextId} setNextId={setNextId} onReset={resetGamepads} onAddToLeaderboard={addToLeaderboard} />
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
