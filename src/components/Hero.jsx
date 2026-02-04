import { motion } from 'framer-motion'
import { ChevronDown, Gamepad2, Sparkles } from 'lucide-react'
import { useState } from 'react'

const Hero = () => {
  const [gamepads, setGamepads] = useState([
    { id: 0, x: 0, y: 0, color: 'text-primary-400' }
  ])
  const [nextId, setNextId] = useState(1)

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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
      { id: nextId, x: gamepad.x - 30, y: gamepad.y - 30, color: newColor1 },
      { id: nextId + 1, x: gamepad.x + 30, y: gamepad.y + 30, color: newColor2 }
    ]
    
    setGamepads(prev => [...prev.filter(gp => gp.id !== gamepad.id), ...newGamepads])
    setNextId(prev => prev + 2)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                x: gamepad.x,
                y: gamepad.y
              }}
              transition={{ 
                scale: { delay: 0.2, type: 'spring', stiffness: 200 }
              }}
              drag
              dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
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
              className="inline-block cursor-grab absolute"
              style={{ zIndex: 10 + gamepad.id }}
            >
              <div className="relative">
                <Gamepad2 className={`w-20 h-20 ${gamepad.color} animate-float`} />
                <Sparkles className="w-8 h-8 text-accent-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </motion.div>
          ))}

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
