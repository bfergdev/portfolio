import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Play, X, ChevronLeft, ChevronRight, FolderOpen, ZoomIn } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ashesImg from '../../images/ashes.png'
import apocalypseImg from '../../images/apocalypse.png'
import eq2Img from '../../images/eq2.png'

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

const DocGallery = ({ docs, title, onClose }) => {
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
            <p className="text-xs text-gray-400">{docs.length} design documents — click to expand</p>
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
                  <div className="text-[10px] text-gray-500 mt-0.5">{doc.category}</div>
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
                <div>
                  <div className="text-sm font-semibold text-primary-400">{expanded.name}</div>
                  <div className="text-xs text-gray-500">{expanded.category}</div>
                </div>
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
  const [showDocs, setShowDocs] = useState(false)
  const projects = [
    {
      title: 'Ashes of Creation',
      category: 'MMORPG',
      description: 'Principal combat and systems designer across a AAA MMORPG. Feature owner for multiple archetypes, weapon systems, PVP, siege warfare, economy, narrative events, and UX targeting systems.',
      image: ashesImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat', 'CCC', 'Classes', 'Weapons', 'PVP', 'Large-Scale Warfare','Economy', 'Events', 'UI/UX', 'Tools', 'Leadership'],
      color: 'from-purple-500 to-pink-500',
      role: 'Senior Game Designer I \u2192 Senior Game Designer III',
      company: 'Intrepid Studios',
      years: '2020 - 2026',
      docs: [
        { name: 'Status Effects & Promotions', category: 'Combat', thumb: '/doc-thumbs/status-effects-promotions.jpg' },
        { name: 'Ability Master Sheet', category: 'Combat', thumb: '/doc-thumbs/ability-master-sheet.jpg' },
        { name: 'Attack Speed System', category: 'Combat', thumb: '/doc-thumbs/attack-speed.jpg' },
        { name: 'CDS Hybrid Scaling', category: 'Combat', thumb: '/doc-thumbs/cds-hybrid-scaling.jpg' },
        { name: 'Tank Abilities DD', category: 'Combat', thumb: '/doc-thumbs/tank-abilities-dd.jpg' },
        { name: 'Tank Abilities', category: 'Combat', thumb: '/doc-thumbs/tank-abilities.jpg' },
        { name: 'Tank Revamp', category: 'Combat', thumb: '/doc-thumbs/tank-revamp.jpg' },
        { name: 'Ranger Revamp', category: 'Combat', thumb: '/doc-thumbs/ranger-revamp.jpg' },
        { name: 'Melee Ranger', category: 'Combat', thumb: '/doc-thumbs/melee-ranger.jpg' },
        { name: 'Mage Abilities', category: 'Combat', thumb: '/doc-thumbs/mage-abilities.jpg' },
        { name: 'Weapon Development', category: 'Combat', thumb: '/doc-thumbs/weapon-development.jpg' },
        { name: 'Weapons DD', category: 'Combat', thumb: '/doc-thumbs/weapons-dd.jpg' },
        { name: '2H Spear GDD', category: 'Combat', thumb: '/doc-thumbs/2h-spear-gdd.jpg' },
        { name: 'Dual Daggers GDD', category: 'Combat', thumb: '/doc-thumbs/dual-daggers-gdd.jpg' },
        { name: '2H Book GDD', category: 'Combat', thumb: '/doc-thumbs/2h-book-gdd.jpg' },
        { name: 'Mitigation Math', category: 'Combat', thumb: '/doc-thumbs/mit-math.jpg' },
        { name: 'Weapons Balance', category: 'Combat', thumb: '/doc-thumbs/weapons-balance.jpg' },
        { name: 'VFX Visibility Strategy', category: 'Combat', thumb: '/doc-thumbs/vfx-visibility-strategy.jpg' },
        { name: 'Node Siege GDD', category: 'PVP', thumb: '/doc-thumbs/node-siege-gdd.jpg' },
        { name: 'Node Siege Layout', category: 'PVP', thumb: '/doc-thumbs/node-siege-layout.jpg' },
        { name: 'Siege Machines & Gadgets', category: 'PVP', thumb: '/doc-thumbs/siege-machines-gadgets.jpg' },
        { name: 'Siege Vehicles 2.0', category: 'PVP', thumb: '/doc-thumbs/siege-vehicles-2.jpg' },
        { name: 'Mobile Ballista', category: 'PVP', thumb: '/doc-thumbs/mobile-ballista.jpg' },
        { name: 'Expanded Corruption', category: 'PVP', thumb: '/doc-thumbs/expanded-corruption.jpg' },
        { name: 'Corruption & Blight', category: 'PVP', thumb: '/doc-thumbs/corruption-blight.jpg' },
        { name: 'Conflict Objectives', category: 'PVP', thumb: '/doc-thumbs/conflict-objectives.jpg' },
        { name: 'Siege Respawns & Safehouses', category: 'PVP', thumb: '/doc-thumbs/siege-respawns-safehouses.jpg' },
        { name: 'Harbinger Loot Request', category: 'Economy', thumb: '/doc-thumbs/harbinger-loot-request.jpg' },
        { name: 'Reward Table Map', category: 'Economy', thumb: '/doc-thumbs/reward-table-map.jpg' },
        { name: 'Verra Narrative', category: 'Storytelling', thumb: '/doc-thumbs/verra-narrative.jpg' },
        { name: 'Alaric Durant', category: 'Storytelling', thumb: '/doc-thumbs/alaric-durant.jpg' },
        { name: 'Camp of the First Flame', category: 'Storytelling', thumb: '/doc-thumbs/camp-first-flame.jpg' },
        { name: 'Harbinger NCS Flow', category: 'Storytelling', thumb: '/doc-thumbs/harbinger-ncs-flow.jpg' },
        { name: 'Harbinger: Turquoise Sea', category: 'Storytelling', thumb: '/doc-thumbs/harbinger-turquoise-sea.jpg' },
        { name: 'Backgrounds & Attunements', category: 'Systems', thumb: '/doc-thumbs/backgrounds-attunements.jpg' },
        { name: 'Champions & Disciples', category: 'Systems', thumb: '/doc-thumbs/champions-disciples.jpg' },
        { name: 'Military Node Election', category: 'Systems', thumb: '/doc-thumbs/military-node-election.jpg' },
        { name: 'Queue Mitigation', category: 'Systems', thumb: '/doc-thumbs/queue-mitigation.jpg' },
        { name: 'Targeting 3.0', category: 'UI/UX', thumb: '/doc-thumbs/targeting-3.jpg' },
        { name: 'Defensive Target 2.0', category: 'UI/UX', thumb: '/doc-thumbs/defensive-target-2.jpg' },
        { name: 'Tab Target Improvements', category: 'UI/UX', thumb: '/doc-thumbs/tab-target-improvements.jpg' },
        { name: 'Status Effect Window', category: 'UI/UX', thumb: '/doc-thumbs/status-effect-window.jpg' },
        { name: 'DDE 2.0 Requirements', category: 'Tool Design', thumb: '/doc-thumbs/dde-2-requirements.jpg' },
        { name: 'Design Onboarding', category: 'Leadership', thumb: '/doc-thumbs/design-onboarding.jpg' },
        { name: 'Check-in Standards', category: 'Leadership', thumb: '/doc-thumbs/checkin-standards.jpg' },
        { name: 'Node Siege Phase 1', category: 'Leadership', thumb: '/doc-thumbs/node-siege-phase1.jpg' },
      ],
      flavorText: [
        {
          summary: 'Owned the Mage, Tank, and Ranger archetypes — led development efforts on ability kits, skill trees, stat systems, and passives. Created the Ability Augment system.',
          detail: 'Maintained the master ability sheet spanning all 8 archetypes. Led class revamps targeting utility, mass combat viability, and ability interaction matrices. Authored the combat guiding pillars defining hybrid tab/action philosophy, class fantasy identity, build diversity standards, and multi-hour session pacing. Designed the core stat system and other stat solutions.',
          videos: [
            {
              keyword: 'Ability Augment',
              label: 'Ability Augment Paper design & Implemented examples',
              urls: [
                { id: 'pCHUfrqw_7U', title: 'Augment Tree Paper Design 1' },
                { id: 'zIOi9fv_aS8', title: 'Augment Tree Paper Design 2' },
                { id: 'aGneKZOSYvE', title: 'Augment Tree Paper Design 3' },
                { id: 'WZerWEIkvuo', title: 'Ranger Powershot Demo 1' },
                { id: 'HB7M92gc1KA', title: 'Ranger Powershot Demo 2' },
                { id: '6ycnAgeJUUw', title: 'Ranger Powershot Demo 3' },
                { id: 'QiZqCHqzgec', title: 'Ranger Powershot Demo 4' },
              ],
            },
            {
              keyword: 'Mage',
              label: 'Mage Player Videos',
              urls: [
                { id: 'U2EGpW3B5QM', title: 'Mage Demo 1' },
                { id: '1_0bVYqiK_M', title: 'Mage Demo 2' },
                { id: 'ZctG1T3RNrI', title: 'Mage Demo 3' },
              ],
            },
            {
              keyword: 'Ranger',
              label: 'Ranger Player Videos',
              urls: [
                { id: 'V8xNKpdaVAk', title: 'Ranger Demo 1' },
                { id: 'uBfpZSgUDtE', title: 'Ranger Demo 2' },
                { id: 'al8TioPakpg', title: 'Ranger Demo 3' },
              ],
            },
            {
              keyword: 'Tank',
              label: 'Tank Player Videos',
              urls: [
                { id: 'M5utpj6P2lY', title: 'Tank Demo 1' },
                { id: 'IKKnSUNEys4', title: 'Tank Demo 2' },
                { id: 'fPioIyCD0-k', title: 'Tank Demo 3' },
              ],
            },
          ],
        },
        {
          summary: 'Designed the weapon system and led a multidisciplinary team to implement it - over 20 unique weapon types with their own unique animation sets, dynamic weapon FX, branching combos, and skill trees.',
          detail: 'Defined damage type, speed categories, combo cadence, reach, hitbox shapes, procs, and skill tree progression for every weapon. Authored individual weapon GDDs from concept through creative direction approval for over 20 weapons. Built the attack system separating windups, swings, and followthroughs into independently scalable sections, reducing iteration time. Designed the Haste Modulus Curve tool for animator control of animation weight at varied playback speeds.',
          videos: [
            {
              keyword: 'weapon',
              label: 'Weapon Demonstrations',
              urls: [
                { id: 'TPm01BII9S8', title: 'Weapon Combo Demo' },
                { id: 'qINEBvbyqpM', title: 'Weapon Combo Demo 2' },
              ],
            },
          ],
        },
        {
          summary: 'Built the proc/passive set bonus system and status effect promotion chains across all combat roles.',
          detail: 'Tiered 3/5/8-piece bonuses for Healer, DPS, and Tank with status effect promotion chains (bleed→hemo, burn→conflag, chill→freeze). Typed elemental damage/resistance scaling and rarity-based proc chances from Common through Legendary. Basic, Intermediate, and Advanced tiers with role-specific bonuses (mitigation buffs, lifesteal, DoT explosions, thorns).',
        },
        {
          summary: 'Spearheaded development for Siege and open-world PVP systems — Node Siege, Castle Siege, Corruption, Wars, and Harbinger PVX events.',
          detail: 'Led multidisciplinary development efforts for PVP systems - Authored GDDs, managed pipelines, implementation and playtest-informed iteration.  Led a 20 person team to create the Node Siege system.  Authored the full Node Siege GDD: siege scroll acquisition, declaration phases, assault objectives, essence generators, fortification destruction states, wave respawns, and safehouse capture mechanics. Designed 15+ siege machines and gadgets (trebuchets, battering rams, ballistas, siege towers, rebirth carriages). Designed the Corruption & Blight system with 6 penalty tiers and other mechanics (auto-flagging, minimum durations, diminishing returns, corruption banners, repentance quests, lowbie protection), created blueprint logic for corruption gain. Created conflict objectives spanning skirmish, siege prep, and assault phases — VIP assassination, supply destruction, caravan obstruction, propaganda, and asymmetric attacker/defender goals.',
          videos: [
            {
              keyword: 'Siege',
              label: 'Siege Examples',
              urls: [
                { id: 'oTa6ytgOBag&t', title: 'Player Siege Video 1' },
                { id: 'rAfajGNwjW8', title: 'Player Siege Video 2' },
                { id: 'gI5yPLhDQYc&t', title: 'Early Siege Development Video' },
              ],
            },
          ],
        },
        {
          summary: 'Architected the Economy — Leveraged my experience to help the economy team with Artisanship, Harvesting, Reward Tables, Itemization philosophy, Itemization Tooling, Procedural/Automated Item Generation, and Loot pipelines multiple milestones.',
          detail: 'Guided the economy team to develop the full artisanship pipeline (gathering, processing, crafting with gameplay layers). Architected nested reward tables with global loot modifiers at world, economic region, dungeon, node, and POI levels. Authored the itemization philosophy ("The Endless Runway") defining item power curves, rarity tiers, stat restraint, and spawn rate vs. drop rate balancing. Guided the economy team to deliver accurate spigot/sink modeling. Designed the loot distribution for the headline Harbinger event, with corrupted crafting materials, weapon upgrade gems, and equipment choices. Supported the economy team with item effect and proc creation. Developed the Fishing system.',
        },
        {
          summary: 'Designed UX targeting systems (Targeting 3.0, Defensive Target) and led VFX visibility strategy for mass combat performance.',
          detail: 'Designed the Targeting 3.0 system — Defensive Target, Implied Target, Soft Target, Focus Target, Hover Target, and Target-of-Target with full PVP flagging rules. Authored the Defensive Target 2.0 proposal advocating MAYA design philosophy for advanced tab targeting. Led the VFX local/all-client visibility strategy across all 8 classes and weapons, defining simplified FX for mass combat performance. Defined requirements for the Design Data Editor (DDE 2.0) — inheritance, blueprint scripting, expression editor, multi-edit, reference viewer, and human-readable file diffing.',
        },
        {
          summary: 'Led the Design Quorum — established feature ownership, structure, onboarding, process and pipelines, documentation standards, and mentorship across the team.',
          detail: 'Handled leadership responsibilities, reporting directly to the Creative Director. Established the feature ownership hierarchy. Created the pod structure for cross-feature collaboration, the onboarding pipeline for new hires, check-in standards (atomic changelists, JIRA integration, QA handoff), and the mentorship framework. Ran design alignment sessions and cross-discipline reviews with engineering, art, and production.',
        },
      ],
    },
    {
      title: 'Ashes of Creation: Apocalypse',
      category: 'Battle Royale / Arena',
      description: 'Combat, Economy, and Systems Designer for a fast-paced fantasy Battle Royale PVP experience. Owner of several Combat and Economy systems, including abilities, weapons, armor and itemization.',
      image: apocalypseImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat', 'CCC', 'Weapons', 'Abilities', 'Player Economy', 'Real Economy', 'PVP', 'Environment Destruction'],
      color: 'from-blue-500 to-cyan-500',
      role: 'Game Designer',
      company: 'Intrepid Studios',
      years: '2019 - 2020',
      docs: [
        { name: 'Loot Pass', category: 'Economy', thumb: '/doc-thumbs/loot-pass.jpg' },
        { name: 'Compendium Rewards', category: 'Economy', thumb: '/doc-thumbs/compendium-rewards.jpg' },
        { name: 'Destructible Item HP Balance', category: 'Systems', thumb: '/doc-thumbs/destructible-hp-balance.jpg' },
        { name: 'Recovery Analysis', category: 'Combat', thumb: '/doc-thumbs/recovery-analysis.jpg' },
        { name: 'Storm Speed', category: 'Systems', thumb: '/doc-thumbs/storm-speed.jpg' },
      ],
      flavorText: [
        'Core Combat Designer - Collaborated with Animators and FX artists to deliver satisfying weapon attacks, abilities, and environemnt destruction. Leveraged blueprint skills to deliver complex player abilities and CCC development. Modeled out target TTK data, tuned damage, health, armor, and recovery values to deliver the desired TTK.',
        'Orchestrated the Economy - guided artists and engineers to develop weapons, armor, utility items, and custom skins.', 
        'Implemented loot spawners for the entire game, 5,000+ spawners across multiple types (Chests, RareItem, WorldItem, WorldCommon, WorldMana) with per-map spawn rates and difficulty-scaled chest distribution (Easy 25% → Advanced 55%).',
        'Built a tiered Compendium Rewards system (free & paid tracks) with 50+ levels of cosmetics, weapons, emotes, XP boosts, and currency rewards.',
        'Created a formula-driven destructible item HP balance system using base size values, material multipliers, quality tiers, and infrastructure importance.',
        'Conducted competitive analysis benchmarking APOC systems against Fortnite, Apex Legends, and PUBG. Developed presentations for the wider development team on this data.',
        'Engineered the 9-phase storm ring system with dynamic radius shrinking, close duration, cooloff periods, and storm speed scaling tied to a players-in-match sprint speed.',
      ],
    },
    {
      title: 'EverQuest II',
      category: 'MMORPG — Live Service',
      description: 'Systems designer across four expansions and multiple game updates. Owned tradeskill revamps, whole-game itemization passes, PVP stat systems, battleground design, and multi-channel progression strategy.',
      image: eq2Img,
      link: 'https://www.everquest2.com/home',
      tags: ['Itemization', 'PVP Balance', 'Tradeskills', 'Economy', 'Class Balance', 'Progression Design'],
      color: 'from-green-500 to-emerald-500',
      role: 'Apprentice → Associate Game Designer',
      company: 'Sony Online Entertainment',
      years: '2010 - 2013',
      flavorText: [
        {
          summary: 'Re-engineered the tradeskill system for Sentinel\'s Fate — made crafting a viable progression path with Master-level spells and specialized gear throughout leveling.',
          detail: 'Introduced the Far Seas Supply Division questlines and daily missions, ensuring crafters provided consistent and meaningful benefits at every level bracket rather than only at cap. Designed reward tables so tradeskill output (Master spells, specialized gear) stayed competitive with adventuring loot across the full 1–90 range.',
        },
        {
          summary: 'Led the "Great Item Revamp" (GU61) — reworked every item from Level 20 to 90 to eliminate stat bloat and normalize power curves across all eras.',
          detail: 'Audited and rebalanced thousands of items spanning seven years of content to fix cookie-cutter stat distributions. Normalized base stats, proc values, and set bonuses so launch-era items weren\'t vastly inferior to newer items of the same level. Established a consistent power curve that made gear upgrades feel meaningful at every tier.',
        },
        {
          summary: 'Designed level-agnostic Battlegrounds for Age of Discovery — unified stat scaling so players of any level could compete in the same PVP matches.',
          detail: 'Built a stat normalization system that scaled character attributes to a unified baseline, solving queue-time fragmentation caused by narrow level brackets. Allowed friends of different levels to group and earn level-appropriate rewards for the first time. Dramatically reduced average queue times and increased concurrent PVP population.',
        },
        {
          summary: 'Built Champion\'s Respite (GU64) — a dedicated PVP social hub with specialized vendors and cross-faction gathering.',
          detail: 'Designed a neutral lobby space where Qeynos and Freeport players could gather, access specialized PVP vendors, manage gear, and socialize while waiting for match queues. Worked with environment art to create a thematically distinct arena-adjacent space that reinforced PVP identity.',
        },
        {
          summary: 'Architected the multi-channel progression model for Chains of Eternity — distributed gear across questing, tradeskills, and dungeons.',
          detail: 'Designed the Shades of Drinal signature questline, tradeskill prestige tasks, and group dungeon reward tables to provide steady power growth without forcing players exclusively into raiding. Each channel offered distinct item tiers that fed into a unified progression ladder, rewarding breadth of play.',
        },
        {
          summary: 'Overhauled PVP stat mechanics (GU66) — refined Toughness and Lethality to reduce one-shot kills and rebalance class roles.',
          detail: 'Reworked the fundamental PVP damage and mitigation formulas by tuning Toughness scaling curves and Lethality penetration values. Rebalanced class-specific abilities (Brigand debuffs, Assassin burst, Healer sustain) to ensure every class had a meaningful role. Targeted the elimination of one-shot mechanics that were driving players away from competitive play.',
        },
        {
          summary: 'Introduced Best-in-Slot crafted chase items for Tears of Veeshan — rare raid components made top-tier crafters essential to the endgame.',
          detail: 'Designed BiS items requiring rare components dropped from multiple high-end raid bosses, creating a dependency between raiders and high-level crafters. Gave raiders long-term goals beyond initial boss kills and made the crafter community essential to endgame progression, effectively extending the meaningful life of the expansion\'s hardest content.',
        },
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
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A decade of shipped AAA MMORPG development
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
                    <div className="flex items-center gap-2">
                      {projects[featuredIndex].docs && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowDocs(true)}
                          className="relative overflow-hidden flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/40 rounded-full hover:bg-primary-500/20 hover:border-primary-400/60 transition-all cursor-pointer group shadow-[0_0_12px_2px_rgba(56,189,248,0.25)] hover:shadow-[0_0_20px_4px_rgba(56,189,248,0.4)]"
                          title="View design documents"
                        >
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary-400/20 to-transparent" />
                          <motion.div
                            animate={{ rotate: [0, -10, 10, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                          >
                            <FolderOpen size={14} className="text-primary-400" />
                          </motion.div>
                          <span className="text-xs font-medium text-primary-300">{projects[featuredIndex].docs.length} Design Docs</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-3">
                    <a
                      href={projects[featuredIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      {projects[featuredIndex].title}
                      <ExternalLink size={16} className="inline-block ml-2 mb-1 opacity-40" />
                    </a>
                  </h3>
                  
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

        <AnimatePresence>
          {showDocs && projects[featuredIndex].docs && (
            <DocGallery
              docs={projects[featuredIndex].docs}
              title={`${projects[featuredIndex].title} — Design Documents`}
              onClose={() => setShowDocs(false)}
            />
          )}
        </AnimatePresence>

        {/* Project Selector Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {projects.map((project, index) => {
            if (index === featuredIndex) return null
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects
