import { motion } from 'framer-motion'
import { ChevronDown, Gamepad2, Sparkles } from 'lucide-react'

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            drag
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileDrag={{ scale: 1.2, rotate: 10, cursor: 'grabbing' }}
            className="inline-block cursor-grab"
          >
            <div className="relative">
              <Gamepad2 className="w-20 h-20 text-primary-400 animate-float" />
              <Sparkles className="w-8 h-8 text-accent-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </motion.div>

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
