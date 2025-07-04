'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Container, DesktopScrollSidebar } from '@/components'
import {
  TbSearch,
  TbRefresh,
  TbInfoCircle,
  TbCategory,
  TbTerminal2,
  TbCode,
} from 'react-icons/tb'

export default function HomePage() {
  const [resources, setResources] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCategory = searchParams.get('category') || ''

  // Use effect to react to URL parameter changes
  useEffect(() => {
    // When URL parameters change, update the local state to match
    const categoryFromUrl = searchParams.get('category') || '';
    console.log('URL category changed:', categoryFromUrl);
    
    // This will re-render the component and ensure filtering works correctly
    // No need to set any state here since selectedCategory is derived directly from searchParams
  }, [searchParams]);

  useEffect(() => {
    // Fetch resources and categories from the API
    async function fetchData() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()

        // Fetch resources
        const resourcesResponse = await fetch(`/api/resources?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        })

        if (!resourcesResponse.ok) {
          throw new Error(
            `Resources API request failed with status ${resourcesResponse.status}`,
          )
        }

        // Fetch categories
        const categoriesResponse = await fetch(
          `/api/categories?t=${timestamp}`,
          {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
            },
          },
        )

        if (!categoriesResponse.ok) {
          throw new Error(
            `Categories API request failed with status ${categoriesResponse.status}`,
          )
        }

        const resourcesData = await resourcesResponse.json()
        const categoriesData = await categoriesResponse.json()

        console.log('Fetched resources:', resourcesData)
        console.log('Fetched categories:', categoriesData)

        setResources(resourcesData.resources || [])
        setCategories(categoriesData.categories || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle category change
  const handleCategoryChange = categoryName => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryName && categoryName !== '') {
      params.set('category', categoryName)
    } else {
      params.delete('category')
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/'
    router.push(newUrl)
  }

  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      resource.name.toLowerCase().includes(searchLower) ||
      (resource.description &&
        resource.description.toLowerCase().includes(searchLower)) ||
      (resource.keywords &&
        Array.isArray(resource.keywords) &&
        resource.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)))

    const matchesCategory =
      selectedCategory === '' ||
      (resource.categories && Array.isArray(resource.categories) && 
       resource.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase()))

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-bold">Loading 1000+ Resources...</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please wait while we fetch the data
          </p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg mb-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
              Error Loading Resources
            </h1>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary inline-flex items-center"
            >
              <TbRefresh className="mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <main>
      {/* Hero section */}
      <div className="grid-pattern bg-gradient-to-b dark:from-gray-900/80 dark:via-gray-900/90 dark:to-gray-900 from-gray-50/80 via-gray-50/90 to-gray-50 py-16">
        <Container size="lg">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <TbTerminal2 className="text-[#00ffaa] text-5xl mr-2" />
            </div>
            <h1 className="text-5xl font-bold mb-4 font-mono tracking-tight">
              <span className="text-[#00ffaa]">Dev</span>
              <span>Hub</span>
              <span className="text-[#00ffaa] animate-blink">_</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Discover{' '}
              <span className="font-mono text-[#00ffaa] font-bold">
                {resources.length}
              </span>{' '}
              curated tools and resources for developers
            </p>

            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <TbSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#00ffaa] dark:text-[#00ffaa]" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-[#00ffaa] focus:border-[#00ffaa] font-mono text-sm backdrop-blur-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 transition-colors"
                  aria-label="Search"
                >
                  <TbSearch className="text-lg" />
                </button>
              </div>
              <div className="relative">
                <TbCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a00ff] dark:text-[#5a00ff]" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-[#00ffaa] focus:border-[#00ffaa] font-mono text-sm backdrop-blur-sm"
                  value={selectedCategory}
                  onChange={e => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.slug} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Countries grid */}
      <Container size="lg" className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-mono font-bold flex items-center">
            <TbCode className="text-[#00ffaa] mr-2" />
            All Resources
            <span className="text-sm font-normal ml-2 bg-[#00ffaa]/10 text-[#00ffaa] px-2 py-1 rounded-full font-mono">
              {filteredResources.length}
            </span>
          </h2>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No resources found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                handleCategoryChange('')
              }}
              className="btn btn-primary mt-4"
            >
              <TbRefresh className="mr-2" />
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="resource-card group transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                  <h3 className="font-mono text-lg font-bold truncate text-gray-900 dark:text-gray-100">
                    {resource.name}
                  </h3>
                  <div className="bg-[#00ffaa]/10 p-1 rounded-full">
                    <TbCode className="text-[#00ffaa] text-lg" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3 h-20 mb-3">
                    {resource.description || 'No description available'}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    {resource.categories &&
                      resource.categories.slice(0, 3).map(category => (
                        <span
                          key={category}
                          className="bg-[#00ffaa]/10 text-[#00ffaa] dark:text-[#00ffaa] px-2 py-1 rounded-md border border-[#00ffaa]/20 font-mono"
                        >
                          {category}
                        </span>
                      ))}
                    {resource.categories && resource.categories.length > 3 && (
                      <span className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md font-mono border border-gray-200 dark:border-gray-700">
                        +{resource.categories.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="flex items-center justify-center gap-2 text-center text-gray-900 dark:text-gray-100 hover:text-[#00ffaa] py-3 transition-colors flex-1 font-medium"
                  >
                    <TbInfoCircle />
                    Details
                  </Link>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-center text-gray-900 dark:text-gray-100 hover:text-[#00ffaa] py-3 transition-colors flex-1 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
      
      {/* Desktop Scroll Sidebar - appears only on desktop when scrolling */}
      <DesktopScrollSidebar 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </main>
  )
}
