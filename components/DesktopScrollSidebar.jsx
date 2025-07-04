'use client';

import { useState, useEffect } from 'react';
import { TbSearch, TbCategory, TbX } from 'react-icons/tb';

const DesktopScrollSidebar = ({ categories, selectedCategory, onCategorySelect, searchTerm, onSearchChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show sidebar when user scrolls down past 200px
      if (currentScrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Reset expanded search when sidebar is hidden
        setIsSearchExpanded(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Only render on desktop devices
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  if (!isDesktop || !isVisible) return null;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transform transition-transform duration-300 ease-in-out">
      <div className="bg-white dark:bg-gray-800 rounded-l-lg shadow-lg border-l border-t border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Search Button/Input */}
        <div className="relative">
          {isSearchExpanded ? (
            <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-900">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-48 pl-8 pr-2 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
              />
              <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ffaa]" />
              <button 
                onClick={toggleSearchExpand}
                className="ml-1 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <TbX />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleSearchExpand}
              className="flex items-center justify-center w-10 h-10 text-[#00ffaa] hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TbSearch className="text-xl" />
            </button>
          )}
        </div>
        
        {/* Category List */}
        <div className="max-h-64 overflow-y-auto p-2 bg-white dark:bg-gray-800">
          <div className="font-medium text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 px-2">
            <TbCategory className="inline mr-1" />
            Categories
          </div>
          
          <div className="flex flex-col space-y-1">
            {/* All Categories option */}
            <button
              onClick={() => onCategorySelect('')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 text-left ${selectedCategory === '' 
                ? 'bg-[#00ffaa] text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Categories
            </button>
            
            {/* Individual categories */}
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => onCategorySelect(category.name)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 text-left ${selectedCategory === category.name 
                  ? 'bg-[#00ffaa] text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-70">({category.count || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopScrollSidebar;
