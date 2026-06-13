

const BASE_URL = 'https://data.sportlyradar.com/api/latest_news'

// Helper function for making authenticated requests (add your auth token)
const getHeaders = (includeAuth = false) => {
  const headers = {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (includeAuth) {
    headers['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`
  }

  return headers
}

/**
 * Core fetch function with full query param support.
 * Supports: category (url segment), limit, offset, status, id, date, start_date, end_date
 */
const fetchNews = async ({ category = null, limit = 1000, offset = 0, status = null, id = null, date = null, start_date = null, end_date = null } = {}) => {
  // Build URL: category goes as URL segment, rest as query params
  let url = category ? `${BASE_URL}/${category}/` : `${BASE_URL}/`

  const params = new URLSearchParams()
  params.set('limit', limit)
  params.set('offset', offset)
  //if (status)     params.set('status', status)
  params.set('status', status || 'publish')
  if (id)         params.set('id', id)
  if (date)       params.set('date', date)
  if (start_date) params.set('start_date', start_date)
  if (end_date)   params.set('end_date', end_date)

  url = `${url}?${params.toString()}`

  const res = await fetch(url, { headers: getHeaders(false) })
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  return res.json()
}

// Edit latest news
const editLatestNews = async (newsData) => {
  const res = await fetch(`${BASE_URL}/edit_latest_news/`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(newsData),
  })
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  return res.json()
}

// Delete news item
const deleteNews = async (newsId) => {
  const res = await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: getHeaders(true),
    body: JSON.stringify({ id: newsId }),
  })
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  return res.json()
}

// ✅ status_code === 200 AND status === "publish" + duplicate id filter
const filterValid = (items) => {
  const seen = new Set()
  return items.filter((item) => {
    if (item.status_code !== 200) return false
    if (item.status !== 'publish') return false
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

/**
 * Tags field API se string, array, ya null aata hai — normalize karo array me
 */
const normalizeTags = (tags) => {
  if (!tags) return []
  if (Array.isArray(tags)) return tags.map((t) => t.trim()).filter(Boolean)
  if (typeof tags === 'string') {
    return tags.split(',').map((t) => t.trim()).filter(Boolean)
  }
  return []
}

/**
 * Parse markdown link format: [Label](url)
 */
export const parseSourceLink = (source) => {
  if (!source) return { label: '', url: null }
  const match = source.match(/^\[(.+?)\]\((.+?)\)$/)
  if (match) return { label: match[1], url: match[2] }
  if (source.startsWith('http')) return { label: source, url: source }
  return { label: source, url: null }
}

const mapItem = (item, fallbackCategory) => {
  const parsedSource = parseSourceLink(item.source)
  return {
    id:            item.id,
    title:         item.title,
    description:   item.description,
    image:         item.image,
    source:        parsedSource.label,
    sourceUrl:     parsedSource.url ?? item.url,
    publishedAt:   item.publishedAt,
    url:           item.url,
    final_content: item.final_content ?? '',
    tags:          normalizeTags(item.tags),
    category:      item.category ?? fallbackCategory,
    subCategory:   item.subCategory ?? null,
    slug: `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${item.id}`,
  }
}

/**
 * Get all latest news without category filter.
 * Fetches ALL published articles using limit=1000, offset=0
 */
export const getAllLatestNews = async ({ limit = 1000, offset = 0 } = {}) => {
  try {
    const json = await fetchNews({ limit, offset })
    // API returns { status, meta, data } structure
    const rawData = json.data ?? json ?? []
    const valid = filterValid(Array.isArray(rawData) ? rawData : [])
    return {
      success: true,
      data: valid.map((item) => mapItem(item, 'General')),
      meta: json.meta ?? { total: valid.length, limit, offset, returned: valid.length },
    }
  } catch (err) {
    console.error('getAllLatestNews error:', err)
    return { success: false, data: [], meta: null }
  }
}

/**
 * Get news by specific category using the URL segment pattern:
 * GET /api/latest_news/<category>/?limit=X&offset=Y
 */
export const getNewsByCategory = async (category, { limit = 1000, offset = 0 } = {}) => {
  try {
    const json = await fetchNews({ category, limit, offset })
    const rawData = json.data ?? json ?? []
    const valid = filterValid(Array.isArray(rawData) ? rawData : [])
    return {
      success: true,
      data: valid.map((item) => mapItem(item, category)),
      category,
      meta: json.meta ?? { total: valid.length, limit, offset, returned: valid.length },
    }
  } catch (err) {
    console.error(`getNewsByCategory (${category}) error:`, err)
    return { success: false, data: [], category, meta: null }
  }
}

// Get cricket news
export const getCricketNews = async (options) => getNewsByCategory('cricket', options)

// Get IPL news
export const getIPLNews = async (options) => getNewsByCategory('ipl', options)

// Edit news item
export const updateLatestNews = async (newsItem) => {
  try {
    const result = await editLatestNews(newsItem)
    return { success: true, data: result, message: 'News updated successfully' }
  } catch (err) {
    console.error('updateLatestNews error:', err)
    return { success: false, data: null, message: err.message || 'Failed to update news' }
  }
}

// Delete news item
export const removeNews = async (newsId) => {
  try {
    const result = await deleteNews(newsId)
    return { success: true, data: result, message: 'News deleted successfully' }
  } catch (err) {
    console.error('removeNews error:', err)
    return { success: false, data: null, message: err.message || 'Failed to delete news' }
  }
}

/**
 * Main export used by pages.
 * - No category → fetch all (limit=1000, offset=0)
 * - With category → fetch from category endpoint
 */
export const getLatestNews = async (category = null, options = {}) => {
  if (category) return getNewsByCategory(category, options)
  return getAllLatestNews(options)
}