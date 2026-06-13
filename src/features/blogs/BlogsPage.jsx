import { useEffect, useState } from 'react'
import SeoManager from '@/core/seo/SeoManager'
import { seoConfig } from '@/config/seo.config'
import { appConfig } from '@/config/app.config'
import BlogCard from '@/shared/components/BlogCard'
import { getBlogs } from '../../service/blogs.service.js'
import Button from '@/design-system/Button'
import { useLocation } from 'react-router-dom'

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

const stripHtml = (html = '') => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const mapPost = (post) => {
  const resolved = resolveImage(post.bannerImage)
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    contentPreview: stripHtml(post.content).slice(0, 120).trim() + (post.content?.length > 120 ? '...' : ''),
    categoryLabel: post.category,
    image: resolved,
      date: post.updatedAt
      ? new Intl.DateTimeFormat('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format(new Date(post.updatedAt||post.createdAt))
      : '',
    author: post.author?.name || 'Unknown Author',
    readTime: post.readTime || null,
  }
}

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(8)
  const [blogs, setBlogs] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

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

  // ── location.state se activeTab aur selectedTag handle karo ──
  useEffect(() => {
    if (!location.state) return

    if (location.state.activeTab) {
      // category match karo appConfig.blogCategories se (case-insensitive)
      const matched = appConfig.blogCategories.find(
        (cat) => cat.id.toLowerCase() === location.state.activeTab.toLowerCase()
          || cat.label?.toLowerCase() === location.state.activeTab.toLowerCase()
      )
      setActiveCategory(matched ? matched.id : location.state.activeTab.toLowerCase())
      setActiveTag(null)
      setVisibleCount(8)
    }

    if (location.state.selectedTag) {
      setActiveTag(location.state.selectedTag)
      setActiveCategory('all')
      setVisibleCount(8)
    }

    // state clear karo taaki back/forward pe repeat na ho
    window.history.replaceState({}, '')
  }, [location.state])

  const filtered = blogs
    .filter(b =>
      activeCategory === 'all' || b.category?.toLowerCase() === activeCategory.toLowerCase()
    )
    .filter(b =>
      !activeTag || (b.tags || []).some(t => t?.toLowerCase() === activeTag.toLowerCase())
    )

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId)
    setActiveTag(null)
    setVisibleCount(8)
  }

  const visible = filtered.slice(0, visibleCount).map(mapPost)

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading blogs...</div>
  }

  return (
    <>
      <SeoManager
        title={seoConfig.pages.blogs.title}
        description={seoConfig.pages.blogs.description}
      />

      <div className="text-black dark:text-white py-4 px-4">
        <div className="max-w-7xl mx-auto sm:px-12 md:px-2 lg:px-6">
          <h1 className="text-xl font-bold dark:text-white">Blogs</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {appConfig.blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-[#0a3d4f] text-white border-[#0a3d4f]'
                  : 'bg-white dark:bg-[#1c2128] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-[#00698c]'
              }`}
            >
              {cat.emoji && <span>{cat.emoji}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {activeTag && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Filtered by tag:</span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#292B97]/10 text-[#292B97] text-sm font-medium rounded-full">
              #{activeTag}
              <button
                onClick={() => setActiveTag(null)}
                className="ml-1 text-[#292B97] hover:text-red-500 font-bold leading-none"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Blogs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {visible.length < filtered.length && (
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => setVisibleCount((c) => c + 8)}>
              Load More
            </Button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No blogs found in this category.
          </p>
        )}
      </div>
    </>
  )
}

export default BlogsPage