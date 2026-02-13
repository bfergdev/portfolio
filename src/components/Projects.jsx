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
      description: 'Core combat & systems designer. Feature owner for Mage, Tank, and Ranger archetypes. Designed weapon system, siege mechanics, and PVP/PVX balance. Led itemization and tradeskill implementation.',
      image: ashesImg,
      link: 'https://ashesofcreation.com/',
      tags: ['Combat Design', 'Archetype Owner', 'PVP/PVX', 'Systems Design'],
      color: 'from-purple-500 to-pink-500',
      role: 'Senior Game Designer',
      company: 'Intrepid Studios',
      years: '2020 - 2025',
      flavorText: [
        'Spearheaded multidisciplinary development from conception through launch on: Classes, Weapons, PVP, Siege, Combat Balance, CCC, Mounts/Vehicles, PVE Enemies, Fishing, & Narrative Events.',
        'Performed leadership duties including Hiring, Onboarding, Training, and Mentoring.',
        'Unlocked creativity with blueprint and scripting support across the project.',
        'Aligned with fellow designers to create a unified vision.',
        'Partnered with engineers, providing them with technical direction and iterative consultation in developing our tools and systems.',
        'Enabled artists with creative direction and technical implementation of assets.',
        'Coordinated with production and the wider team to manage asset pipelines and deliver accurate timelines.',
      ],
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
