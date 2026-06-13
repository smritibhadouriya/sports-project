import React from 'react';
import { useNavigate, useLocation ,Link} from 'react-router-dom';
import SportTabsList from './SportsTabList'
import { appConfig } from '@/config/app.config'

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollable = false;
  const  activeClass = '' ;
  const inactiveClass = '';

    const isActive = (sport) => {
    if (sport.id === 'all' || sport.path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(sport.path)
  }

  const sports = [
    { label: 'All', path: '/', emoji: null },
    { label: 'Cricket', path: '/cricket'},
    { label: 'Football', path: '/football'},
    { label: 'Badminton', path: '/badminton' },
    { label: 'Tennis', path: '/tennis'},
    { label: 'Formula 1', path: '/f1'},
  ];

  // Optional: determine active tab based on current URL
  const currentPath = location.pathname;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-4">
     <div
      className={`flex items-center gap-2 ${
        scrollable
          ? 'overflow-x-auto scrollbar-hide py-2'
          : 'flex-wrap'
      }`}
    >
      {sports.map((sport) => {
        const active = isActive(sport)

        return (
          <Link
            key={sport.id || sport.label}
            to={sport.path || '/'}
            className={`
              flex-shrink-0 flex items-center gap-1.5
              px-4 py-1.5 rounded-full font-medium whitespace-nowrap transition-all
              text-md
              ${active ? activeClass : inactiveClass}
            `}
          >
            
            {sport.label}
          </Link>
        )
      })}
    </div>
    </div>
  );
};

export default Category;