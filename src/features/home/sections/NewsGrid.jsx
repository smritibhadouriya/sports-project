// import { memo } from 'react'
// import { Link } from 'react-router-dom'

// /**
//  * @param {string}   title     - Section heading
//  * @param {string}   viewAllTo - Route for "View all" button (e.g. "/cricket/news")
//  * @param {Array}    items     - Array of news objects
//  * @param {string}   basePath  - Base detail route prefix (e.g. "/cricket/news")
//  */
// const NewsGrid = memo(({ title, viewAllTo, items = [], basePath }) => {
//   const preview = items.slice(0, 6)
//   const [featured, ...rest] = preview

//   if (!featured) return null

//   return (
//     <div className="mb-10">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
//         <Link
//           to={viewAllTo}
//           className="text-sm text-[#00698c] hover:underline font-medium"
//         >
//           View all
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:items-stretch">

//         {/* ── Featured large item — height driven by right column on md+ ── */}
//         <Link
//           to={`${basePath}/${featured.slug}`}
//           className="
//             relative rounded-lg overflow-hidden cursor-pointer group block
//             h-[56vw] max-h-80
//             md:h-auto md:max-h-none md:self-stretch
//           "
//         >
//           <img
//             src={featured.image}
//             alt={featured.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//             loading="lazy"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
//             <p className="text-white font-bold text-base leading-tight">{featured.title}</p>
//           </div>
//         </Link>

//         {/* ── 5 small cards — flex-1 on each so they equally fill left image height ── */}
//         <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/60 md:h-full">
//           {rest.slice(0, 5).map((item) => (
//             <Link
//               key={item.id}
//               to={`${basePath}/${item.slug}`}
//               className="flex items-center gap-3 cursor-pointer group flex-1 py-1.5 first:pt-0 last:pb-0"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-24 h-16 object-cover rounded flex-shrink-0"
//                 loading="lazy"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#00698c] transition-colors line-clamp-3 leading-snug">
//                 {item.title}
//               </p>
//             </Link>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// })

// export default NewsGrid

import { memo } from 'react'
import { Link } from 'react-router-dom'

const NewsGrid = memo(({ title, viewAllTo, items = [], basePath }) => {
  const preview = items.slice(0, 6)
  const [featured, ...rest] = preview

  if (!featured) return null

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {/* CHANGED: text-lg font-bold → text-2xl font-extrabold */}
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
        <Link
          to={viewAllTo}
          className="text-sm text-[#00698c] hover:underline font-medium"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:items-stretch">

        {/* ── Featured large item ── */}
        <Link
          to={`${basePath}/${featured.slug}`}
          className="
            relative rounded-lg overflow-hidden cursor-pointer group block
            h-[56vw] max-h-80
            md:h-auto md:max-h-none md:self-stretch
          "
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
            {/* CHANGED: text-base → text-lg font-extrabold */}
            <p className="text-white font-extrabold text-lg leading-tight">{featured.title}</p>
          </div>
        </Link>

        {/* ── 5 small cards ── */}
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/60 md:h-full">
          {rest.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={`${basePath}/${item.slug}`}
              className="flex items-center gap-3 cursor-pointer group flex-1 py-2 first:pt-0 last:pb-0"
            >
              {/* CHANGED: w-24 h-16 → w-28 h-20 */}
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              {/* CHANGED: text-sm → text-sm font-semibold */}
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#00698c] transition-colors line-clamp-3 leading-snug">
                {item.title}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
})

export default NewsGrid