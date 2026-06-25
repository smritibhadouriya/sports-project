
import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaClock } from 'react-icons/fa'

const BlogCard = memo(({ post, compact = false }) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/blogs/${post.slug}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-fit ${compact ? 'h-44' : 'h-52'}`}
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          {post.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Read Time */}
        {post.readTime && (
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-2">
            <FaClock className="text-[10px]" />
            <span>{post.readTime} min read</span>
          </div>
        )}

        {/* Title */}
        <h3
          className={`font-bold text-gray-900 dark:text-white leading-snug mb-2 ${
            compact ? 'text-base' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>

        {/* Content Preview */}
        {post.contentPreview && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3 flex-grow">
            {post.contentPreview}
          </p>
        )}

        {/* Bottom section */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            By {post.author} • {post.date}
          </span>

          <Link
            to={`/blogs/${post.slug}`}
            className="text-xs font-bold text-gray-800 dark:text-white hover:text-[#00698c] dark:hover:text-[#3387a3] transition-colors flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            Read More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2.5" strokeLinecap="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogCard

// import { memo } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const BlogCard = memo(({ post, compact = false }) => {
//   const navigate = useNavigate()

//   return (
//     <div
//       className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer h-full flex flex-col"
//       onClick={() => navigate(`/blogs/${post.slug}`)}
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden">
//         <img
//           src={post.image}
//           alt={post.title}
//           className={`w-full object-cover ${compact ? 'h-44' : 'h-52'}`}
//           loading="lazy"
//         />
//         <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
//           {post.categoryLabel}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col flex-grow">
//         {/* Title */}
//         <h3
//           className={`font-bold text-gray-900 dark:text-white leading-snug mb-2 ${
//             compact ? 'text-base' : 'text-lg'
//           }`}
//         >
//           {post.title}
//         </h3>

//         {/* Excerpt */}
//         <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3 flex-grow">
//           {post.excerpt}
//         </p>

//         {/* Bottom section (always fixed at bottom) */}
//         <div className="flex items-center justify-between mt-auto">
//           <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
//             By {post.author} • {post.date}
//           </span>

//           <Link
//             to={`/blogs/${post.slug}`}
//             className="text-xs font-bold text-gray-800 dark:text-white hover:text-[#00698c] dark:hover:text-[#3387a3] transition-colors flex items-center gap-0.5"
//             onClick={(e) => e.stopPropagation()}
//           >
//             Read More
//             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeWidth="2.5" strokeLinecap="round" d="M9 18l6-6-6-6" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// })

// BlogCard.displayName = 'BlogCard'

// export default BlogCard


// // import { memo } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'

// // const BlogCard = memo(({ post, compact = false }) => {
// //   const navigate = useNavigate()

// //   return (
// //     <div
// //       className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer"
// //       onClick={() => navigate(`/blogs/${post.slug}`)}
// //     >
// //       {/* Image */}
// //       <div className="relative overflow-hidden">
// //         <img
// //           src={post.image}
// //           alt={post.title}
// //           // CHANGED: compact h-36 → h-44, non-compact h-44 → h-52
// //           className={`w-full object-cover ${compact ? 'h-44' : 'h-52'}`}
// //           loading="lazy"
// //         />
// //         <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
// //           {post.categoryLabel}
// //         </span>
// //       </div>

// //       {/* Content */}
// //       <div className="p-4">
// //         {/* CHANGED: compact text-sm → text-base font-bold; non-compact text-base → text-lg font-bold */}
// //         <h3 className={`font-bold text-gray-900 dark:text-white leading-snug mb-2 ${compact ? 'text-base' : 'text-lg'}`}>
// //           {post.title}
// //         </h3>
// //         {/* CHANGED: text-xs → text-sm; line-clamp-3 kept */}
// //         <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3">
// //           {post.excerpt}
// //         </p>
// //         <div className="flex items-center justify-between">
// //           {/* CHANGED: text-xs → text-xs font-medium */}
// //           <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
// //             By {post.author} • {post.date}
// //           </span>
// //           <Link
// //             to={`/blogs/${post.slug}`}
// //             className="text-xs font-bold text-gray-800 dark:text-white hover:text-[#00698c] dark:hover:text-[#3387a3] transition-colors flex items-center gap-0.5"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             Read More
// //             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeWidth="2.5" strokeLinecap="round" d="M9 18l6-6-6-6" />
// //             </svg>
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // })

// // BlogCard.displayName = 'BlogCard'

// // export default BlogCard



// /////// ye neeche api vala hai



// // import { memo } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'

// // const BlogCard = memo(({ post, compact = false }) => {
// //   const navigate =useNavigate();

// //   return (
// //     <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer">
// //      <Link to={`/blogs/${post.slug}`} className="block">
// //       {/* Image */}
// //       <div className="relative overflow-hidden">
// //         <img
// //           src={post.image}
// //           alt={post.title}
// //           className={`w-full object-cover ${compact ? 'h-36' : 'h-44'}`}
// //           loading="lazy"
// //         />
// //         <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
// //          {post.category}
// //         </span>
// //       </div>

// //       {/* Content */}
// //       <div className="p-3">
// //         <h3 className={`font-bold text-gray-900 dark:text-white leading-snug mb-1 ${compact ? 'text-sm' : 'text-base'}`}>
// //           {post.title}
// //         </h3>
// //         <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3">
// //           {post.description}
// //         </p>
// //         <div className="flex items-center justify-between">
// //           <span className="text-xs text-gray-400 dark:text-gray-500">
// //             By {post.author} • {new Date(post.date).toLocaleDateString()}
// //           </span>
// //           <Link
// //             to={`/blogs/${post.slug}`}
// //             className="text-xs font-semibold text-gray-800 dark:text-white hover:text-[#00698c] dark:hover:text-[#3387a3] transition-colors flex items-center gap-0.5"
// //           >
// //             Read More
// //             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeWidth="2.5" strokeLinecap="round" d="M9 18l6-6-6-6" />
// //             </svg>
// //           </Link>
// //         </div>
// //       </div>

// // </Link>
// //     </div>
// //   )
// // })

// // BlogCard.displayName = 'BlogCard'

// // export default BlogCard



