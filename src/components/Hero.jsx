import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Gamepad2, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const Hero = ({ gamepads, setGamepads, nextId, setNextId, onReset, onAddToLeaderboard }) => {
  const [invaderMode, setInvaderMode] = useState(false)
  const [formationOffset, setFormationOffset] = useState(0)
  const [direction, setDirection] = useState(1)
  const [projectiles, setProjectiles] = useState([])
  const [particles, setParticles] = useState([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [explodingGamepads, setExplodingGamepads] = useState(new Set())
  const [floatingNumber, setFloatingNumber] = useState(null)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [score, setScore] = useState(0)
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [levelComplete, setLevelComplete] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [playerInitials, setPlayerInitials] = useState(['_', '_', '_'])
  const [currentInitialIndex, setCurrentInitialIndex] = useState(0)
  const heroRef = useRef(null)
  const mobileInputRef = useRef(null)

  // Disable scrolling during invader mode
  useEffect(() => {
    if (invaderMode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [invaderMode])

  // Reset game over state when gamepads are reset externally
  useEffect(() => {
    if (gamepads.length === 1 && gamepads[0].id === 0 && gameOver) {
      setGameOver(false)
      setInvaderMode(false)
      setShowScoreboard(false)
      setFloatingNumber(null)
      setProjectiles([])
      setParticles([])
      setCurrentLevel(1)
      setScore(0)
      setFinalScore(0)
      setPlayerInitials(['_', '_', '_'])
      setCurrentInitialIndex(0)
      setIsCountingDown(false)
      setLevelComplete(false)
    }
  }, [gamepads, gameOver])

  // Handle initial entry for game over screen
  useEffect(() => {
    if (!gameOver) return

    // Auto-focus mobile input on mobile devices
    if (mobileInputRef.current && window.innerWidth < 768) {
      setTimeout(() => mobileInputRef.current?.focus(), 100)
    }

    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase()
      
      if (key === 'ENTER' && currentInitialIndex >= 1) {
        // Save to leaderboard
        if (onAddToLeaderboard) {
          onAddToLeaderboard({
            initials: playerInitials.join(''),
            score: finalScore,
            kills: score,
            time: `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`,
            timestamp: Date.now()
          })
        }
        // Reset game
        if (onReset) {
          onReset()
        }
        setGameOver(false)
        setInvaderMode(false)
        setShowScoreboard(false)
        setFloatingNumber(null)
        setProjectiles([])
        setParticles([])
        setCurrentLevel(1)
        setScore(0)
        setFinalScore(0)
        setPlayerInitials(['_', '_', '_'])
        setCurrentInitialIndex(0)
        setIsCountingDown(false)
        setLevelComplete(false)
      } else if (key === 'BACKSPACE' && currentInitialIndex > 0) {
        setCurrentInitialIndex(prev => prev - 1)
        setPlayerInitials(prev => {
          const newInitials = [...prev]
          newInitials[currentInitialIndex - 1] = '_'
          return newInitials
        })
      } else if (/^[A-Z]$/.test(key) && currentInitialIndex < 3) {
        setPlayerInitials(prev => {
          const newInitials = [...prev]
          newInitials[currentInitialIndex] = key
          return newInitials
        })
        setCurrentInitialIndex(prev => prev + 1)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameOver, currentInitialIndex])

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

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Activate invader mode when 5+ gamepads
  useEffect(() => {
    if (gamepads.length >= 5 && !invaderMode && !isCountingDown) {
      // Start countdown from 5 to 0
      setIsCountingDown(true)
      setFloatingNumber({
        value: 5,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0
      })
      
      // Countdown animation
      let count = 5
      const countdownInterval = setInterval(() => {
        count--
        if (count > 0) {
          setFloatingNumber(prev => {
            if (!prev) return null
            return { 
              ...prev, 
              value: count
            }
          })
        } else {
          clearInterval(countdownInterval)
          setIsCountingDown(false)
          setFloatingNumber(null)
          setShowScoreboard(true)
          setScore(0)
          setInvaderMode(true)
          
          // Arrange gamepads in formation
          const cols = 5
          setGamepads(prev => prev.map((gp, index) => ({
            ...gp,
            formationX: (index % cols) * (window.innerWidth >= 768 ? 80 : 40) - (window.innerWidth >= 768 ? 160 : 80),
            formationY: Math.floor(index / cols) * (window.innerWidth >= 768 ? 60 : 30) - (window.innerWidth >= 768 ? 150 : 75),
            x: (index % cols) * (window.innerWidth >= 768 ? 80 : 40) - (window.innerWidth >= 768 ? 160 : 80),
            y: Math.floor(index / cols) * (window.innerWidth >= 768 ? 60 : 30) - (window.innerWidth >= 768 ? 150 : 75)
          })))
        }
      }, 500) // 0.5 seconds per number
    } else if (gamepads.length === 0 && invaderMode) {
      // Level complete! All invaders destroyed
      setLevelComplete(true)
      
      // Wait a moment then check if game is complete or scroll to next section
      setTimeout(() => {
        // Check if this was the final level (level 5)
        if (currentLevel >= 5) {
          // Game complete! Calculate final score
          // Score formula: kills * 100 + time bonus (max 5000 points for fast completion)
          // Time bonus: 5000 - (elapsedTime * 10), minimum 0
          const timeBonus = Math.max(0, 5000 - (elapsedTime * 10))
          const calculatedScore = (score * 100) + timeBonus
          setFinalScore(calculatedScore)
          setGameOver(true)
        } else {
          // Continue to next level
          const sections = ['about', 'projects', 'skills', 'contact']
          const nextSection = sections[currentLevel - 1] // currentLevel is 1-based
          
          if (nextSection) {
            const element = document.getElementById(nextSection)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }
          
          // Prepare for next level
          setTimeout(() => {
            setCurrentLevel(prev => prev + 1)
            setInvaderMode(false)
            setLevelComplete(false)
            
            // Clear all particles and projectiles to prevent artifacts
            setParticles([])
            setProjectiles([])
            
            // Spawn new wave for next level (start with 5, add 5 per level)
            const nextLevelGamepads = Array.from({ length: 5 + currentLevel * 5 }, (_, i) => ({
              id: i,
              x: (i % 5) * 80 - 160,
              y: Math.floor(i / 5) * (window.innerWidth >= 768 ? 60 : 30) - (window.innerWidth >= 768 ? 150 : 75),
              color: colors[i % colors.length],
              formationX: (i % 5) * (window.innerWidth >= 768 ? 80 : 40) - (window.innerWidth >= 768 ? 160 : 80),
              formationY: Math.floor(i / 5) * (window.innerWidth >= 768 ? 60 : 30) - (window.innerWidth >= 768 ? 150 : 75)
            }))
            
            setGamepads(nextLevelGamepads)
            setInvaderMode(true)
          }, 2000) // 2 second delay before starting next level
        }
      }, 1500) // 1.5 second victory pause
    }
  }, [gamepads.length, invaderMode, isCountingDown])

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
      const projectilesToRemove = new Set()
      const gamepadsToRemove = new Set()
      const projectileKillCounts = new Map() // Track kills per projectile
      
      // Check collisions first before updating positions
      setProjectiles(prevProjectiles => {
        setGamepads(prevGamepads => {
          // Early exit if no projectiles or gamepads
          if (prevProjectiles.length === 0 || prevGamepads.length === 0) {
            return prevGamepads
          }
          
          prevProjectiles.forEach((projectile, pIndex) => {
            if (projectilesToRemove.has(pIndex)) return // Skip already marked projectiles
            
            prevGamepads.forEach((gamepad, gIndex) => {
              if (gamepadsToRemove.has(gIndex)) return
              
              // Optimized distance check - avoid sqrt when possible
              const dx = projectile.x - gamepad.x
              const dy = projectile.y - gamepad.y
              const distanceSquared = dx * dx + dy * dy
              
              if (distanceSquared < 1600) { // 40 * 40 = 1600
                projectilesToRemove.add(pIndex)
                gamepadsToRemove.add(gIndex)
                // Track kills for this projectile
                projectileKillCounts.set(pIndex, (projectileKillCounts.get(pIndex) || 0) + 1)
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
                }, 100)
              }
            })
          })
          
          // Award points based on multi-kills
          projectileKillCounts.forEach((killCount) => {
            if (killCount > 1) {
              // Multi-kill: 1.5 points per kill, rounded up
              const points = Math.ceil(killCount * 1.5)
              setScore(prev => prev + points)
            } else {
              // Single kill: 1 point
              setScore(prev => prev + 1)
            }
          })
          
          return prevGamepads.filter((_, i) => !gamepadsToRemove.has(i))
        })
        
        // Update positions and remove hit projectiles in one operation
        return prevProjectiles
          .filter((_, i) => !projectilesToRemove.has(i))
          .map(p => ({ ...p, y: p.y - 10 }))
          .filter(p => p.y > -1200)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [invaderMode])

  // Update particles
  useEffect(() => {
    if (particles.length === 0 || !invaderMode) return

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        opacity: p.opacity - 0.03
      })).filter(p => p.opacity > 0))
    }, 30)

    return () => clearInterval(interval)
  }, [particles.length, invaderMode])

  // Timer for game duration
  useEffect(() => {
    if (!invaderMode || gameOver) {
      if (!invaderMode && !gameOver) {
        setElapsedTime(0)
      }
      return
    }

    const startTime = Date.now() - (elapsedTime * 1000)
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [invaderMode, gameOver])

  // Update floating number physics
  useEffect(() => {
    if (!floatingNumber || isCountingDown || showScoreboard) return

    const interval = setInterval(() => {
      setFloatingNumber(prev => {
        if (!prev) return null

        let newX = prev.x + prev.vx
        let newY = prev.y + prev.vy
        let newVx = prev.vx
        let newVy = prev.vy

        // Boundary collision (bounce off edges) - smaller boundary for mobile visibility
        const boundary = window.innerWidth >= 768 ? 350 : 150
        if (Math.abs(newX) > boundary) {
          newVx = -newVx
          newX = newX > 0 ? boundary : -boundary
        }
        if (Math.abs(newY) > boundary) {
          newVy = -newVy
          newY = newY > 0 ? boundary : -boundary
        }

        // Controller collision detection
        gamepads.forEach(gamepad => {
          const dx = newX - gamepad.x
          const dy = newY - gamepad.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = 60 // Number size + controller size

          if (distance < minDistance) {
            // Calculate bounce direction
            const angle = Math.atan2(dy, dx)
            const speed = Math.sqrt(newVx * newVx + newVy * newVy)
            
            // Reflect velocity
            newVx = Math.cos(angle) * speed * 1.2
            newVy = Math.sin(angle) * speed * 1.2
            
            // Push number away from controller
            const overlap = minDistance - distance
            newX += Math.cos(angle) * overlap
            newY += Math.sin(angle) * overlap
          }
        })

        // Add slight damping to prevent infinite bouncing
        newVx *= 0.99
        newVy *= 0.99

        return {
          ...prev,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        }
      })
    }, 30)

    return () => clearInterval(interval)
  }, [floatingNumber, isCountingDown, showScoreboard, gamepads])

  const createExplosion = (x, y, color) => {
    // Create particles with varied sizes and speeds (reduced from 40 to 20 for performance)
    const newParticles = Array.from({ length: 20 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 20
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
    
    // Remove particles after animation (reduced from 800ms to 400ms to prevent artifacts)
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 400)
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
    // Disable cloning during countdown or invader mode
    if (isCountingDown || invaderMode) return
    
    // Clones inherit parent color
    const newGamepads = [
      { id: nextId, x: gamepad.x - 50, y: gamepad.y - 50, color: gamepad.color, isNew: true },
      { id: nextId + 1, x: gamepad.x + 50, y: gamepad.y + 50, color: gamepad.color, isNew: true }
    ]
    
    setGamepads(prev => {
      const newCount = prev.length + 1 // +1 because we're removing 1 and adding 2
      
      // Spawn or update floating number (starts at 2 for first clone, max 5)
      if (newCount >= 2 && newCount <= 5) {
        setFloatingNumber({
          value: newCount,
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 300,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2
        })
      }
      
      return [...prev.filter(gp => gp.id !== gamepad.id), ...newGamepads]
    })
    setNextId(prev => prev + 2)
    
    // Remove isNew flag after animation
    setTimeout(() => {
      setGamepads(prev => prev.map(gp => ({ ...gp, isNew: false })))
    }, 500)
  }

  return (
    <div 
      className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${invaderMode ? 'select-none cursor-rocket' : ''}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Fixed game overlay when invader mode is active */}
      {invaderMode && (
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleHeroClick}
          onMouseMove={handleMouseMove}
          style={{ pointerEvents: 'auto' }}
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
                duration: 0.15,
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
              className="inline-block absolute pointer-events-none"
              style={{ 
                zIndex: 10 + gamepad.id,
                willChange: 'transform, opacity'
              }}
            >
              <div className="relative">
                <div className={`w-10 h-10 md:w-20 md:h-20 rounded-lg ${gamepad.color.replace('text-', 'bg-')} opacity-30 absolute inset-0`} />
                <Gamepad2 className={`w-10 h-10 md:w-20 md:h-20 ${gamepad.color} animate-float relative z-10`} fill="currentColor" fillOpacity="0.3" />
                <Sparkles className="w-4 h-4 md:w-8 md:h-8 text-accent-400 absolute -top-1 -right-1 md:-top-2 md:-right-2 animate-pulse z-20" />
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
                  y: projectile.y - 1200
                }}
                className="absolute w-1 h-4 bg-gradient-to-t from-green-400 to-green-300 rounded-full"
                style={{ 
                  left: '50%',
                  top: '50%',
                  zIndex: 100,
                  boxShadow: '0 0 8px #4ade80, 0 0 15px #4ade80, 0 0 20px #22c55e',
                  willChange: 'transform'
                }}
              />
            ))}
          </AnimatePresence>

          {/* Particles */}
          <AnimatePresence>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                initial={{
                  x: particle.x,
                  y: particle.y,
                  opacity: particle.opacity
                }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: particle.opacity
                }}
                transition={{ duration: 0 }}
                exit={{ opacity: 0 }}
                className="inline-block absolute rounded-full"
                style={{ 
                  zIndex: 99,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
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
                  boxShadow: `0 0 ${particle.size}px currentColor, 0 0 ${particle.size * 2}px currentColor`,
                  willChange: 'transform, opacity'
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          ref={!invaderMode ? heroRef : null}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
          onClick={!invaderMode ? handleHeroClick : undefined}
          onMouseMove={!invaderMode ? handleMouseMove : undefined}
        >
          {!invaderMode && gamepads.map((gamepad) => (
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
                duration: 0.15,
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
              drag={true}
              dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              onDragEnd={(e, info) => {
                setGamepads(prev => prev.map(gp => 
                  gp.id === gamepad.id ? { ...gp, x: gp.x + info.offset.x, y: gp.y + info.offset.y } : gp
                ))
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileDrag={{ scale: 1.2, rotate: 10, cursor: 'grabbing' }}
              onTap={() => handleGamepadClick(gamepad.id)}
              onDoubleClick={() => handleGamepadDoubleClick(gamepad)}
              className="inline-block absolute cursor-grab"
              style={{ zIndex: 10 + gamepad.id }}
            >
              <div className="relative">
                <div className={`w-10 h-10 md:w-20 md:h-20 rounded-lg ${gamepad.color.replace('text-', 'bg-')} opacity-30 absolute inset-0`} />
                <Gamepad2 className={`w-10 h-10 md:w-20 md:h-20 ${gamepad.color} animate-float relative z-10`} fill="currentColor" fillOpacity="0.3" />
                <Sparkles className="w-4 h-4 md:w-8 md:h-8 text-accent-400 absolute -top-1 -right-1 md:-top-2 md:-right-2 animate-pulse z-20" />
              </div>
            </motion.div>
          ))}

          {/* Scoreboard */}
          {showScoreboard && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed top-16 right-1 md:right-2 text-3xl md:text-6xl font-bold text-green-400 pointer-events-none"
                style={{ 
                  zIndex: 9999,
                  textAlign: 'right',
                  minWidth: '3rem',
                  textShadow: '0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 30px #22c55e'
                }}
              >
                {score}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-[4.05rem] md:top-24 right-1 md:right-2 text-xl md:text-2xl font-bold text-accent-400 pointer-events-none"
                style={{ zIndex: 9999 }}
              >
                Lv {currentLevel}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-[5.5rem] md:top-32 right-1 md:right-2 text-sm md:text-lg font-bold text-white pointer-events-none"
                style={{ zIndex: 9999 }}
              >
                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
              </motion.div>
            </>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-90"
            >
              <div className="text-center space-y-8 px-4">
                <motion.h1
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  className="text-4xl md:text-6xl font-bold text-yellow-400 mb-8"
                  style={{
                    fontFamily: 'monospace',
                    textShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b'
                  }}
                >
                  CONGRATULATIONS!
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="text-4xl md:text-8xl font-bold text-yellow-400" style={{ fontFamily: 'monospace' }}>
                    {finalScore.toLocaleString()}
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-green-400" style={{ fontFamily: 'monospace' }}>
                    KILLS: {score}
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-cyan-400" style={{ fontFamily: 'monospace' }}>
                    TIME: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 space-y-4"
                >
                  <div className="text-xl md:text-2xl text-white" style={{ fontFamily: 'monospace' }}>
                    ENTER YOUR INITIALS
                  </div>
                  {/* Hidden input for mobile keyboard */}
                  <input
                    ref={mobileInputRef}
                    type="text"
                    inputMode="text"
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value=""
                    className="md:hidden fixed opacity-0 pointer-events-none"
                    style={{ position: 'absolute', left: '-9999px' }}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase()
                      if (value && /^[A-Z]$/.test(value) && currentInitialIndex < 3) {
                        setPlayerInitials(prev => {
                          const newInitials = [...prev]
                          newInitials[currentInitialIndex] = value
                          return newInitials
                        })
                        setCurrentInitialIndex(prev => prev + 1)
                        e.target.value = ''
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && currentInitialIndex >= 1) {
                        e.preventDefault()
                        // Save to leaderboard
                        if (onAddToLeaderboard) {
                          onAddToLeaderboard({
                            initials: playerInitials.join(''),
                            score: finalScore,
                            kills: score,
                            time: `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`,
                            timestamp: Date.now()
                          })
                        }
                        if (onReset) onReset()
                        setGameOver(false)
                        setInvaderMode(false)
                        setShowScoreboard(false)
                        setFloatingNumber(null)
                        setProjectiles([])
                        setParticles([])
                        setCurrentLevel(1)
                        setScore(0)
                        setFinalScore(0)
                        setPlayerInitials(['_', '_', '_'])
                        setCurrentInitialIndex(0)
                        setIsCountingDown(false)
                        setLevelComplete(false)
                      } else if (e.key === 'Backspace' && currentInitialIndex > 0) {
                        e.preventDefault()
                        setCurrentInitialIndex(prev => prev - 1)
                        setPlayerInitials(prev => {
                          const newInitials = [...prev]
                          newInitials[currentInitialIndex - 1] = '_'
                          return newInitials
                        })
                      }
                    }}
                  />
                  <div className="flex justify-center gap-4 md:gap-8" onClick={() => mobileInputRef.current?.focus()}>
                    {playerInitials.map((initial, index) => (
                      <motion.div
                        key={index}
                        animate={{
                          scale: currentInitialIndex === index ? [1, 1.2, 1] : 1,
                          color: currentInitialIndex === index ? '#fbbf24' : '#ffffff'
                        }}
                        transition={{ duration: 0.5, repeat: currentInitialIndex === index ? Infinity : 0 }}
                        className="text-5xl md:text-7xl font-bold border-b-4 border-white w-16 md:w-24 text-center"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {initial}
                      </motion.div>
                    ))}
                  </div>
                  {currentInitialIndex >= 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-lg md:text-xl text-green-400 mt-8"
                      style={{ fontFamily: 'monospace' }}
                    >
                      PRESS ENTER TO CONTINUE
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[2.7rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold overflow-visible"
          >
            <span className="block text-white mb-2">Brian Ferguson</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold overflow-visible"
          >
            <span className="block text-gradient glow-text leading-tight pb-2">
              Principal Game Designer
            </span>
          </motion.h2>

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

      {/* Universal Number Display - Always top right, purpose changes */}
      {floatingNumber && !showScoreboard && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: isCountingDown && floatingNumber.value <= 3 ? [1, 1.2, 1] : 1
          }}
          transition={isCountingDown && floatingNumber.value <= 3 ? { 
            scale: { duration: 0.4, repeat: Infinity }
          } : {}}
          className={`fixed top-16 right-1 md:right-2 text-3xl md:text-6xl font-bold pointer-events-none ${
            isCountingDown 
              ? floatingNumber.value <= 3 
                ? 'text-red-500' 
                : 'text-yellow-400'
              : 'text-green-400'
          }`}
          style={{ 
            zIndex: 9999,
            textAlign: 'right',
            minWidth: '3rem',
            textShadow: isCountingDown 
              ? floatingNumber.value <= 3
                ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #dc2626'
                : '0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #f59e0b'
              : '0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 30px #22c55e'
          }}
        >
          {floatingNumber.value}
        </motion.div>
      )}
    </div>
  )
}

export default Hero
