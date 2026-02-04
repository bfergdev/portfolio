import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Flame } from 'lucide-react'
import { useState } from 'react'
import ashesImg from '../../images/ashes.png'
import apocalypseImg from '../../images/apocalypse.png'
import veeshanImg from '../../images/veeshan.png'
import chainsImg from '../../images/chains.png'
import discoveryImg from '../../images/discovery.png'
import veliousImg from '../../images/velious.png'

const Projects = () => {
  const [burningAshes, setBurningAshes] = useState(false)
  const [ashesDestroyed, setAshesDestroyed] = useState(false)
  const projects = [
    {
      title: 'Ashes of Creation',
      category: 'MMORPG',
      description: 'Core combat & systems designer. Feature owner for Mage, Tank, and Ranger archetypes. Designed weapon system, siege mechanics, and PVP/PVX balance. Led itemization and tradeskill implementation.',
      image: ashesImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat Design', 'Archetype Owner', 'PVP/PVX', 'Systems Design'],
      color: 'from-purple-500 to-pink-500',
      role: 'Senior Game Designer III',
      company: 'Intrepid Studios',
      years: '2020 - 2025',
    },
    {
      title: 'Ashes of Creation: Apocalypse',
      category: 'Battle Royale / Arena',
      description: 'Designed, implemented, and balanced dozens of unique weapons, armor, and combat items with thousands of spawners. Combat and economy design.',
      image: apocalypseImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat Design', 'Economy', 'Itemization', 'Balance'],
      color: 'from-blue-500 to-cyan-500',
      role: 'Game Designer',
      company: 'Intrepid Studios',
      years: '2019 - 2020',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isAshesCard = project.title === 'Ashes of Creation'
            if (isAshesCard && ashesDestroyed) return null
            
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onClick={() => {
                if (isAshesCard && !burningAshes) {
                  setBurningAshes(true)
                  setTimeout(() => setAshesDestroyed(true), 2000)
                }
              }}
              className={`group relative ${isAshesCard && !burningAshes ? 'cursor-pointer' : ''}`}
            >
              {/* Fire effect overlay for Ashes of Creation */}
              <AnimatePresence>
                {isAshesCard && burningAshes && (
                  <>
                    {/* Multiple flame particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          y: [-20, -60, -100, -140],
                          x: [(i - 6) * 10, (i - 6) * 15, (i - 6) * 20],
                          scale: [0.5, 1.2, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: 2,
                        }}
                        className="absolute inset-0 pointer-events-none z-30"
                        style={{
                          left: `${(i / 12) * 100}%`,
                          bottom: 0,
                        }}
                      >
                        <Flame className="w-8 h-8 text-orange-500" fill="currentColor" />
                      </motion.div>
                    ))}
                    {/* Burn overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0.6, 1] }}
                      transition={{ duration: 2 }}
                      className="absolute inset-0 bg-gradient-to-t from-orange-600 via-red-500 to-yellow-400 mix-blend-multiply z-20 rounded-2xl"
                    />
                    {/* Disintegration effect */}
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="absolute inset-0 z-10"
                    />
                  </>
                )}
              </AnimatePresence>
              <div className={`absolute inset-0 bg-gradient-to-r ${project.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-primary-500/20 rounded-2xl overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 animate-pulse`} />
                  <div className={`absolute inset-0 bg-gradient-to-tl ${project.color} opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Animated orbs */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                  <div className={`absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr ${project.color} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg hover:bg-primary-500/50 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={20} className="pointer-events-none" />
                    </motion.a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-primary-400 mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  {project.role && (
                    <div className="mb-4 text-sm">
                      <div className="text-accent-400 font-semibold">{project.role}</div>
                      <div className="text-gray-500">{project.company} • {project.years}</div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
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
            </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects
