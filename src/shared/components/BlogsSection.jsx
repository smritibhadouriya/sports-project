


import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '@/shared/components/BlogCard'
import { getBlogs } from '../../service/blogs.service.js'
import { VITE_BACKEND_URL } from '../../../config.js'

const resolveImage = (banner) => {
  if (!banner) return ''

  if (typeof banner === 'string') {
    return banner.startsWith('http')
      ? banner
      : `${VITE_BACKEND_URL}/${banner.replace(/^\//, '')}`
  }

  if (banner?.src) {
    const s = banner.src.trim()
    if (!s) return ''
    if (banner.mode === 'url' || s.startsWith('http')) return s
    return `${VITE_BACKEND_URL}${s.startsWith('/') ? s : '/' + s}`
  }

  return ''
}
const BlogsRow = memo(({ limit = 4, showViewAll = true }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs()
        const published = (res.data.blogs || []).filter(
          (b) => b.status === 'published'
        )
        setBlogs(published)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

const posts = blogs.slice(0, limit).map((post) => ({
  id: post._id,
  slug: post.slug,
  title: post.title,
  excerpt: post.description,
  categoryLabel: post.category,
  image: resolveImage(post.bannerImage), 
  date: new Date(post.createdAt).toLocaleDateString(),
  author: post.author?.name || "Unknown",
}))

  return (
    <div className="mb-12 mt-4">
      <div className="flex items-center justify-between mb-4"> 
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Blogs</h2>
        {showViewAll && posts.length > 0 && (
          <Link
            to="/blogs"
            className="text-sm font-medium text-[#00698c] hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      {/* ── Loading State ── */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center  bg-gray-50 dark:bg-gray-800/40">
          
          <p className="text-gray-700 dark:text-gray-300 font-medium">No blogs published yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Check back soon for new articles.
          </p>
        </div>
      )}

      {/* ── Blog Cards ── */}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} compact />
          ))}
        </div>
      )}
    </div>
  )
})

BlogsRow.displayName = 'BlogsRow'

export default BlogsRow