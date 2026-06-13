
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VITE_BACKEND_URL } from '../../../config.js';
import {
  FaArrowLeft, FaFacebookF, FaTwitter, FaLinkedinIn,
  FaWhatsapp, FaChevronRight, FaCopy, FaCheck, FaUser, FaClock,
  FaHome,
} from 'react-icons/fa';

import { getBlogs, getBlogBySlug } from '../../service/blogs.service.js';
import { submitComment, fetchApprovedComments } from '../../service/comment.service';
import SEO from '../../components/SEO.jsx';

const fallbackAvatar =
  'https://ui-avatars.com/api/?name=Author&background=292B97&color=fff&size=80';

const Breadcrumb = ({ blog, navigate }) => {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-md">
        <li className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-[#292B97] transition-colors flex items-center gap-1.5"
          >
            <FaHome className="text-md" />
          
          </button>
        </li>
        
        <li className="flex items-center">
          <FaChevronRight className="text-gray-400 text-[10px] mx-1" />
          <button
            onClick={() => navigate('/blogs')}
            className="text-gray-500 hover:text-[#292B97] transition-colors"
          >
            Blog
          </button>
        </li>
        
        {blog?.category && (
          <li className="flex items-center">
            <FaChevronRight className="text-gray-400 text-[10px] mx-1" />
            <button
              onClick={() => navigate('/blogs', { state: { activeTab: blog.category } })}
              className="text-gray-500 hover:text-[#292B97] transition-colors capitalize"
            >
              {blog.category}
            </button>
          </li>
        )}
        
        <li className="flex items-center">
          <FaChevronRight className="text-gray-400 text-[10px] mx-1" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">
            {blog?.title || 'Article'}
          </span>
        </li>
      </ol>
    </nav>
  );
};

/* ── Image helpers ── */
const resolveImgUrl = (imgObj) => {
  if (!imgObj) return null;
  if (typeof imgObj === 'string') {
    const s = imgObj.trim();
    if (!s) return null;
    return s.startsWith('http') ? s : `${VITE_BACKEND_URL}/${s.replace(/^\//, '')}`;
  }
  if (imgObj?.src) {
    const s = imgObj.src.trim();
    if (!s) return null;
    if (imgObj.mode === 'url' || s.startsWith('http')) return s;
    return `${VITE_BACKEND_URL}${s.startsWith('/') ? s : '/' + s}`;
  }
  return null;
};

const getBlogBanner = (blog) =>
  resolveImgUrl(blog?.bannerImage) || resolveImgUrl(blog?.image) || null;

const getAuthorAvatar = (a) => (a?.image ? resolveImgUrl(a.image) : null);

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

const AuthorBioCard = ({ authorName, authorImgUrl, authorObj, onAuthorClick }) => {
  const bio = authorObj?.bio || authorObj?.description || null;
  const socials = authorObj?.socials || authorObj?.social || null;

  return (
    <div className="mt-10 mb-2">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-5">
        <button
          onClick={onAuthorClick}
          className="shrink-0 group/av focus:outline-none"
          title={`View ${authorName}'s profile`}
        >
          {authorImgUrl ? (
            <img
              src={authorImgUrl}
              alt={authorName}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gray-200
                         group-hover/av:border-[#292B97] group-hover/av:shadow-lg transition-all duration-300"
              onError={e => {
                e.target.src = fallbackAvatar;
              }}
            />
          ) : (
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-[#292B97] to-[#4B6CB7]
                            flex items-center justify-center text-white text-2xl font-bold
                            border-2 border-gray-200 group-hover/av:border-[#292B97] transition-all duration-300">
              {(authorName || 'A').charAt(0).toUpperCase()}
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0 text-left">
          <button
            onClick={onAuthorClick}
            className="text-xl font-bold text-gray-900 hover:text-[#292B97]
                       transition-colors duration-200 inline-flex items-center gap-1.5 group/name"
          >
            {authorName}
            <svg
              className="w-3.5 h-3.5 opacity-0 group-hover/name:opacity-100 transition-opacity"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>

        {bio ? (
  <div
    className="text-sm text-gray-500 mt-1.5 line-clamp-3 [&_p]:mb-2"
    dangerouslySetInnerHTML={{ __html: bio }}
  />
) : (
  <p className="text-sm text-gray-500 leading-relaxed mt-1.5">
    Expert contributor. Passionate about sharing insights and practical knowledge.
  </p>
)}

          {socials && (
            <div className="flex items-center gap-3 mt-3">
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white text-xs hover:opacity-80 transition-opacity">
                  <FaTwitter />
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-xs hover:opacity-80 transition-opacity">
                  <FaLinkedinIn />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-xs hover:opacity-80 transition-opacity">
                  <FaFacebookF />
                </a>
              )}
            </div>
          )}

          <button
            onClick={onAuthorClick}
            className="mt-3 text-sm font-semibold text-[#292B97] hover:text-[#1e237e]
                       transition-colors duration-200 inline-flex items-center gap-1"
          >
            View all posts by {authorName}
            <FaChevronRight className="text-[0.6rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const toSlug = (t = '') =>
  t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

const toAuthorSlug = (n = '') =>
  n.toLowerCase().trim().replace(/\s+/g, '-');

const BLOG_CONTENT_STYLES = `
  .blog-content {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .blog-content table {
    width: 100% !important;
    border-collapse: collapse !important;
    margin: 1.5rem 0 !important;
    font-size: 0.95rem !important;
    background-color: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
  }
  .blog-content th {
    background-color: #f8fafc !important;
    color: #1e293b !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    font-size: 0.75rem !important;
    padding: 12px 15px !important;
    border: 1px solid #e2e8f0 !important;
  }
  .blog-content td {
    padding: 12px 15px !important;
    border: 1px solid #e2e8f0 !important;
    color: #475569 !important;
  }
  .blog-content tr:nth-child(even) { background-color: #f1f5f9 !important; }
  .blog-content tr:hover { background-color: #f8fafc !important; }
  .blog-content .table-wrapper {
    width: 100%;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  .blog-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin: 1rem 0 !important; }
  .blog-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin: 1rem 0 !important; }
  .blog-content li { margin-bottom: 0.5rem !important; line-height: 1.7 !important; }
  .blog-content p { margin: 1rem 0; line-height: 1.8; color: #334155; }
  .blog-content a {
  color: #2563EB !important; /* Tailwind blue-600 */
  text-decoration: underline !important;
  font-weight: 500;
  word-break: break-word;
  transition: color 0.2s ease;
}

.blog-content a:hover {
  color: #1D4ED8 !important; /* blue-700 */
  text-decoration-thickness: 2px;
}
  .blog-content h1, .blog-content h2, .blog-content h3 { color: #0f172a; margin-top: 2rem; font-weight: 800; }
  .blog-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 1.5rem auto; display: block; }
`;

function wrapTables(el) {
  if (!el) return;
  el.querySelectorAll('table').forEach((table) => {
    if (table.closest('.table-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

/* CommentSection remains exactly the same */
const CommentSection = ({ blogId }) => {
  // ... (your existing CommentSection code - no change)
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!blogId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchApprovedComments(blogId);
        setComments(res.data?.comments || []);
      } catch { } finally { setLoading(false); }
    })();
  }, [blogId]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Comment is required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await submitComment(blogId, form);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setErrors({});
      setFormOpen(false);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to post comment' });
    } finally { setSubmitting(false); }
  };

  const onChange = (ev) => {
    const { name, value } = ev.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      {/* ... rest of your CommentSection JSX (unchanged) ... */}
      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-3">
          <FaCheck className="shrink-0" />
          <span>Comment submitted! It will appear after review.</span>
          <button onClick={() => setSubmitted(false)} className="ml-auto text-green-500">×</button>
        </div>
      )}

      {!formOpen ? (
        <div onClick={() => setFormOpen(true)}
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 cursor-pointer hover:bg-white hover:shadow-sm transition-all mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              <FaUser className="text-sm" />
            </div>
            <span className="text-gray-400 text-sm">Write a comment...</span>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          {/* form code unchanged */}
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-base font-semibold text-gray-900">Add a Comment</h4>
            <button onClick={() => setFormOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* ... full form JSX unchanged ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input type="text" name="name" value={form.name} onChange={onChange}
                  placeholder="Name" autoFocus
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:ring-2 focus:ring-[#292B97]/20 focus:border-[#292B97] outline-none text-sm ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" name="email" value={form.email} onChange={onChange}
                  placeholder="Email"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:ring-2 focus:ring-[#292B97]/20 focus:border-[#292B97] outline-none text-sm ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <textarea name="message" value={form.message} onChange={onChange} rows={4}
                placeholder="Share your thoughts..."
                className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:ring-2 focus:ring-[#292B97]/20 focus:border-[#292B97] outline-none resize-y text-sm ${errors.message ? 'border-red-400' : 'border-gray-200'}`} />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>
            {errors.submit && <p className="text-xs text-red-600">{errors.submit}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setFormOpen(false)}
                className="px-5 py-2 text-sm text-gray-500">Cancel</button>
              <button type="submit" disabled={submitting}
                className="px-6 py-2 bg-[#292B97] text-white rounded-xl hover:bg-[#1e237e] disabled:opacity-50 flex items-center gap-2 text-sm font-medium">
                {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {submitting ? 'Posting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {comments.length > 0 && (
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Comments <span className="text-gray-400 font-normal">({comments.length})</span>
        </h3>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-7 w-7 border-[3px] border-[#292B97] border-t-transparent rounded-full" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-400 text-sm">No comments yet.</p>
          <button onClick={() => setFormOpen(true)} className="mt-3 text-[#292B97] text-sm font-medium">
            Be the first →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#292B97] to-[#4B6CB7] flex items-center justify-center text-white font-bold text-sm">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.updatedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pl-12">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* SidebarContent remains the same */
const SidebarContent = ({ relatedBlogs, allCategories, blogTags, navigate }) => (
  <div className="space-y-5">
    {/* Your existing SidebarContent JSX - no changes */}
    {relatedBlogs.length > 0 && (
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Related Articles</h3>
        <div className="space-y-4">
          {relatedBlogs.map((item) => {
            const thumb = getBlogBanner(item);
            return (
              <button key={item._id}
                onClick={() => navigate(`/blogs/${item.slug || toSlug(item.title)}`)}
                className="flex items-start gap-3 text-left w-full group">
                <div className="w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                  {thumb ? (
                    <img src={thumb} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">
                      {(item.title || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-700 group-hover:text-[#292B97] leading-snug line-clamp-3 transition-colors">
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    )}

    {allCategories.length > 0 && (
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Categories</h3>
        <div className="space-y-0.5">
          {allCategories.map((cat) => (
            <button key={cat}
              onClick={() => navigate('/blogs', { state: { activeTab: cat } })}
              className="flex items-center gap-2 text-gray-700 hover:text-[#292B97] text-sm capitalize w-full text-left py-1.5 px-2 rounded-lg hover:bg-white transition-all">
              <FaChevronRight className="text-[9px] text-gray-400 shrink-0" />
              {cat}
            </button>
          ))}
        </div>
      </div>
    )}

     {/* Tags section - sirf current blog ke tags */}
    {blogTags?.length > 0 && (
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
          Related Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {blogTags.map(tag => (
            <span
              key={tag}
              onClick={() => navigate('/blogs', { state: { selectedTag: tag } })}
              className="px-2.5 py-1 bg-white border border-gray-200 text-xs text-gray-600 rounded-full hover:border-[#292B97] hover:text-[#292B97] cursor-pointer transition">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

/* Main BlogDetailPage */
const BlogDetailPage = () => {
  const { title: slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

  const contentDivRef = useRef(null);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

    useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        let currentBlog = null;
        try {
          const res = await getBlogBySlug(slug);
          currentBlog = res.data?.blog || res.data?.data?.blog || null;
        } catch {}

        const allRes = await getBlogs();
        const allBlogs = allRes.data?.blogs || allRes.data?.data?.blogs || [];
        const published = allBlogs.filter(b => b.status?.toLowerCase() === 'published');

        if (!currentBlog) {
          currentBlog = published.find(b => b.slug === slug || toSlug(b.title) === slug) || null;
        }

        if (!currentBlog) {
          setError('not_found');
          return;
        }

        setBlog(currentBlog);
        setRelatedBlogs(
          published
            .filter(b => b.category === currentBlog.category && b._id !== currentBlog._id)
            .slice(0, 5)
        );
        setAllCategories([...new Set(published.map(b => b.category).filter(Boolean))]);

        const freq = {};
        published.forEach(b =>
          (b.tags || []).forEach(t => { if (t) freq[t] = (freq[t] || 0) + 1; })
        );
        setAllTags(
          Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([t]) => t).slice(0, 12)
        );
      } catch (err) {
        console.error(err);
        setError('failed');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      load();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug]);

  useEffect(() => {
    if (blog && contentDivRef.current) wrapTables(contentDivRef.current);
  }, [blog]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#292B97] border-t-transparent rounded-full mx-auto" />
        <p className="mt-6 text-gray-500 text-sm">Loading article...</p>
      </div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Article Not Found</h1>
         {/* Breadcrumb - replaces the back button */}
          <Breadcrumb blog={blog} navigate={navigate} />
      </div>
    </div>
  );

  const authorObj = typeof blog.author === 'object' ? blog.author : null;
  const authorName = authorObj?.name || (typeof blog.author === 'string' ? blog.author : 'Admin');
  const authorImgUrl = getAuthorAvatar(authorObj);
  const bannerUrl = getBlogBanner(blog);

  const socialLinks = [
    { icon: FaFacebookF, color: '#1877F2', label: 'Facebook', href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { icon: FaTwitter, color: '#1DA1F2', label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}` },
    { icon: FaLinkedinIn, color: '#0A66C2', label: 'LinkedIn', href: `https://linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}` },
    { icon: FaWhatsapp, color: '#25D366', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <>
   <SEO
  title={blog?.seo?.metaTitle || blog?.title}
  description={blog?.seo?.metaDescription || blog?.description}
  keywords={blog?.seo?.metaKeywords || []}
  canonicalUrl={blog?.seo?.canonicalUrl}
  ogImage={blog?.seo?.Image?.src || bannerUrl}
  noIndex={!blog?.seo?.index}
  noFollow={!blog?.seo?.follow}
  schema={blog?.seo?.jsonSchema}
/>
       <div className="min-h-screen bg-white">
      <style>{BLOG_CONTENT_STYLES}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb blog={blog} navigate={navigate} />

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 ">
          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            {/* Your existing main content (banner, title, author, description, tags, content, share, comments) - unchanged */}
            {bannerUrl && (
              <div className="w-full mb-6">
                <img src={bannerUrl} alt={blog.title}
                  className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-2xl shadow-sm"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-5">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3 flex-wrap mb-6 pb-5 border-b border-gray-100">
              {/* author row unchanged */}
              <button
                onClick={() => {
                  if (authorName && authorName !== 'Admin')
                    navigate(`/blogs/author/${toAuthorSlug(authorName)}`);
                }}
                className={`flex items-center gap-3 group ${authorName !== 'Admin' ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {authorImgUrl ? (
                  <img src={authorImgUrl} alt={authorName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 group-hover:border-[#292B97] transition-colors"
                    onError={(e) => { e.target.src = fallbackAvatar; }} />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#292B97] to-[#4B6CB7] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {(authorName || 'A').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#292B97] transition-colors leading-none">
                    {authorName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(blog.updatedAt || blog.createdAt || blog.date)}
                  </p>
                </div>
              </button>

              {blog.readTime && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500 ml-1">
                  <FaClock className="text-gray-400 text-[11px]" />
                  {blog.readTime} min read
                </span>
              )}

              {blog.category && (
                <span className="ml-auto px-3 py-1 bg-[#292B97]/10 text-[#292B97] text-xs font-semibold rounded-full capitalize">
                  {blog.category}
                </span>
              )}
            </div>

           

            <div
              ref={contentDivRef}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content available.</p>' }}
            />

                <AuthorBioCard
              authorName={authorName}
              authorImgUrl={authorImgUrl}
              authorObj={authorObj}
              onAuthorClick={() => {
                if (authorName && authorName !== 'Admin')
                  navigate(`/blogs/author/${toAuthorSlug(authorName)}`);
              }}
            />

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                Share this article
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, color, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform text-sm"
                    style={{ backgroundColor: color }} title={label}>
                    <Icon />
                  </a>
                ))}
                <button onClick={handleCopy}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm transition-all ${copied ? 'bg-green-500' : 'bg-gray-500 hover:bg-gray-600'}`}
                  title="Copy link">
                  {copied ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
            </div>

            <CommentSection blogId={blog._id} />

            {/* Mobile Sidebar */}
            <div className="lg:hidden mt-10 space-y-5">
              <SidebarContent relatedBlogs={relatedBlogs} allCategories={allCategories}
               blogTags={blog?.tags || []} 
                allTags={allTags} navigate={navigate} />
            </div>
          </main>

          {/* STICKY SIDEBAR - FIXED */}
 <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-24 h-fit">
  <div>
    <SidebarContent 
      relatedBlogs={relatedBlogs} 
      allCategories={allCategories}
       blogTags={blog?.tags || []}
      navigate={navigate} 
    />
  </div>
</aside>
        </div>
      </div>
    </div>
    </>
 
  );
};

export default BlogDetailPage;