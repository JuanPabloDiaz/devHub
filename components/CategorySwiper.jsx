'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import { TbCategory } from 'react-icons/tb'

// Import Swiper styles
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
    <div className="w-full py-4">
      {/* <div className="flex items-center justify-center mb-4">
        <TbCategory className="text-green-500 text-xl mr-2" />
        <h3 className="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">
          Browse Categories
        </h3>
      </div> */}

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, FreeMode]}
        spaceBetween={12}
        slidesPerView="auto"
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3000}
        loop={true}
        className="category-swiper"
        onMouseEnter={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop()
          }
        }}
        onMouseLeave={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start()
          }
        }}
      >
        {/* Add "All Categories" option */}
        <SwiperSlide className="!w-auto">
          <button
            onClick={() => handleCategoryClick('')}
            className={`px-4 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300 whitespace-nowrap border-2 ${
              selectedCategory === ''
                ? 'bg-green-500 text-white border-green-500 shadow-lg transform scale-105'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500 hover:text-green-500 hover:scale-105'
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
              className={`px-4 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300 whitespace-nowrap border-2 ${
                selectedCategory === category.name
                  ? 'bg-green-500 text-white border-green-500 shadow-lg transform scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500 hover:text-green-500 hover:scale-105'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">
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
              className={`px-4 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300 whitespace-nowrap border-2 ${
                selectedCategory === category.name
                  ? 'bg-green-500 text-white border-green-500 shadow-lg transform scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500 hover:text-green-500 hover:scale-105'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">
                ({category.count || 0})
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
