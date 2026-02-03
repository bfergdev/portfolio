import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Combat Design',
      skills: [
        { name: 'Archetype/Class Design', level: 95 },
        { name: 'Ability Design', level: 95 },
        { name: 'Combat Balance', level: 90 },
        { name: 'PVP/PVX Systems', level: 90 },
      ],
    },
    {
      title: 'Systems Design',
      skills: [
        { name: 'Character Progression', level: 95 },
        { name: 'Itemization', level: 95 },
        { name: 'Economy Design', level: 90 },
        { name: 'Tradeskills', level: 90 },
      ],
    },
    {
      title: 'Content Design',
      skills: [
        { name: 'Encounter Design', level: 88 },
        { name: 'World Design', level: 85 },
        { name: 'Quest Implementation', level: 85 },
        { name: 'Settlement Design', level: 82 },
      ],
    },
    {
      title: 'Leadership & Technical',
      skills: [
        { name: 'Multidisciplinary Leadership', level: 90 },
        { name: 'Mentorship & Oversight', level: 88 },
        { name: 'Scripting', level: 85 },
        { name: 'C++ & Project Management', level: 80 },
      ],
    },
  ]

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive expertise in MMORPG design, from combat mechanics and class balance
            to economy systems and content implementation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary-400 font-semibold">{skill.level}%</span>
                    </div>
                    
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1, duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {['Archetype Owner', 'Weapon System Lead', 'Siege Mechanics', 'Economy Specialist'].map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-xl p-4 text-center"
            >
              <div className="text-sm font-semibold text-primary-300">{cert}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Skills
