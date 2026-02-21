import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Combat & Class Design',
      skills: [
        { name: 'Archetype Ownership (Mage, Tank, Ranger)', level: 97 },
        { name: 'Ability & Skill Tree Design', level: 95 },
        { name: 'Weapon Combo Pipeline & Attack Speed', level: 95 },
        { name: 'Stat Systems & Damage Formulas', level: 93 },
        { name: 'Status Effects & Proc Systems', level: 92 },
      ],
    },
    {
      title: 'PVP & Large-Scale Systems',
      skills: [
        { name: 'Node Siege Design (GDD Author)', level: 95 },
        { name: 'Siege Machines & Gadgets', level: 93 },
        { name: 'Corruption & Flagging Systems', level: 92 },
        { name: 'Conflict Objectives & Event Design', level: 90 },
        { name: 'Mass Combat Performance Strategy', level: 88 },
      ],
    },
    {
      title: 'Economy & Itemization',
      skills: [
        { name: 'Itemization Philosophy & Power Curves', level: 95 },
        { name: 'Reward Tables & Loot Distribution', level: 93 },
        { name: 'Artisanship (Gathering, Processing, Crafting)', level: 90 },
        { name: 'Battle Pass & Live Economy', level: 90 },
        { name: 'Competitive Analysis & Benchmarking', level: 88 },
      ],
    },
    {
      title: 'Narrative & World Design',
      skills: [
        { name: 'Quest Design & NPC Authoring', level: 90 },
        { name: 'World Lore & Event Storytelling', level: 88 },
        { name: 'Encounter & Boss Design', level: 88 },
        { name: 'Settlement & Node Systems', level: 85 },
      ],
    },
    {
      title: 'UX, Targeting & Tool Design',
      skills: [
        { name: 'Combat Targeting Systems (Tab/Action)', level: 95 },
        { name: 'VFX Visibility & Performance Strategy', level: 90 },
        { name: 'Tool Requirements & DDE Pipeline', level: 88 },
        { name: 'Blueprint & Scripting Prototyping', level: 85 },
      ],
    },
    {
      title: 'Leadership & Process',
      skills: [
        { name: 'Design Quorum & Team Leadership', level: 95 },
        { name: 'Hiring, Onboarding & Mentorship', level: 93 },
        { name: 'Cross-Discipline Collaboration', level: 92 },
        { name: 'Feature Ownership & Pod Structure', level: 90 },
        { name: 'Production Coordination & Timelines', level: 88 },
      ],
    },
  ]

  const expertise = [
    'Archetype Owner',
    'Weapon System Lead',
    'Siege GDD Author',
    'Combat Pillars Author',
    'Economy Architect',
    'Targeting Systems Designer',
    'Design Quorum Co-Lead',
    'Tool Pipeline Advocate',
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
            15 years of MMORPG design — from combat math and class identity to siege warfare,
            game economy, narrative systems, and design team leadership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.08, duration: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-5">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-primary-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: categoryIndex * 0.08 + skillIndex * 0.08, duration: 1, ease: 'easeOut' }}
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
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {expertise.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-xl p-3 text-center"
            >
              <div className="text-xs sm:text-sm font-semibold text-primary-300">{cert}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Skills
