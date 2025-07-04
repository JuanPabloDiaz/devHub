'use client';

import { useState, useEffect } from 'react';
import { TbSearch, TbCategory, TbChevronLeft, TbChevronRight } from 'react-icons/tb';

const LeftSidebar = ({ categories, selectedCategory, onCategorySelect, searchTerm, onSearchChange }) => {
  // Initialize collapsed state from localStorage if available, default to false (expanded)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Toggle sidebar collapse state and save to localStorage
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
  };

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className={`fixed left-0 top-0 h-full z-40 pt-16 transition-all duration-300 ease-in-out ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <div className="h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <TbChevronRight className="text-[#00ffaa] text-lg" />
          ) : (
            <TbChevronLeft className="text-[#00ffaa] text-lg" />
          )}
        </button>

        {/* Search */}
        <div className={`p-3 ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-8 pr-2 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <TbSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[#00ffaa]" />
          </div>
        </div>

        {/* Search icon when collapsed */}
        {isCollapsed && (
          <div className="p-3 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="text-[#00ffaa] hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
              aria-label="Expand for search"
            >
              <TbSearch className="text-xl" />
            </button>
          </div>
        )}

        {/* Category List */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="p-3">
            <div className="font-medium text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 px-2 flex items-center">
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
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category icon when collapsed */}
        {isCollapsed && (
          <div className="p-3 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="text-[#5a00ff] hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
              aria-label="Expand for categories"
            >
              <TbCategory className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
