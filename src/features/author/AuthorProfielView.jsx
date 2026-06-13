import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toast";
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGlobe,
  FaArrowLeft, FaChevronRight, FaHome,
} from "react-icons/fa";

import { VITE_BACKEND_URL } from "../../../config.js";

const Breadcrumb = ({ author, navigate }) => {
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

        <li className="flex items-center">
          <FaChevronRight className="text-gray-400 text-[10px] mx-1" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">
            {author?.name || 'Author'}
          </span>
        </li>
      </ol>
    </nav>
  );
};

/* ── helpers ── */
const resolveImgUrl = (imgObj) => {
  if (!imgObj) return null;
  if (typeof imgObj === 'string') {
    if (!imgObj.trim()) return null;
    return imgObj.startsWith('http') ? imgObj : `${VITE_BACKEND_URL}/${imgObj.replace(/^\//, '')}`;
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

const toSlug = (t = '') =>
  t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

const toAuthorSlug = (name = '') =>
  name.toLowerCase().trim().replace(/\s+/g, '-');

const CATEGORY_COLORS = {
  cricket:   { bg: '#10b98115', text: '#10b981' },
  football:  { bg: '#3b82f615', text: '#3b82f6' },
  badminton: { bg: '#8b5cf615', text: '#8b5cf6' },
  tennis:    { bg: '#ec489915', text: '#ec4899' },
  formula1:  { bg: '#f59e0b15', text: '#f59e0b' },
};
const getCatStyle = (cat) =>
  CATEGORY_COLORS[cat?.toLowerCase()] || { bg: '#6b728015', text: '#6b7280' };

const SOCIAL_CONFIG = [
  { key: 'twitter',   icon: FaTwitter,    color: '#1DA1F2', label: 'Twitter' },
  { key: 'linkedin',  icon: FaLinkedinIn, color: '#0A66C2', label: 'LinkedIn' },
  { key: 'instagram', icon: FaInstagram,  color: '#E1306C', label: 'Instagram' },
  { key: 'facebook',  icon: FaFacebookF,  color: '#1877F2', label: 'Facebook' },
  { key: 'website',   icon: FaGlobe,      color: '#374151', label: 'Website' },
];

export default function AuthorProfileView() {
  const { authorName: authorSlug } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const [authorsRes, blogsRes] = await Promise.all([
          axios.get(`${VITE_BACKEND_URL}/authors`),
          axios.get(`${VITE_BACKEND_URL}/blogs`),
        ]);

        const allAuthors = authorsRes.data?.authors || [];
        const allBlogs = blogsRes.data?.blogs || [];

        const matchedAuthor = allAuthors.find(
          a => toAuthorSlug(a.name) === authorSlug
        );

        if (!matchedAuthor) {
          setNotFound(true);
          return;
        }

        setAuthor(matchedAuthor);

        const authorBlogs = allBlogs.filter(b => {
          const blogAuthorId =
            typeof b.author === 'object' ? b.author?._id : b.author;
          return blogAuthorId === matchedAuthor._id && b.status === 'published';
        });

        setBlogs(authorBlogs);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load author');
      } finally {
        setLoading(false);
      }
    };

    if (authorSlug) fetchData();
  }, [authorSlug]);

  /* ── LOADER ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0f1e] flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            Loading author...
          </p>
        </div>
      </div>
    );
  }

  /* ── NOT FOUND ── */
  if (notFound || !author) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0f1e] flex items-center justify-center px-4 transition-colors">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Author Not Found
          </h1>
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const avatarUrl = resolveImgUrl(author.image);
  const initials = author.name?.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'A';
  const activeSocials = SOCIAL_CONFIG.filter(s => author.socialLinks?.[s.key]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0a0f1e] transition-colors">

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14">

          <Breadcrumb author={author} navigate={navigate} />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-4">

            {/* Avatar */}
            <div className="shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={author.name}
                  className="w-20 h-20 md:w-20 md:h-20 rounded-full object-cover border-2 border-indigo-500/30 shadow-xl"
                />
              ) : (
                <div className="w-20 h-20 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-3xl font-semibold shadow-xl select-none">
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">

              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-1">
                {author.name}
              </h1>

              {author.designation && (
                <p className="text-indigo-500 dark:text-indigo-400 font-semibold text-sm mb-2">
                  {author.designation}
                </p>
              )}

              {author.bio && (
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-5xl mb-5">
                  {author.bio}
                </p>
              )}

              {/* Social */}
              {activeSocials.length > 0 && (
                <div className="flex gap-2 justify-center md:justify-start">
                  {activeSocials.map(({ key, icon: Icon, color }) => (
                    <a
                      key={key}
                      href={author.socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:scale-110 transition"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="text-sm" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Latest Articles
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({blogs.length})
            </span>
          </h2>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No published articles yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              const bannerSrc = getBlogBanner(blog);
              const catStyle = getCatStyle(blog.category);

              return (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog.slug || toSlug(blog.title)}`)}
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-white/5">
                    {bannerSrc ? (
                      <img
                        src={bannerSrc}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-white/20 text-4xl font-bold">
                        {(blog.title || '?').charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Category */}
                    {blog.category && (
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: catStyle.bg, color: catStyle.text }}
                      >
                        {blog.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col h-[160px]">

                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(
                        blog.publishedDate || blog.updatedAt || blog.createdAt
                      ).toLocaleDateString()}
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-500 transition mb-2">
                      {blog.title}
                    </h3>

                    {blog.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {blog.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-indigo-500 text-xs font-semibold flex items-center gap-1">
                        Read <FaChevronRight className="text-[10px]" />
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}