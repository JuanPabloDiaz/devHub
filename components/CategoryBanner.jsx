'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

export default function CategoryBanner() {
  const [categories, setCategories] = useState([])
  const [resources, setResources] = useState([])
  const swiperRef = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''

  useEffect(() => {
    // Fetch categories and resources
    async function fetchData() {
      try {
        const timestamp = Date.now()

        // Fetch resources and categories
        const [resourcesResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/resources?t=${timestamp}`, { cache: 'no-store' }),
          fetch(`/api/categories?t=${timestamp}`, { cache: 'no-store' }),
        ])

        if (resourcesResponse.ok && categoriesResponse.ok) {
          const resourcesData = await resourcesResponse.json()
          const categoriesData = await categoriesResponse.json()

          const resourcesList = resourcesData.resources || []
          const categoriesList = categoriesData.categories || []

          // Calculate category counts
          const categoriesWithCount = categoriesList.map(category => {
            const count = resourcesList.filter(
              resource =>
                resource.categories &&
                resource.categories.includes(category.name),
            ).length
            return { ...category, count }
          })

          setResources(resourcesList)
          setCategories(categoriesWithCount)
        }
      } catch (error) {
        console.error('Error fetching banner data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Auto-start the swiper when component mounts
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start()
    }
  }, [categories])

  const handleCategoryClick = categoryName => {
    // Update URL with category parameter
    const params = new URLSearchParams(searchParams.toString())
    if (categoryName && categoryName !== '') {
      params.set('category', categoryName)
    } else {
      params.delete('category')
    }

    // Navigate to the home page with the new parameters
    const newUrl = params.toString() ? `/?${params.toString()}` : '/'
    router.push(newUrl)
  }

  if (categories.length === 0) {
    return null // Don't render anything if no categories
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
          pauseOnMouseEnter: true,
        }}
        speed={5000}
        loop={true}
        className="category-banner-swiper"
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
            className={`px-3 py-1 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer ${
              selectedCategory === ''
                ? 'bg-green-500 text-white'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
            }`}
          >
            All Categories
          </button>
        </SwiperSlide>

        {/* Render all categories multiple times for seamless loop */}
        {[...Array(3)].map((_, index) =>
          categories.map(category => (
            <SwiperSlide key={`${category.slug}-${index}`} className="!w-auto">
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer ${
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
          )),
        )}
      </Swiper>
    </div>
  )
}
