import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Gamepad2, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const Hero = ({ gamepads, setGamepads, nextId, setNextId }) => {
  const [invaderMode, setInvaderMode] = useState(false)
  const [formationOffset, setFormationOffset] = useState(0)
  const [direction, setDirection] = useState(1)
  const [projectiles, setProjectiles] = useState([])
  const [particles, setParticles] = useState([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Activate invader mode when 10+ gamepads
  useEffect(() => {
    if (gamepads.length >= 10 && !invaderMode) {
      setInvaderMode(true)
      // Arrange gamepads in formation
      const cols = 5
      const arrangedGamepads = gamepads.map((gp, index) => ({
        ...gp,
        formationX: (index % cols) * 80 - 160,
        formationY: Math.floor(index / cols) * 60 - 200,
        x: (index % cols) * 80 - 160,
        y: Math.floor(index / cols) * 60 - 200
      }))
      setGamepads(arrangedGamepads)
    } else if (gamepads.length < 10 && invaderMode) {
      setInvaderMode(false)
    }
  }, [gamepads.length])

  // Formation movement animation
  useEffect(() => {
    if (!invaderMode) return

    const interval = setInterval(() => {
      setFormationOffset(prev => {
        const newOffset = prev + (direction * 2)
        if (Math.abs(newOffset) > 100) {
          setDirection(d => -d)
          // Move down slightly
          setGamepads(prev => prev.map(gp => ({
            ...gp,
            formationY: gp.formationY + 10
          })))
        }
        return newOffset
      })

      setGamepads(prev => prev.map(gp => ({
        ...gp,
        x: gp.formationX + formationOffset
      })))
    }, 50)

    return () => clearInterval(interval)
  }, [invaderMode, direction, formationOffset])

  // Update projectiles and check collisions
  useEffect(() => {
    if (!invaderMode) return

    const interval = setInterval(() => {
      // Update projectile positions
      setProjectiles(prev => {
        const updated = prev.map(p => ({ ...p, y: p.y - 10 }))
        return updated.filter(p => p.y > -400)
      })

      // Check collisions
      setProjectiles(prevProjectiles => {
        const projectilesToRemove = new Set()
        
        setGamepads(prevGamepads => {
          const gamepadsToRemove = new Set()
          
          prevProjectiles.forEach((projectile, pIndex) => {
            prevGamepads.forEach((gamepad, gIndex) => {
              if (projectilesToRemove.has(pIndex) || gamepadsToRemove.has(gIndex)) return
              
              const distance = Math.sqrt(
                Math.pow(projectile.x - gamepad.x, 2) + 
                Math.pow(projectile.y - gamepad.y, 2)
              )
              
              if (distance < 40) {
                projectilesToRemove.add(pIndex)
                gamepadsToRemove.add(gIndex)
                createExplosion(gamepad.x, gamepad.y, gamepad.color)
              }
            })
          })
          
          return prevGamepads.filter((_, i) => !gamepadsToRemove.has(i))
        })
        
        return prevProjectiles.filter((_, i) => !projectilesToRemove.has(i))
      })
    }, 30)

    return () => clearInterval(interval)
  }, [invaderMode])

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return

    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          opacity: p.opacity - 0.02
        }))
        return updated.filter(p => p.opacity > 0)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [particles.length])

  const createExplosion = (x, y, color) => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      color,
      opacity: 1
    }))
    setParticles(prev => [...prev, ...newParticles])
  }

  const handleMouseMove = (e) => {
    if (!invaderMode) return
    
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2
    
    setCursorPos({ x: mouseX, y: mouseY })
  }

  const handleHeroClick = (e) => {
    if (!invaderMode) return
    
    e.stopPropagation()

    setProjectiles(prev => [...prev, {
      id: Date.now(),
      x: cursorPos.x,
      y: cursorPos.y
    }])
  }

  const colors = [
    'text-primary-400',
    'text-accent-400', 
    'text-green-400',
    'text-yellow-400',
    'text-pink-400',
    'text-purple-400',
    'text-orange-400',
    'text-red-400',
    'text-cyan-400',
    'text-blue-400'
  ]

  const getRandomColor = (excludeColor) => {
    const availableColors = colors.filter(c => c !== excludeColor)
    return availableColors[Math.floor(Math.random() * availableColors.length)]
  }

  const handleGamepadClick = (id) => {
    setGamepads(prev => prev.map(gp => {
      if (gp.id === id) {
        const newColor = getRandomColor(gp.color)
        return { ...gp, color: newColor }
      }
      return gp
    }))
  }

  const handleGamepadDoubleClick = (gamepad) => {
    const newColor1 = getRandomColor(gamepad.color)
    const newColor2 = getRandomColor(gamepad.color)
    
    const newGamepads = [
      { id: nextId, x: gamepad.x - 50, y: gamepad.y - 50, color: newColor1, isNew: true },
      { id: nextId + 1, x: gamepad.x + 50, y: gamepad.y + 50, color: newColor2, isNew: true }
    ]
    
    setGamepads(prev => [...prev.filter(gp => gp.id !== gamepad.id), ...newGamepads])
    setNextId(prev => prev + 2)
    
    // Remove isNew flag after animation
    setTimeout(() => {
      setGamepads(prev => prev.map(gp => ({ ...gp, isNew: false })))
    }, 500)
  }

  return (
    <div 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${invaderMode ? 'select-none' : ''}`}
      onClick={handleHeroClick}
      onMouseMove={handleMouseMove}
      style={{ cursor: invaderMode ? 'none' : 'default' }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {gamepads.map((gamepad) => (
            <motion.div
              key={gamepad.id}
              initial={gamepad.isNew ? { scale: 0, opacity: 0, rotate: -180 } : { scale: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                rotate: 0,
                x: gamepad.x,
                y: gamepad.y
              }}
              transition={gamepad.isNew ? { 
                type: 'spring',
                stiffness: 300,
                damping: 15,
                duration: 0.5
              } : { 
                scale: { delay: 0.2, type: 'spring', stiffness: 200 }
              }}
              drag={!invaderMode}
              dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              onDragEnd={!invaderMode ? (e, info) => {
                setGamepads(prev => prev.map(gp => 
                  gp.id === gamepad.id ? { ...gp, x: gp.x + info.offset.x, y: gp.y + info.offset.y } : gp
                ))
              } : undefined}
              whileHover={!invaderMode ? { scale: 1.1, rotate: 5 } : {}}
              whileDrag={!invaderMode ? { scale: 1.2, rotate: 10, cursor: 'grabbing' } : {}}
              onTap={!invaderMode ? () => handleGamepadClick(gamepad.id) : undefined}
              onDoubleClick={!invaderMode ? () => handleGamepadDoubleClick(gamepad) : undefined}
              className={`inline-block absolute ${!invaderMode ? 'cursor-grab' : 'pointer-events-none'}`}
              style={{ zIndex: 10 + gamepad.id }}
            >
              <div className="relative">
                <Gamepad2 className={`w-20 h-20 ${gamepad.color} animate-float`} />
                <Sparkles className="w-8 h-8 text-accent-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </motion.div>
          ))}

          {/* Custom Cursor Ship */}
          {invaderMode && (
            <motion.div
              animate={{ x: cursorPos.x, y: cursorPos.y }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 200 }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-primary-400" />
                <div className="absolute top-1 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-accent-400" />
              </div>
            </motion.div>
          )}

          {/* Projectiles */}
          <AnimatePresence>
            {projectiles.map(projectile => (
              <motion.div
                key={projectile.id}
                initial={{ opacity: 1 }}
                animate={{ x: projectile.x, y: projectile.y }}
                exit={{ opacity: 0 }}
                className="absolute w-2 h-8 bg-gradient-to-t from-accent-400 to-primary-400 rounded-full"
                style={{ zIndex: 100 }}
              />
            ))}
          </AnimatePresence>

          {/* Particles */}
          <AnimatePresence>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                animate={{ 
                  x: particle.x, 
                  y: particle.y,
                  opacity: particle.opacity
                }}
                exit={{ opacity: 0 }}
                className={`absolute w-2 h-2 ${particle.color} rounded-full`}
                style={{ zIndex: 99 }}
              />
            ))}
          </AnimatePresence>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold overflow-visible"
          >
            <span className="block text-white mb-2">Brian Ferguson</span>
            <span className="block text-gradient glow-text leading-tight pb-2">
              Senior Game Designer III
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Combat & Systems Designer with 10 years of AAA MMORPG experience.
            Former core designer for Ashes of Creation and EverQuest II, specializing in combat mechanics, 
            class design, and PVP/PVX balance. Available immediately for new opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg font-semibold text-lg shadow-lg shadow-primary-500/50 hover:shadow-primary-500/80 transition-shadow"
            >
              View My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-primary-400 rounded-lg font-semibold text-lg hover:bg-primary-400/10 transition-colors"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary-400 animate-bounce" />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
