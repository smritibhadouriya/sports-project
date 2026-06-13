import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { photos } from '../../../shared/constants/Vedio.data';

// ─── Slug helper ──────────────────────────────────────────────────────────────
const toSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// ─── Gallery View (Detail) ─────────────────────────────────────────────────────
const GalleryView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = photos.find((p) => toSlug(p.cardTitle) === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        {/* Breadcrumb even when gallery not found */}
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
          <Link to="/photogallary" className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors">
            Photo Galleries
          </Link>
          <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Gallery not found</span>
        </nav>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Gallery not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to galleries
        </button>
      </div>
    );
  }

  const images = item.images;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb Navigation */}
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
        <Link to="/photogallary" className="text-gray-400 hover:text-[#00698c] dark:text-gray-500 dark:hover:text-[#00698c] transition-colors">
          Photo Galleries
        </Link>
        <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300 line-clamp-1 max-w-xs">{item.cardTitle}</span>
      </nav>

      {/* Vertically stacked images with captions */}
      <div className="flex flex-col gap-0">
        {images.map((img, idx) => (
          <div key={idx} className="flex flex-col">
            <img
              src={img.url}
              alt={img.title}
              className="w-full object-cover"
              style={{ maxHeight: '320px', objectPosition: 'center' }}
            />
            {img.title && (
              <p className="text-xs text-gray-600 dark:text-gray-400 py-2 px-1 border-b border-gray-100 dark:border-gray-800 leading-snug">
                {img.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Grid / Landing View ──────────────────────────────────────────────────────
const Allphoto = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {/* Breadcrumb for listing page */}
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
        <span className="text-gray-700 dark:text-gray-300">Photo Galleries</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Photo Galleries</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {photos.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/photogallary/${toSlug(item.cardTitle)}`)}
            className="cursor-pointer flex flex-col border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            style={{ borderRight: (idx + 1) % 3 === 0 ? 'none' : undefined }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#e5e7eb' }}>
              <img
                src={item.images[0].url}
                alt={item.cardTitle}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3 bg-[#2d2d2d] dark:bg-gray-900">
              <p className="text-white dark:text-gray-200 font-semibold text-sm leading-snug mb-1">{item.cardTitle}</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { GalleryView };
export default Allphoto;