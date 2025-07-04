'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, DesktopScrollSidebar } from '@/components';
import {
  TbSearch,
  TbRefresh,
  TbInfoCircle,
  TbCategory,
  TbTerminal2,
  TbCode,
} from 'react-icons/tb';

// Componente interno que usa useSearchParams
function HomeContent() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get('category') || '';

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
        const timestamp = Date.now();

        // Fetch resources
        const resourcesResponse = await fetch(`/api/resources?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        });

        if (!resourcesResponse.ok) {
          throw new Error(
            `Resources API request failed with status ${resourcesResponse.status}`,
          );
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
        );

        if (!categoriesResponse.ok) {
          throw new Error(
            `Categories API request failed with status ${categoriesResponse.status}`,
          );
        }

        const resourcesData = await resourcesResponse.json();
        const categoriesData = await categoriesResponse.json();

        console.log('Fetched resources:', resourcesData);
        console.log('Fetched categories:', categoriesData);

        setResources(resourcesData.resources || []);
        setCategories(categoriesData.categories || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle category change
  const handleCategoryChange = categoryName => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryName && categoryName !== '') {
      params.set('category', categoryName);
    } else {
      params.delete('category');
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl);
  };

  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      resource.name.toLowerCase().includes(searchLower) ||
      (resource.description &&
        resource.description.toLowerCase().includes(searchLower)) ||
      (resource.keywords &&
        Array.isArray(resource.keywords) &&
        resource.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)));

    const matchesCategory =
      selectedCategory === '' ||
      (resource.categories && Array.isArray(resource.categories) && 
       resource.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

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
    );
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
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center gap-2"
            >
              <TbRefresh className="text-lg" /> Retry
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <main className="flex-grow">
      {/* Desktop Sidebar */}
      <DesktopScrollSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <Container size="lg" className="py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Developer Resources Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            A curated collection of 1000+ high-quality resources for developers,
            from tools and libraries to learning materials and career resources.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-grow max-w-xl w-full">
            <input
              type="text"
              placeholder="Search resources by name, description or keywords..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setSearchTerm('')}
              style={{ opacity: searchTerm ? 1 : 0 }}
            >
              ×
            </button>
          </div>

          {/* Filter Stats */}
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span className="font-medium">{filteredResources.length}</span> of
            <span className="font-medium">{resources.length}</span> resources
            {selectedCategory && (
              <span className="ml-1">
                in <span className="font-medium">{selectedCategory}</span>
              </span>
            )}
          </div>
        </div>

        {/* Results Section */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col h-full"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">
                      {resource.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <TbCategory className="mr-1" />
                      <span>
                        {resource.categories && resource.categories.length > 0
                          ? resource.categories.join(', ')
                          : 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                  {resource.isPaid && (
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 text-xs px-2 py-1 rounded">
                      Paid
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {resource.description}
                  </p>

                  {/* Tags */}
                  {resource.keywords && resource.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.keywords.map(keyword => (
                        <span
                          key={keyword}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    {resource.type === 'tool' && <TbTerminal2 className="mr-1" />}
                    {resource.type === 'library' && <TbCode className="mr-1" />}
                    {resource.type === 'resource' && (
                      <TbInfoCircle className="mr-1" />
                    )}
                    <span className="capitalize">{resource.type || 'Resource'}</span>
                  </div>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    Visit
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">
              No resources found matching your criteria
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search term or selecting a different category
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Container>
    </main>
  );
}
