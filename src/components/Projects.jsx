import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import ashesImg from '../../images/ashes.png'
import apocalypseImg from '../../images/apocalypse.png'
import veeshanImg from '../../images/veeshan.png'
import chainsImg from '../../images/chains.png'
import discoveryImg from '../../images/discovery.png'
import veliousImg from '../../images/velious.png'

const Projects = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const projects = [
    {
      title: 'Ashes of Creation',
      category: 'MMORPG',
      description: 'Principal combat and systems designer across a AAA MMORPG. Feature owner for multiple archetypes, weapon systems, PVP, siege warfare, economy, narrative events, and UX targeting systems.',
      image: ashesImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat Design', 'Archetype Owner', 'PVP & Siege', 'Economy', 'Narrative', 'UI/UX', 'Tool Design', 'Leadership'],
      color: 'from-purple-500 to-pink-500',
      role: 'Senior Game Designer',
      company: 'Intrepid Studios',
      years: '2020 - 2025',
      flavorText: [
        'Owned Mage, Tank, and Ranger archetypes end-to-end — authored ability kits across 3 skill schools per class, skill trees, and class identity from concept through Alpha 2. Maintained the master ability sheet spanning all 8 archetypes and led class revamps targeting utility, mass combat viability, and ability interaction matrices.',
        'Authored the combat guiding pillars document defining the game\'s hybrid tab/action targeting philosophy, class fantasy identity, build diversity standards, group interdependency, and multi-hour session pacing goals.',
        'Architected the core stat system — 6 base attributes each driving derived combat stats with growth rate curves and diminishing returns. Designed the Combined Damage Stat (CDS) hybrid scaling solution enabling multi-stat builds with per-class and per-ability tuning.',
        'Designed the full weapon combo pipeline across 20+ weapon types — defining damage types (physical/magical), speed categories, combo cadence, reach, hitbox shapes, deadly finisher procs, and skill tree progression. Authored individual weapon GDDs (2H Spear, Dual Daggers, Book) from concept through creative direction approval.',
        'Engineered the attack speed system with non-uniform scaling — separating windups, swings, and followthroughs into independently scalable sections with DoNotScale notify states, preserving animation weight across a full range of haste values. Designed the Haste Modulus Curve tool spec for animator control.',
        'Built the proc and passive set bonus system — tiered 3/5/8-piece bonuses for Healer, DPS, and Tank with status effect promotion chains (bleed→hemo, burn→conflag, chill→freeze), typed elemental scaling, and rarity-based proc chances from Common through Legendary.',
        'Designed the Corruption & Blight system — 6 penalty tiers, expanded corruption proposal with auto-flagging, minimum durations, diminishing returns, corruption banners, repentance quests, and lowbie protection. Authored blueprint logic for corruption gain with level-delta scaling.',
        'Architected the full Node Siege GDD — siege scroll acquisition, declaration phases, assault objectives, essence generators, fortification destruction states, wave respawns, and safehouse capture mechanics. Designed 15+ siege machines and gadgets (trebuchets, battering rams, ballistas, siege towers, rebirth carriages) plus anti-personnel, utility, and super weapon categories.',
        'Designed conflict objectives spanning skirmish, siege prep, and siege assault phases — including VIP assassination, supply destruction, caravan obstruction, propaganda systems, deprivation objectives, and asymmetric attacker/defender goals.',
        'Built the game economy across multiple milestones — artisanship (gathering, processing, crafting), nested reward tables with global loot modifiers, itemization philosophy ("The Endless Runway"), item power curves, rarity tiers, and Harbinger quest loot distribution across 3 event zones.',
        'Authored narrative content including fully realized NPC characters (Aelindra Moir, Alaric Durant), Harbinger quest chains with multi-week progression arcs, world lore for Verra and the Ancients, and event-driven storytelling with corrupted zones and boss encounters.',
        'Designed the Targeting 3.0 system — Defensive Target, Implied Target, Soft Target, Focus Target, Hover Target, and Target-of-Target with full PVP flagging rules. Authored the Defensive Target 2.0 proposal advocating MAYA design philosophy for advanced tab targeting. Led VFX visibility strategy for mass combat performance across all 8 classes.',
        'Defined requirements for the Design Data Editor (DDE 2.0) — inheritance, full blueprint scripting support, expression editor, multi-edit, reference viewer, and human-readable file diffing. Advocated for designer self-sufficiency in prototyping combat, economy, encounters, and node systems.',
        'Co-led the Design Quorum in lieu of a Lead Designer — shared leadership responsibilities with 4 senior designers reporting to the Creative Director. Established the feature ownership hierarchy, pod structure, onboarding pipeline, check-in standards, and mentorship framework. Ran design alignment sessions and cross-discipline reviews.',
      ],
    },
    {
      title: 'Ashes of Creation: Apocalypse',
      category: 'Battle Royale / Arena',
      description: 'Combat, economy, and systems designer for a standalone PVP experience. Owned the full loot economy, battle pass progression, and match pacing across a large-scale battle royale.',
      image: apocalypseImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat Design', 'Loot Economy', 'Battle Pass', 'Systems Balance', 'Competitive Analysis'],
      color: 'from-blue-500 to-cyan-500',
      role: 'Game Designer',
      company: 'Intrepid Studios',
      years: '2019 - 2020',
      flavorText: [
        'Architected the full loot pass economy — weapon, utility, health, and combo drop tables with weighted probability math across common, rare, and legendary tiers.',
        'Managed 5,000+ world spawners across multiple types (Chests, RareItem, WorldItem, WorldCommon, WorldMana) with per-map spawn rates and difficulty-scaled chest distribution (Easy 25% → Advanced 55%).',
        'Designed and iterated on drop weight rebalancing — tuning old vs. new value distributions to hit target legendary/rare probabilities per chest.',
        'Built a tiered Compendium Rewards system (free & paid tracks) with 50+ levels of cosmetics, weapons, emotes, XP boosts, and currency rewards.',
        'Created a formula-driven destructible item HP balance system using base size values, material multipliers, quality tiers, and infrastructure importance — applied across walls, wagons, tents, braziers, and more.',
        'Conducted competitive recovery analysis benchmarking APOC healing systems against Fortnite, Apex Legends, and PUBG — comparing cast times, amounts restored, mobility constraints, and max carry capacity.',
        'Engineered the 9-phase storm ring system with dynamic radius shrinking, close duration, cooloff periods, and storm speed scaling tied to a players-in-match coefficient capped at 90% of sprint speed.',
      ],
    },
    {
      title: 'EverQuest II: Tears of Veeshan',
      category: 'MMORPG Expansion',
      description: 'System design responsibilities including PVP balance, itemization, tradeskills, PVE class balance, and encounter design.',
      image: veeshanImg,
      link: 'https://www.everquest2.com/home',
      tags: ['Systems Design', 'PVP Balance', 'Itemization', 'Tradeskills'],
      color: 'from-green-500 to-emerald-500',
      role: 'Associate Game Designer',
      company: 'Sony Online Entertainment',
      years: '2013',
    },
    {
      title: 'EverQuest II: Chains of Eternity',
      category: 'MMORPG Expansion',
      description: 'Responsible for PVP balance, itemization, tradeskills, PVE class balance, and encounter design for major expansion.',
      image: chainsImg,
      link: 'https://www.everquest2.com/home',
      tags: ['Class Balance', 'Encounter Design', 'Economy', 'PVP'],
      color: 'from-orange-500 to-red-500',
      role: 'Associate Game Designer',
      company: 'Sony Online Entertainment',
      years: '2012',
    },
    {
      title: 'EverQuest II: Age of Discovery',
      category: 'MMORPG Expansion',
      description: 'System design for PVP balance, itemization, tradeskills, and PVE class balance across multiple content updates.',
      image: discoveryImg,
      link: 'https://www.everquest2.com/home',
      tags: ['Systems Design', 'Tradeskills', 'Class Balance', 'Content'],
      color: 'from-indigo-500 to-purple-500',
      role: 'Associate Game Designer',
      company: 'Sony Online Entertainment',
      years: '2011 - 2013',
    },
    {
      title: 'EverQuest II: Destiny of Velious',
      category: 'MMORPG Expansion',
      description: 'Provided systems design assistance including itemization, class balance, and tradeskills for major expansion release.',
      image: veliousImg,
      link: 'https://www.everquest2.com/home',
      tags: ['Itemization', 'Class Balance', 'Tradeskills', 'Systems'],
      color: 'from-cyan-500 to-blue-500',
      role: 'Apprentice Game Designer',
      company: 'Sony Online Entertainment',
      years: '2010 - 2011',
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
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A decade of shipped AAA MMORPG titles and expansions, from EverQuest II
            to the upcoming Ashes of Creation.
          </p>
        </motion.div>

        {/* Featured Project Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-12 group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${projects[featuredIndex].color} rounded-2xl blur-xl opacity-20`} />
            
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-primary-500/30 rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-1/2 h-64 lg:h-auto min-h-[300px] overflow-hidden">
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${projects[featuredIndex].color} opacity-20 animate-pulse`} />
                  <div className={`absolute inset-0 bg-gradient-to-tl ${projects[featuredIndex].color} opacity-10`} />
                  
                  {/* Animated orbs */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${projects[featuredIndex].color} rounded-full blur-3xl opacity-40`} />
                  <div className={`absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr ${projects[featuredIndex].color} rounded-full blur-3xl opacity-30`} />
                  
                  <img
                    src={projects[featuredIndex].image}
                    alt={projects[featuredIndex].title}
                    className="relative z-10 w-full h-full object-contain p-6 lg:p-8 drop-shadow-2xl pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6 lg:p-8 lg:w-1/2 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-primary-400">{projects[featuredIndex].category}</div>
                    <motion.a
                      href={projects[featuredIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-primary-500/50 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={20} className="pointer-events-none" />
                    </motion.a>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">{projects[featuredIndex].title}</h3>
                  
                  {projects[featuredIndex].role && (
                    <div className="mb-4 text-sm">
                      <div className="text-accent-400 font-semibold text-base">{projects[featuredIndex].role}</div>
                      <div className="text-gray-500">{projects[featuredIndex].company} • {projects[featuredIndex].years}</div>
                    </div>
                  )}
                  
                  <p className="text-gray-400 mb-4">{projects[featuredIndex].description}</p>
                  
                  {projects[featuredIndex].flavorText && (
                    <ul className="text-gray-400 text-sm space-y-2 mb-4 list-disc list-outside pl-4">
                      {projects[featuredIndex].flavorText.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {projects[featuredIndex].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-xs text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {projects.map((project, index) => (
            index !== featuredIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFeaturedIndex(index)}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-primary-500/20 group-hover:border-primary-500/50 rounded-xl overflow-hidden transition-colors">
                  <div className="relative h-28 sm:h-32 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-15`} />
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.color} rounded-full blur-2xl opacity-30`} />
                    
                    <img
                      src={project.image}
                      alt={project.title}
                      className="relative z-10 w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-3">
                    <div className="text-xs text-primary-400 mb-1">{project.category}</div>
                    <h4 className="text-sm font-bold text-white leading-tight">{project.title}</h4>
                    <div className="text-xs text-gray-500 mt-1">{project.years}</div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
