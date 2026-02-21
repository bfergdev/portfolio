import { motion } from 'framer-motion'
import { Swords, Cog, Scale, DraftingCompass } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Swords,
      title: 'Combat Design',
      description: 'Feature owner of Mage, Tank, and Ranger archetypes with deep combat mechanics',
    },
    {
      icon: Cog,
      title: 'Systems Design',
      description: 'Itemization, tradeskills, economy balance, and character progression systems',
    },
    {
      icon: Scale,
      title: 'PVP/PVX Balance',
      description: 'Expert in competitive balance and player versus player systems',
    },
    {
      icon: DraftingCompass,
      title: 'Multidisciplinary Leadership',
      description: 'Mentorship, oversight, and cross-functional team collaboration',
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Combat & Systems Designer with a decade of experience shaping AAA MMORPGs.
            Former Senior Game Designer at Intrepid Studios (Ashes of Creation) and 
            Associate Game Designer at Sony Online Entertainment (EverQuest II franchise).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 h-full">
                <feature.icon className="w-12 h-12 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">10+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">5</div>
              <div className="text-gray-400">Shipped Titles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">3</div>
              <div className="text-gray-400">Archetype Owner</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">7</div>
              <div className="text-gray-400">Years AAA MMORPG</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
