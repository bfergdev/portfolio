import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
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
            Available for Immediate Hire
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Actively seeking opportunities as a Senior Game Designer, Lead Game Designer, or Design Principal.
            10 years of proven AAA MMORPG experience. Remote preferred, available to start immediately.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-primary-500/30 rounded-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-500 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-primary-500/30 rounded-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-500 transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-primary-500/30 rounded-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg font-semibold text-lg shadow-lg shadow-primary-500/50 hover:shadow-primary-500/80 transition-shadow flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-4 bg-slate-800/50 border border-primary-500/30 rounded-xl hover:border-primary-500 transition-colors group"
                  >
                    <social.icon className="w-6 h-6 text-primary-400 group-hover:text-primary-300" />
                    <span className="text-gray-300 group-hover:text-white">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Info</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Location</div>
                  <div className="text-white font-medium">Knoxville, Tennessee</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Work Preference</div>
                  <div className="text-white font-medium">Remote</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Availability</div>
                  <div className="text-white font-medium">Immediately</div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Employment Type</div>
                  <div className="text-white font-medium">Full-time • Contract</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-white mb-3">🎯 Actively Seeking Opportunities</h4>
              <p className="text-gray-300 mb-4">
                <strong>Available Immediately</strong> - 10 years of AAA MMORPG experience in combat design, 
                systems design, and class balance. Proven track record shipping 6 successful titles and 
                leading feature development on Ashes of Creation and EverQuest II.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-400">
                  <span className="font-medium">• Senior Game Designer</span>
                </div>
                <div className="flex items-center gap-2 text-primary-400">
                  <span className="font-medium">• Lead Game Designer</span>
                </div>
                <div className="flex items-center gap-2 text-primary-400">
                  <span className="font-medium">• Design Principal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center text-gray-500"
        >
          <p>© 2026 Brian Ferguson. Senior Game Designer III. Built with React, Vite & TailwindCSS.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
