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
  const [explodingGamepads, setExplodingGamepads] = useState(new Set())
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
    } else if (gamepads.length === 0 && invaderMode) {
      // Only exit invader mode when ALL gamepads are destroyed
      setInvaderMode(false)
      // Clear all projectiles and particles
      setProjectiles([])
      setParticles([])
      // Respawn default gamepad above the text
      setGamepads([{ id: 0, x: 0, y: -200, color: 'text-primary-400' }])
    }
  }, [gamepads.length, invaderMode])

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
                // Mark gamepad as exploding
                setExplodingGamepads(prev => new Set([...prev, gamepad.id]))
                createExplosion(gamepad.x, gamepad.y, gamepad.color)
                // Remove gamepad after explosion animation
                setTimeout(() => {
                  setExplodingGamepads(prev => {
                    const next = new Set(prev)
                    next.delete(gamepad.id)
                    return next
                  })
                }, 300)
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
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        opacity: p.opacity - 0.02
      })).filter(p => p.opacity > 0))
    }, 30)

    return () => clearInterval(interval)
  }, [particles.length])

  const createExplosion = (x, y, color) => {
    // Create more particles with varied sizes and speeds
    const newParticles = Array.from({ length: 40 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 40
      const speed = 3 + Math.random() * 8
      const size = 2 + Math.random() * 4
      return {
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        opacity: 1,
        size,
        rotation: Math.random() * 360
      }
    })
    
    // Add a bright flash particle at the center
    newParticles.push({
      id: Date.now() + 1000,
      x,
      y,
      vx: 0,
      vy: 0,
      color: color,
      opacity: 1,
      size: 15,
      rotation: 0
    })
    
    setParticles(prev => [...prev, ...newParticles])
  }

  const handleMouseMove = (e) => {
    if (!invaderMode) return
    
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return

    // Calculate position relative to the center of the container
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    setCursorPos({ x: mouseX, y: mouseY })
  }

  const handleHeroClick = (e) => {
    if (!invaderMode) return
    
    e.stopPropagation()

    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return

    // Calculate position relative to the center of the container
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const clickX = e.clientX - centerX
    const clickY = e.clientY - centerY

    setProjectiles(prev => [...prev, {
      id: Date.now(),
      x: clickX,
      y: clickY
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
      className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${invaderMode ? 'select-none' : ''}`}
      style={{ cursor: invaderMode ? 'crosshair' : 'default' }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
          onClick={handleHeroClick}
          onMouseMove={handleMouseMove}
        >
          {gamepads.map((gamepad) => (
            <motion.div
              key={gamepad.id}
              initial={gamepad.isNew ? { scale: 0, opacity: 0, rotate: -180 } : { scale: 0 }}
              animate={{ 
                scale: explodingGamepads.has(gamepad.id) ? [1, 1.5, 0] : 1,
                opacity: explodingGamepads.has(gamepad.id) ? [1, 1, 0] : 1,
                rotate: explodingGamepads.has(gamepad.id) ? [0, 180, 360] : 0,
                x: gamepad.x,
                y: gamepad.y
              }}
              transition={explodingGamepads.has(gamepad.id) ? {
                duration: 0.3,
                ease: 'easeOut'
              } : gamepad.isNew ? { 
                type: 'spring',
                stiffness: 200,
                damping: 15,
                duration: 0.5
              } : { 
                type: 'spring',
                stiffness: 200
              }}
              drag={!invaderMode}
              dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
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

          {/* Projectiles */}
          <AnimatePresence>
            {projectiles.map(projectile => (
              <motion.div
                key={projectile.id}
                initial={{ 
                  opacity: 1,
                  x: projectile.x,
                  y: projectile.y
                }}
                animate={{ 
                  y: projectile.y - 400
                }}
                exit={{ opacity: 0 }}
                className="absolute w-1 h-4 bg-gradient-to-t from-green-400 to-green-300 rounded-full"
                style={{ 
                  left: '50%',
                  top: '50%',
                  zIndex: 100,
                  boxShadow: '0 0 8px #4ade80, 0 0 15px #4ade80, 0 0 20px #22c55e'
                }}
              />
            ))}
          </AnimatePresence>

          {/* Particles */}
          <AnimatePresence>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                style={{ 
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  x: particle.x,
                  y: particle.y,
                  opacity: particle.opacity,
                  zIndex: 99,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  borderRadius: '50%',
                  transform: `rotate(${particle.rotation}deg)`,
                  backgroundColor: particle.color === 'text-primary-400' ? '#60a5fa' :
                                   particle.color === 'text-accent-400' ? '#22d3ee' :
                                   particle.color === 'text-green-400' ? '#4ade80' :
                                   particle.color === 'text-yellow-400' ? '#facc15' :
                                   particle.color === 'text-pink-400' ? '#f472b6' :
                                   particle.color === 'text-purple-400' ? '#c084fc' :
                                   particle.color === 'text-orange-400' ? '#fb923c' :
                                   particle.color === 'text-red-400' ? '#f87171' :
                                   particle.color === 'text-cyan-400' ? '#22d3ee' :
                                   particle.color === 'text-blue-400' ? '#60a5fa' : '#ffffff',
                  boxShadow: `0 0 ${particle.size}px currentColor, 0 0 ${particle.size * 2}px currentColor`
                }}
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
              Principal Game Designer
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
