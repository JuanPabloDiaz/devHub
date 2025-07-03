'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import { TbCategory } from 'react-icons/tb'

import 'swiper/css'
import 'swiper/css/free-mode'

export default function CategorySwiper({
  categories,
  selectedCategory,
  onCategorySelect,
}) {
  const swiperRef = useRef(null)

  useEffect(() => {
    // Auto-start the swiper when component mounts
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start()
    }
  }, [])

  const handleCategoryClick = categoryName => {
    // If the same category is clicked, deselect it (show all)
    if (selectedCategory === categoryName) {
      onCategorySelect('')
    } else {
      onCategorySelect(categoryName)
    }
  }

  return (
    <div className="w-full py-3 bg-gray-50/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={5000}
        loop={true}
        className="category-banner-swiper"
      >
        {/* Add "All Categories" option */}
        <SwiperSlide className="!w-auto">
          <button
            onClick={() => handleCategoryClick('')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors duration-300 whitespace-nowrap ${
              selectedCategory === ''
                ? 'bg-green-500 text-white'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
            }`}
          >
            All Categories
          </button>
        </SwiperSlide>

        {/* Render category buttons */}
        {categories.map(category => (
          <SwiperSlide key={category.slug} className="!w-auto">
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors duration-300 whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-green-500 text-white'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`}
            >
              {category.name}
              <span className="ml-1 text-xs opacity-70">
                ({category.count || 0})
              </span>
            </button>
          </SwiperSlide>
        ))}

        {/* Duplicate categories for seamless loop */}
        {categories.map(category => (
          <SwiperSlide key={`duplicate-${category.slug}`} className="!w-auto">
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors duration-300 whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-green-500 text-white'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`}
            >
              {category.name}
              <span className="ml-1 text-xs opacity-70">
                ({category.count || 0})
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
