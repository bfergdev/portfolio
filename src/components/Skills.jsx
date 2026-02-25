import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ZoomIn, FolderOpen } from 'lucide-react'

const SkillDocGallery = ({ docs, title, onClose }) => {
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (expanded) setExpanded(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [expanded, onClose])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={() => expanded ? setExpanded(null) : onClose()}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-gray-400">{docs.length} design document{docs.length !== 1 ? 's' : ''} — click to expand</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {docs.map((doc, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setExpanded(doc)}
                className="group relative bg-slate-900/80 border border-primary-500/20 hover:border-primary-500/50 rounded-lg overflow-hidden text-left transition-colors"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={doc.thumb}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-300 leading-tight truncate">{doc.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
            onClick={() => setExpanded(null)}
          >
            <div className="absolute inset-0 bg-black/90" />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-primary-400">{expanded.name}</div>
                <button onClick={() => setExpanded(null)} className="text-gray-400 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-auto max-h-[80vh] rounded-xl border border-primary-500/30 shadow-2xl">
                <img
                  src={expanded.thumb.replace('.jpg', '-full.jpg')}
                  alt={expanded.name}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  )
}

const Skills = () => {
  const [activeDocs, setActiveDocs] = useState(null)

  const skillCategories = [
    {
      title: 'Combat & Class Design',
      skills: [
        { name: 'Archetype Ownership', context: 'Mage, Tank, and Ranger from concept through Alpha 2', docs: [
          { name: 'Ranger Revamp', thumb: '/doc-thumbs/ranger-revamp.jpg' },
          { name: 'Melee Ranger', thumb: '/doc-thumbs/melee-ranger.jpg' },
          { name: 'Mage Abilities', thumb: '/doc-thumbs/mage-abilities.jpg' },
          { name: 'Tank Abilities', thumb: '/doc-thumbs/tank-abilities.jpg' },
          { name: 'Tank Abilities DD', thumb: '/doc-thumbs/tank-abilities-dd.jpg' },
          { name: 'Tank Revamp', thumb: '/doc-thumbs/tank-revamp.jpg' },
          { name: 'Ability Master Sheet', thumb: '/doc-thumbs/ability-master-sheet.jpg' },
        ]},
        { name: 'Ability & Skill Tree Design', context: '3 skill schools per class across all 8 archetypes', docs: [
          { name: 'Ability Master Sheet', thumb: '/doc-thumbs/ability-master-sheet.jpg' },
          { name: 'Mage Abilities', thumb: '/doc-thumbs/mage-abilities.jpg' },
          { name: 'Tank Abilities', thumb: '/doc-thumbs/tank-abilities.jpg' },
          { name: 'Status Effects & Promotions', thumb: '/doc-thumbs/status-effects-promotions.jpg' },
        ]},
        { name: 'Weapon Combo Pipeline', context: '20+ weapon types with damage, speed, and finisher tuning', docs: [
          { name: 'Weapon Development', thumb: '/doc-thumbs/weapon-development.jpg' },
          { name: 'Weapons DD', thumb: '/doc-thumbs/weapons-dd.jpg' },
          { name: '2H Spear GDD', thumb: '/doc-thumbs/2h-spear-gdd.jpg' },
          { name: 'Dual Daggers GDD', thumb: '/doc-thumbs/dual-daggers-gdd.jpg' },
          { name: '2H Book GDD', thumb: '/doc-thumbs/2h-book-gdd.jpg' },
          { name: 'Weapons Balance', thumb: '/doc-thumbs/weapons-balance.jpg' },
        ]},
        { name: 'Stat Systems & Formulas', context: '6 base attributes, CDS hybrid scaling, diminishing returns', docs: [
          { name: 'CDS Hybrid Scaling', thumb: '/doc-thumbs/cds-hybrid-scaling.jpg' },
          { name: 'Mitigation Math', thumb: '/doc-thumbs/mit-math.jpg' },
        ]},
        { name: 'Attack Speed & Animation', context: 'Non-uniform scaling with Haste Modulus Curve tooling', docs: [
          { name: 'Attack Speed System', thumb: '/doc-thumbs/attack-speed.jpg' },
        ]},
        { name: 'Status Effects & Procs', context: 'Promotion chains, set bonuses, elemental scaling', docs: [
          { name: 'Status Effects & Promotions', thumb: '/doc-thumbs/status-effects-promotions.jpg' },
        ]},
      ],
    },
    {
      title: 'PVP & Large-Scale Systems',
      skills: [
        { name: 'Node Siege Design', context: 'Full GDD author — scroll acquisition through destruction states', docs: [
          { name: 'Node Siege GDD', thumb: '/doc-thumbs/node-siege-gdd.jpg' },
          { name: 'Node Siege Layout', thumb: '/doc-thumbs/node-siege-layout.jpg' },
          { name: 'Node Siege Phase 1', thumb: '/doc-thumbs/node-siege-phase1.jpg' },
          { name: 'Siege Respawns & Safehouses', thumb: '/doc-thumbs/siege-respawns-safehouses.jpg' },
        ]},
        { name: 'Siege Machines & Gadgets', context: '15+ machines: trebuchets, rams, ballistas, siege towers', docs: [
          { name: 'Siege Machines & Gadgets', thumb: '/doc-thumbs/siege-machines-gadgets.jpg' },
          { name: 'Siege Vehicles 2.0', thumb: '/doc-thumbs/siege-vehicles-2.jpg' },
          { name: 'Mobile Ballista', thumb: '/doc-thumbs/mobile-ballista.jpg' },
        ]},
        { name: 'Corruption & Flagging', context: '6 penalty tiers, auto-flagging, repentance quests', docs: [
          { name: 'Expanded Corruption', thumb: '/doc-thumbs/expanded-corruption.jpg' },
          { name: 'Corruption & Blight', thumb: '/doc-thumbs/corruption-blight.jpg' },
        ]},
        { name: 'Conflict Objectives', context: 'Skirmish, prep, and assault phases with asymmetric goals', docs: [
          { name: 'Conflict Objectives', thumb: '/doc-thumbs/conflict-objectives.jpg' },
        ]},
        { name: 'Mass Combat Performance', context: 'VFX visibility strategy across all 8 classes', docs: [
          { name: 'VFX Visibility Strategy', thumb: '/doc-thumbs/vfx-visibility-strategy.jpg' },
        ]},
      ],
    },
    {
      title: 'Economy & Itemization',
      skills: [
        { name: 'Itemization Philosophy', context: '"The Endless Runway" — power curves, rarity, stat restraint' },
        { name: 'Reward Tables & Loot', context: 'Nested tables with global modifiers at world/region/node levels', docs: [
          { name: 'Reward Table Map', thumb: '/doc-thumbs/reward-table-map.jpg' },
          { name: 'Harbinger Loot Request', thumb: '/doc-thumbs/harbinger-loot-request.jpg' },
        ]},
        { name: 'Artisanship Pipeline', context: 'Gathering, processing, and crafting with gameplay layers' },
        { name: 'Battle Pass & Live Economy', context: 'Compendium rewards, drop weight tuning, spawn balancing' },
        { name: 'Competitive Benchmarking', context: 'Recovery analysis vs. Fortnite, Apex, PUBG' },
      ],
    },
    {
      title: 'Narrative & World Design',
      skills: [
        { name: 'Quest Design & NPC Authoring', context: 'Harbinger quest chains, coalition quests, NPC characters', docs: [
          { name: 'Harbinger NCS Flow', thumb: '/doc-thumbs/harbinger-ncs-flow.jpg' },
          { name: 'Harbinger: Turquoise Sea', thumb: '/doc-thumbs/harbinger-turquoise-sea.jpg' },
          { name: 'Harbinger Loot Request', thumb: '/doc-thumbs/harbinger-loot-request.jpg' },
          { name: 'Alaric Durant', thumb: '/doc-thumbs/alaric-durant.jpg' },
        ]},
        { name: 'World Lore & Storytelling', context: 'Verra narrative, Ancients, event-driven corrupted zones', docs: [
          { name: 'Verra Narrative', thumb: '/doc-thumbs/verra-narrative.jpg' },
          { name: 'Camp of the First Flame', thumb: '/doc-thumbs/camp-first-flame.jpg' },
        ]},
        { name: 'Encounter & Boss Design', context: 'Scripted behaviors, one-off abilities, phase mechanics' },
        { name: 'Settlement & Node Systems', context: 'Champions, Disciples, Military Node elections', docs: [
          { name: 'Champions & Disciples', thumb: '/doc-thumbs/champions-disciples.jpg' },
          { name: 'Military Node Election', thumb: '/doc-thumbs/military-node-election.jpg' },
          { name: 'Backgrounds & Attunements', thumb: '/doc-thumbs/backgrounds-attunements.jpg' },
        ]},
      ],
    },
    {
      title: 'UX & Tool Design',
      skills: [
        { name: 'Combat Targeting Systems', context: 'Targeting 3.0 — Defensive, Implied, Soft, Focus, Hover', docs: [
          { name: 'Targeting 3.0', thumb: '/doc-thumbs/targeting-3.jpg' },
          { name: 'Defensive Target 2.0', thumb: '/doc-thumbs/defensive-target-2.jpg' },
          { name: 'Tab Target Improvements', thumb: '/doc-thumbs/tab-target-improvements.jpg' },
          { name: 'Status Effect Window', thumb: '/doc-thumbs/status-effect-window.jpg' },
        ]},
        { name: 'VFX Visibility Strategy', context: 'Local vs. all-client FX splits for mass combat performance', docs: [
          { name: 'VFX Visibility Strategy', thumb: '/doc-thumbs/vfx-visibility-strategy.jpg' },
        ]},
        { name: 'DDE 2.0 Requirements', context: 'Blueprint scripting, expression editor, multi-edit, diffing', docs: [
          { name: 'DDE 2.0 Requirements', thumb: '/doc-thumbs/dde-2-requirements.jpg' },
        ]},
        { name: 'Prototyping & Scripting', context: 'Designer self-sufficiency for combat, economy, encounters' },
      ],
    },
    {
      title: 'Leadership & Process',
      skills: [
        { name: 'Design Quorum Lead', context: 'Led the design team for several years' },
        { name: 'Hiring & Mentorship', context: 'Onboarding pipeline, new hire routines, mentee framework', docs: [
          { name: 'Design Onboarding', thumb: '/doc-thumbs/design-onboarding.jpg' },
        ]},
        { name: 'Feature Ownership', context: 'Pod structure, co-owners, generalist design pools' },
        { name: 'Cross-Discipline Collaboration', context: 'Engineering, art, and production alignment sessions' },
        { name: 'Standards & Documentation', context: 'Check-in standards, folder structure, JIRA integration', docs: [
          { name: 'Check-in Standards', thumb: '/doc-thumbs/checkin-standards.jpg' },
        ]},
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
            10 years of MMORPG development experience
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
                    className={skill.docs ? 'cursor-pointer group' : ''}
                    onClick={skill.docs ? () => setActiveDocs({ docs: skill.docs, title: skill.name }) : undefined}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-medium ${skill.docs ? 'text-primary-300 group-hover:text-primary-200' : 'text-primary-300'} transition-colors`}>{skill.name}</span>
                      {skill.docs && <FolderOpen size={12} className="text-primary-500/50 group-hover:text-primary-400 transition-colors flex-shrink-0" />}
                    </div>
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

        <AnimatePresence>
          {activeDocs && (
            <SkillDocGallery
              docs={activeDocs.docs}
              title={activeDocs.title}
              onClose={() => setActiveDocs(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Skills
