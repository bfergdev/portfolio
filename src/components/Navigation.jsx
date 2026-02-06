import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gamepad2, Trophy } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const Navigation = ({ activeSection, onResetGamepads, leaderboard }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const holdTimerRef = useRef(null)
  const mouseDownTimeRef = useRef(null)
  const clickTimerRef = useRef(null)
  const touchStartTimeRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Show name when scrolled past 400px (approximately past the hero name)
      setShowName(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-primary-500/20"
        style={{ 
          userSelect: 'none', 
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer relative"
                onClick={() => {
                  // Clear any existing click timer
                  if (clickTimerRef.current) {
                    clearTimeout(clickTimerRef.current)
                  }
                  
                  // Delay single click action to allow double-click to fire
                  clickTimerRef.current = setTimeout(() => {
                    if (!showLeaderboard) {
                      onResetGamepads()
                      scrollToSection('home')
                    }
                  }, 200)
                }}
                onDoubleClick={(e) => {
                  e.preventDefault()
                  // Clear single click timer on double-click
                  if (clickTimerRef.current) {
                    clearTimeout(clickTimerRef.current)
                    clickTimerRef.current = null
                  }
                  setShowLeaderboard(!showLeaderboard)
                }}
                onTouchStart={(e) => {
                  touchStartTimeRef.current = Date.now()
                  holdTimerRef.current = setTimeout(() => {
                    setShowLeaderboard(true)
                    holdTimerRef.current = null
                  }, 500)
                }}
                onTouchEnd={(e) => {
                  const touchDuration = Date.now() - (touchStartTimeRef.current || 0)
                  
                  if (holdTimerRef.current) {
                    clearTimeout(holdTimerRef.current)
                    holdTimerRef.current = null
                  }
                  
                  // If it was a quick tap (< 500ms) and leaderboard is not showing, reset game
                  if (touchDuration < 500 && !showLeaderboard) {
                    onResetGamepads()
                    scrollToSection('home')
                  }
                  
                  if (showLeaderboard) {
                    e.stopPropagation()
                  }
                  setShowLeaderboard(false)
                  touchStartTimeRef.current = null
                }}
              >
                <Gamepad2 className="w-8 h-8 text-primary-400" />
              </motion.div>

              {/* Name that appears next to icon on scroll */}
              <AnimatePresence>
                {showName && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="cursor-pointer whitespace-nowrap flex items-center gap-2"
                    onClick={() => scrollToSection('home')}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                  >
                    <span className="text-xl font-bold text-gradient">Brian Ferguson</span>
                    <span className="text-lg text-white hidden sm:inline">- Principal Game Designer</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-2xl font-medium ${
                  activeSection === item.id
                    ? 'text-gradient'
                    : 'text-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Leaderboard Popup */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black bg-opacity-80"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              className="bg-slate-900 border-2 border-yellow-400 rounded-lg p-6 md:p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: 'monospace', userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">LEADERBOARD</h2>
                </div>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3">
                {leaderboard && leaderboard.length > 0 ? (
                  leaderboard.slice(0, 10).map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-3 rounded ${
                        index === 0 ? 'bg-yellow-400/20 border border-yellow-400/50' :
                        index === 1 ? 'bg-gray-400/20 border border-gray-400/50' :
                        index === 2 ? 'bg-orange-400/20 border border-orange-400/50' :
                        'bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xl font-bold w-8 ${
                          index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-300' :
                          index === 2 ? 'text-orange-400' :
                          'text-gray-500'
                        }`}>
                          {index + 1}.
                        </span>
                        <span className="text-lg font-bold text-white">
                          {entry.initials}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400">
                          {entry.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {entry.kills} kills • {entry.time}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    No scores yet. Be the first!
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
