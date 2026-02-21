import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Combat & Class Design',
      skills: [
        { name: 'Archetype Ownership', context: 'Mage, Tank, and Ranger from concept through Alpha 2' },
        { name: 'Ability & Skill Tree Design', context: '3 skill schools per class across all 8 archetypes' },
        { name: 'Weapon Combo Pipeline', context: '20+ weapon types with damage, speed, and finisher tuning' },
        { name: 'Stat Systems & Formulas', context: '6 base attributes, CDS hybrid scaling, diminishing returns' },
        { name: 'Attack Speed & Animation', context: 'Non-uniform scaling with Haste Modulus Curve tooling' },
        { name: 'Status Effects & Procs', context: 'Promotion chains, set bonuses, elemental scaling' },
      ],
    },
    {
      title: 'PVP & Large-Scale Systems',
      skills: [
        { name: 'Node Siege Design', context: 'Full GDD author — scroll acquisition through destruction states' },
        { name: 'Siege Machines & Gadgets', context: '15+ machines: trebuchets, rams, ballistas, siege towers' },
        { name: 'Corruption & Flagging', context: '6 penalty tiers, auto-flagging, repentance quests' },
        { name: 'Conflict Objectives', context: 'Skirmish, prep, and assault phases with asymmetric goals' },
        { name: 'Mass Combat Performance', context: 'VFX visibility strategy across all 8 classes' },
      ],
    },
    {
      title: 'Economy & Itemization',
      skills: [
        { name: 'Itemization Philosophy', context: '"The Endless Runway" — power curves, rarity, stat restraint' },
        { name: 'Reward Tables & Loot', context: 'Nested tables with global modifiers at world/region/node levels' },
        { name: 'Artisanship Pipeline', context: 'Gathering, processing, and crafting with gameplay layers' },
        { name: 'Battle Pass & Live Economy', context: 'Compendium rewards, drop weight tuning, spawn balancing' },
        { name: 'Competitive Benchmarking', context: 'Recovery analysis vs. Fortnite, Apex, PUBG' },
      ],
    },
    {
      title: 'Narrative & World Design',
      skills: [
        { name: 'Quest Design & NPC Authoring', context: 'Harbinger quest chains, coalition quests, NPC characters' },
        { name: 'World Lore & Storytelling', context: 'Verra narrative, Ancients, event-driven corrupted zones' },
        { name: 'Encounter & Boss Design', context: 'Scripted behaviors, one-off abilities, phase mechanics' },
        { name: 'Settlement & Node Systems', context: 'Champions, Disciples, Military Node elections' },
      ],
    },
    {
      title: 'UX & Tool Design',
      skills: [
        { name: 'Combat Targeting Systems', context: 'Targeting 3.0 — Defensive, Implied, Soft, Focus, Hover' },
        { name: 'VFX Visibility Strategy', context: 'Local vs. all-client FX splits for mass combat performance' },
        { name: 'DDE 2.0 Requirements', context: 'Blueprint scripting, expression editor, multi-edit, diffing' },
        { name: 'Prototyping & Scripting', context: 'Designer self-sufficiency for combat, economy, encounters' },
      ],
    },
    {
      title: 'Leadership & Process',
      skills: [
        { name: 'Design Quorum Co-Lead', context: 'Shared leadership with 4 senior designers under CD' },
        { name: 'Hiring & Mentorship', context: 'Onboarding pipeline, new hire routines, mentee framework' },
        { name: 'Feature Ownership', context: 'Pod structure, co-owners, generalist design pools' },
        { name: 'Cross-Discipline Collaboration', context: 'Engineering, art, and production alignment sessions' },
        { name: 'Standards & Documentation', context: 'Check-in standards, folder structure, JIRA integration' },
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
              <h3 className="text-lg font-bold text-white mb-4">{category.title}</h3>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.08 + skillIndex * 0.05, duration: 0.4 }}
                  >
                    <div className="text-sm font-medium text-primary-300">{skill.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{skill.context}</div>
                  </motion.div>
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
