import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ComingSoon = memo(({ sport = 'This Sport', emoji = '🏆' }) => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1c2128] dark:to-[#15191e] border border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 sm:p-12 text-center">

          {/* Icon */}
          <div className="mb-5 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00698c]/10 dark:bg-[#00698c]/20 text-4xl">
            {emoji}
          </div>

          {/* Status badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-xs font-bold text-amber-600 dark:text-amber-400">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              Coming Soon
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
            {sport} is on its way!
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We're working hard to bring you live scores, news, schedules and
            highlights for {sport}. This section will be live very soon —
            stay tuned!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00698c] text-white text-sm font-semibold rounded-lg hover:bg-[#005a7a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
              </svg>
              Back to Home
            </button>

            <Link
              to="/news"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Browse Latest News
            </Link>
          </div>
        </div>

        {/* Decorative bottom gradient strip - matches site accent */}
        <div className="h-1 bg-gradient-to-r from-[#00698c] via-[#3387a3] to-[#00698c]" />
      </div>

 
    </div>
  )
})

ComingSoon.displayName = 'ComingSoon'
export default ComingSoon