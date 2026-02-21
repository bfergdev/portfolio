import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Combat & Class Design',
      primary: ['Archetype Ownership', 'Ability & Skill Tree Design', 'Weapon Combo Pipeline'],
      skills: ['Attack Speed Systems', 'Stat Systems & Damage Formulas', 'Status Effects & Procs', 'Class Revamps', 'Hybrid Tab/Action Combat', 'Animation Scaling', 'Haste Modulus Curves', 'Class Fantasy & Identity'],
    },
    {
      title: 'PVP & Large-Scale Systems',
      primary: ['Node Siege Design', 'Siege Machines & Gadgets', 'Corruption & Flagging'],
      skills: ['Conflict Objectives', 'Event Design', 'Safehouse Mechanics', 'Wave Respawns', 'Pillage Events', 'Buff Shrines', 'Siege Vehicles', 'Mass Combat Performance'],
    },
    {
      title: 'Economy & Itemization',
      primary: ['Itemization Philosophy', 'Reward Tables & Loot', 'Artisanship Pipeline'],
      skills: ['Power Curves & Rarity Tiers', 'Battle Pass Design', 'Live Economy', 'Competitive Benchmarking', 'Spawn Rate Balancing', 'Tradeskill Integration', 'Drop Weight Tuning', 'Economic Regions'],
    },
    {
      title: 'Narrative & World Design',
      primary: ['Quest Design & NPC Authoring', 'World Lore & Storytelling'],
      skills: ['Harbinger Quest Chains', 'Encounter & Boss Design', 'Settlement & Node Systems', 'Character Creation', 'Event-Driven Narrative', 'Coalition Quests', 'Corrupted Zone Design'],
    },
    {
      title: 'UX, Targeting & Tool Design',
      primary: ['Combat Targeting Systems', 'VFX Visibility Strategy'],
      skills: ['Defensive Target', 'Implied Target', 'Soft Target', 'Focus Target', 'DDE 2.0 Requirements', 'Blueprint Prototyping', 'Expression Editor Design', 'Raid Grouping UX'],
    },
    {
      title: 'Leadership & Process',
      primary: ['Design Quorum Co-Lead', 'Hiring & Mentorship', 'Feature Ownership'],
      skills: ['Pod Structure', 'Onboarding Pipeline', 'Check-in Standards', 'Cross-Discipline Reviews', 'Production Coordination', 'Design Alignment', 'Folder Structure & Docs', 'Open Development'],
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
              <h3 className="text-lg font-bold text-white mb-4">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.primary.map((skill, i) => (
                  <motion.span
                    key={`p-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.08 + i * 0.05, duration: 0.4 }}
                    className="px-3 py-1.5 bg-primary-500/15 border border-primary-500/40 rounded-lg text-sm font-medium text-primary-300"
                  >
                    {skill}
                  </motion.span>
                ))}
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={`s-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.08 + (category.primary.length + i) * 0.03, duration: 0.4 }}
                    className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-lg text-xs text-gray-400"
                  >
                    {skill}
                  </motion.span>
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
