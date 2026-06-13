// // src/features/home/sections/TopHeadlines.jsx

// import { memo } from 'react'
// import { Link } from 'react-router-dom'
// import { headlinesData } from '@/shared/constants/headlines.data'

// const TopHeadlines = memo(() => {
//   // Show first 9 on home page
//   const headlines = headlinesData.slice(0, 9)

//   return (
//     <div className="mb-8">
//       <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Top Headlines</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         {headlines.map((h) => (
//           <Link
//             key={h.id}
//             to={`/headlines/${h.slug}`}
//             className="flex items-start gap-2 cursor-pointer group"
//           >
//             <div className="w-1.5 h-1.5 rounded-full bg-[#00698c] mt-1.5 flex-shrink-0" />
//             <div>
//               <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
//                 {h.title}
//               </p>
//               <span className="text-xs text-gray-400 dark:text-gray-500">{h.time}</span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// })

// export default TopHeadlines


import { memo } from 'react'
import { Link } from 'react-router-dom'
import { headlinesData } from '@/shared/constants/headlines.data'

const TopHeadlines = memo(() => {
  const headlines = headlinesData.slice(0, 9)

  return (
    <div className="mb-8">
      {/* CHANGED: text-lg font-bold → text-2xl font-extrabold */}
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Top Headlines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {headlines.map((h) => (
          <Link
            key={h.id}
            to={`/headlines/${h.slug}`}
            className="flex items-start gap-2.5 cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full bg-[#00698c] mt-1.5 flex-shrink-0" />
            <div>
              {/* CHANGED: text-sm → text-sm font-semibold */}
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
                {h.title}
              </p>
              {/* CHANGED: text-xs → text-xs font-medium */}
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{h.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

export default TopHeadlines