import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ashesImg from '../../images/ashes.png'
import apocalypseImg from '../../images/apocalypse.png'
import veeshanImg from '../../images/veeshan.png'
import chainsImg from '../../images/chains.png'
import discoveryImg from '../../images/discovery.png'
import veliousImg from '../../images/velious.png'

const VideoModal = ({ videos, label, onClose, initialIndex = 0 }) => {
  const [index, setIndex] = useState(initialIndex)
  const video = videos[index]
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && index < videos.length - 1) setIndex(i => i + 1)
      if (e.key === 'ArrowLeft' && index > 0) setIndex(i => i - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index, videos.length, onClose])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-300">
            <span className="text-primary-400 font-semibold">{label}</span>
            {videos.length > 1 && <span className="text-gray-500 ml-2">{index + 1} / {videos.length}</span>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-primary-500/30 shadow-2xl">
          <iframe
            key={video.id}
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title || label}
          />
        </div>
        {videos.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={index === 0}
              className="p-2 rounded-lg bg-slate-800/80 border border-primary-500/20 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            {videos.map((v, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-primary-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
              />
            ))}
            <button
              onClick={() => setIndex(i => Math.min(videos.length - 1, i + 1))}
              disabled={index === videos.length - 1}
              className="p-2 rounded-lg bg-slate-800/80 border border-primary-500/20 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  )
}

const FlavorItem = ({ summary, detail, videos }) => {
  const [show, setShow] = useState(false)
  const [popupStyle, setPopupStyle] = useState({})
  const [activeVideo, setActiveVideo] = useState(null)
  const itemRef = useRef(null)
  const timeoutRef = useRef(null)

  const updatePosition = () => {
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const goUp = rect.bottom > window.innerHeight - 200
    setPopupStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      top: goUp ? undefined : rect.bottom + 6,
      bottom: goUp ? window.innerHeight - rect.top + 6 : undefined,
      zIndex: 9999,
    })
  }

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    updatePosition()
    setShow(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 150)
  }

  const renderSummary = () => {
    if (!videos || videos.length === 0) return summary

    let result = summary
    const parts = []
    let lastIndex = 0

    const sortedVideos = [...videos].sort((a, b) => {
      const aIdx = summary.toLowerCase().indexOf(a.keyword.toLowerCase())
      const bIdx = summary.toLowerCase().indexOf(b.keyword.toLowerCase())
      return aIdx - bIdx
    })

    for (const v of sortedVideos) {
      const idx = result.toLowerCase().indexOf(v.keyword.toLowerCase(), lastIndex)
      if (idx === -1) continue
      if (idx > lastIndex) parts.push(result.slice(lastIndex, idx))
      const matchedText = result.slice(idx, idx + v.keyword.length)
      parts.push(
        <button
          key={v.keyword}
          onClick={(e) => { e.stopPropagation(); setActiveVideo(v) }}
          className="inline-flex items-center gap-0.5 text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
        >
          <Play size={10} className="flex-shrink-0" />
          <span className="underline underline-offset-2">{matchedText}</span>
        </button>
      )
      lastIndex = idx + v.keyword.length
    }
    if (lastIndex < result.length) parts.push(result.slice(lastIndex))
    return parts.length > 0 ? parts : summary
  }

  if (!detail && (!videos || videos.length === 0)) return <li>{summary}</li>

  return (
    <li
      ref={itemRef}
      className={detail ? 'cursor-help' : ''}
      onMouseEnter={detail ? handleEnter : undefined}
      onMouseLeave={detail ? handleLeave : undefined}
    >
      <span className="hover:text-gray-300 transition-colors">
        {renderSummary()}
      </span>
      {detail && show && createPortal(
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={popupStyle}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="bg-slate-800/95 backdrop-blur-md border border-primary-500/30 rounded-lg p-3 shadow-xl shadow-black/40 text-xs text-gray-300 leading-relaxed">
            {detail}
          </div>
        </motion.div>,
        document.body
      )}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            videos={activeVideo.urls}
            label={activeVideo.label}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </li>
  )
}

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
        {
          summary: 'Owned Mage, Tank, and Ranger archetypes — authored ability kits, skill trees, stat systems, and the combat guiding pillars from concept through Alpha 2.',
          detail: 'Maintained the master ability sheet spanning all 8 archetypes (3 skill schools each). Led class revamps targeting utility, mass combat viability, and ability interaction matrices. Authored the combat guiding pillars defining hybrid tab/action philosophy, class fantasy identity, build diversity standards, and multi-hour session pacing. Designed the core stat system (6 base attributes with growth curves, diminishing returns) and the Combined Damage Stat (CDS) hybrid scaling solution.',
          videos: [
            {
              keyword: 'Ranger',
              label: 'Ranger Ability Demonstrations',
              urls: [
                { id: 'QiZqCHqzgec', title: 'Ranger Demo 1' },
                { id: '6ycnAgeJUUw', title: 'Ranger Demo 2' },
                { id: 'HB7M92gc1KA', title: 'Ranger Demo 3' },
                { id: 'WZerWEIkvuo', title: 'Ranger Demo 4' },
              ],
            },
            {
              keyword: 'skill trees',
              label: 'Early Skill Tree Concepts',
              urls: [
                { id: 'aGneKZOSYvE', title: 'Skill Tree Concept 1' },
                { id: 'zIOi9fv_aS8', title: 'Skill Tree Concept 2' },
                { id: 'pCHUfrqw_7U', title: 'Skill Tree Concept 3' },
              ],
            },
          ],
        },
        {
          summary: 'Designed the full weapon combo pipeline across 20+ weapon types and engineered the attack speed system with non-uniform animation scaling.',
          detail: 'Defined damage types (physical/magical), speed categories, combo cadence, reach, hitbox shapes, deadly finisher procs, and skill tree progression for every weapon. Authored individual weapon GDDs (2H Spear, Dual Daggers, Book) from concept through creative direction approval. Built the attack speed system separating windups, swings, and followthroughs into independently scalable sections with DoNotScale notify states. Designed the Haste Modulus Curve tool spec for animator control of animation weight at varied playback speeds.',
        },
        {
          summary: 'Built the proc/passive set bonus system and status effect promotion chains across all combat roles.',
          detail: 'Tiered 3/5/8-piece bonuses for Healer, DPS, and Tank with status effect promotion chains (bleed→hemo, burn→conflag, chill→freeze). Typed elemental damage/resistance scaling and rarity-based proc chances from Common through Legendary. Basic, Intermediate, and Advanced tiers with role-specific bonuses (mitigation buffs, lifesteal, DoT explosions, thorns).',
        },
        {
          summary: 'Architected Node Siege and open-world PVP systems — siege machines, corruption, conflict objectives, and large-scale event design.',
          detail: 'Authored the full Node Siege GDD: siege scroll acquisition, declaration phases, assault objectives, essence generators, fortification destruction states, wave respawns, and safehouse capture mechanics. Designed 15+ siege machines and gadgets (trebuchets, battering rams, ballistas, siege towers, rebirth carriages) plus anti-personnel, utility, and super weapon categories. Designed the Corruption & Blight system with 6 penalty tiers, expanded corruption proposal (auto-flagging, minimum durations, diminishing returns, corruption banners, repentance quests, lowbie protection), and blueprint logic for corruption gain. Created conflict objectives spanning skirmish, siege prep, and assault phases — VIP assassination, supply destruction, caravan obstruction, propaganda, and asymmetric attacker/defender goals.',
        },
        {
          summary: 'Built the game economy — artisanship, reward tables, itemization philosophy, and narrative quest loot across multiple milestones.',
          detail: 'Designed the full artisanship pipeline (gathering, processing, crafting with gameplay layers). Architected nested reward tables with global loot modifiers at world, economic region, dungeon, node, and POI levels. Authored the itemization philosophy ("The Endless Runway") defining item power curves, rarity tiers, stat restraint, and spawn rate vs. drop rate balancing. Designed Harbinger quest loot distribution across 3 event zones with corrupted crafting materials, weapon upgrade gems, and equipment choices. Authored NPC characters (Aelindra Moir, Alaric Durant), Harbinger quest chains with multi-week progression arcs, and world lore for Verra and the Ancients.',
        },
        {
          summary: 'Designed UX targeting systems (Targeting 3.0, Defensive Target) and led VFX visibility strategy for mass combat performance.',
          detail: 'Designed the Targeting 3.0 system — Defensive Target, Implied Target, Soft Target, Focus Target, Hover Target, and Target-of-Target with full PVP flagging rules. Authored the Defensive Target 2.0 proposal advocating MAYA design philosophy for advanced tab targeting. Led the VFX local/all-client visibility strategy across all 8 classes and weapons, defining simplified FX for mass combat performance. Defined requirements for the Design Data Editor (DDE 2.0) — inheritance, blueprint scripting, expression editor, multi-edit, reference viewer, and human-readable file diffing.',
        },
        {
          summary: 'Co-led the Design Quorum — established feature ownership, pod structure, onboarding, and mentorship across the design team.',
          detail: 'Shared leadership responsibilities with 4 senior designers reporting to the Creative Director in lieu of a Lead Designer. Established the feature ownership hierarchy with co-feature owners, mentors, and generalist design pools. Created the pod structure for cross-feature collaboration, the onboarding pipeline for new hires, check-in standards (atomic changelists, JIRA integration, QA handoff), and the mentorship framework. Ran design alignment sessions and cross-discipline reviews with engineering, art, and production.',
        },
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
                        typeof item === 'string'
                          ? <li key={i}>{item}</li>
                          : <FlavorItem key={i} summary={item.summary} detail={item.detail} videos={item.videos} />
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
