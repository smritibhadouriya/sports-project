import { useState } from 'react'
import SeoManager from '@/core/seo/SeoManager'
import { seoConfig } from '@/config/seo.config'
import Button from '@/design-system/Button'

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.264 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const feedbackOptions = [
  { label: 'Poor', emoji: '😢', value: 'poor' },
  { label: 'OK', emoji: '😐', value: 'ok' },
  { label: 'Great', emoji: '😊', value: 'great' },
  { label: 'Elite', emoji: '🔥', value: 'elite' },
]

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })
  const [feedback, setFeedback] = useState('great')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <SeoManager
        title={seoConfig.pages.contact.title}
        description={seoConfig.pages.contact.description}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0a3d4f] to-[#0d5068] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Get in the Game –<br />Talk to Us
          </h1>
          <p className="text-lg text-white/70 max-w-lg">
            Whether you're a die-hard fan with a tip or a potential partner looking to collaborate, we're here to listen to your stats and stories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Contact Form */}
          <div className="flex-1">
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Send us a Message</h2>

              {submitted && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-sm text-green-700 dark:text-green-400">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00698c] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00698c] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-[#1c2128] text-gray-900 dark:text-white focus:outline-none focus:border-[#00698c] transition-colors appearance-none cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Partnership</option>
                      <option>Technical Support</option>
                      <option>Press & Media</option>
                      <option>Content Tip</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00698c] transition-colors resize-none"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 space-y-4">
            {/* Quick Feedback */}
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Quick Feedback</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Rate your experience today</p>
              <div className="flex items-center gap-3">
                {feedbackOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFeedback(opt.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors flex-1 ${
                      feedback === opt.value
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stay Connected */}
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Stay Connected</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Follow us for live updates and behind-the-scenes content.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: TwitterIcon, label: 'Twitter' },
                  { Icon: InstagramIcon, label: 'Instagram' },
                  { Icon: FacebookIcon, label: 'Facebook' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="w-10 h-10 bg-[#0a3d4f] text-white rounded-lg flex items-center justify-center hover:bg-[#00698c] transition-colors"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="w-9 h-9 bg-[#00698c] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeWidth="2" strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Headquarters</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="w-9 h-9 bg-[#00698c] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage


