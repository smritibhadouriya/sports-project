import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SportTabsList from './SportsTabList'
import { appConfig } from '@/config/app.config'

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sports = [
    { label: 'All', path: '/', emoji: null },
    { label: 'Cricket', path: '/cricket', emoji: '🏏' },
    { label: 'Football', path: '/football', emoji: '⚽' },
    { label: 'Badminton', path: '/badminton', emoji: '🏸' },
    { label: 'Tennis', path: '/tennis', emoji: '🎾' },
    { label: 'Formula 1', path: '/f1', emoji: '🏎️' },
  ];

  // Optional: determine active tab based on current URL
  const currentPath = location.pathname;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-4">
     <SportTabsList
  sports={appConfig.sports}
  scrollable
  textSize="text-sm"
  activeClass="bg-[#00698c] text-white"
  inactiveClass="text-white/80 hover:bg-white/10 hover:text-white"
/>
    </div>
  );
};

export default Category;