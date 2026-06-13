import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { videos } from '../../../shared/constants/Vedio.data';

// ─── Slug helper ──────────────────────────────────────────────────────────────
const toSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// ─── Video Detail View ────────────────────────────────────────────────────────
const VideoDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const itemIdx = videos.findIndex((v) => toSlug(v.title) === slug);
  const item = videos[itemIdx];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors"
          >
            Back
          </button>
          <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <Link to="/vediogallary" className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors">
            Videos
          </Link>
          <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Video not found</span>
        </nav>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Video not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to videos
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-5 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors"
        >
          Back
        </button>
        <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <Link to="/vediogallary" className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors">
          Videos
        </Link>
        <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300 line-clamp-1 max-w-xs">{item.title}</span>
      </nav>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Video Player + Details */}
        <div className="flex-1 min-w-0">
          <div className="w-full rounded-xl overflow-hidden bg-black dark:bg-black" style={{ aspectRatio: '16/9' }}>
            <iframe
              src={item.videoUrl}
              title={item.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-3 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">{item.title}</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500">{item.date}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        </div>

        {/* RIGHT: Suggested Videos Sidebar */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <h3
            className="text-xs font-extrabold tracking-widest uppercase mb-3 dark:text-[#1a7a3c]"
            style={{ color: '#1a7a3c' }}
          >
            Suggested Videos
          </h3>

          <div className="flex flex-col gap-3">
            {videos
              .filter((_, idx) => idx !== itemIdx)
              .slice(0, 3)
              .map((v) => (
                <div
                  key={v.title}
                  onClick={() => navigate(`/vediogallary/${toSlug(v.title)}`)}
                  className="cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: '16/9', background: '#111' }}
                  >
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/50 group-hover:bg-black/70 flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-1">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                    {v.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        {v.duration}
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-2 bg-white dark:bg-gray-800">
                    <p className="text-gray-900 dark:text-white text-xs font-semibold leading-snug line-clamp-2">
                      {v.title}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Grid / Landing View ──────────────────────────────────────────────────────
const AllVideo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-5 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors"
        >
          Back
        </button>
        <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300">Videos</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {videos.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/vediogallary/${toSlug(item.title)}`)}
            className="cursor-pointer flex flex-col group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            style={{
              borderRight: (idx + 1) % 3 !== 0 ? '1px solid #e5e7eb' : 'none',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '16/9', background: '#1a1a1a' }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#111" className="ml-1">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  {item.duration}
                </div>
              )}
            </div>

            <div className="p-3 bg-[#2d2d2d] dark:bg-gray-900 flex-1 flex flex-col justify-between">
              <p className="text-white dark:text-gray-200 font-semibold text-sm leading-snug line-clamp-2 mb-2">
                {item.title}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { VideoDetail };
export default AllVideo;