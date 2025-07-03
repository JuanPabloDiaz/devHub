'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components'
import { TbChevronLeft, TbExternalLink, TbCategory } from 'react-icons/tb'

export default function ResourcePage({ params }) {
  const { slug } = params
  const [resource, setResource] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch resource details from the API
    async function fetchResourceDetails() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(`/api/resources/${slug}?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched resource details:', data)
        setResource(data.resource)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching resource details:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchResourceDetails()
  }, [slug])

  if (loading) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-[#00ffaa] border-t-transparent rounded-full animate-spin mb-6 shadow-lg shadow-[#00ffaa]/20"></div>
          <h1 className="text-2xl font-bold font-mono flex items-center gap-2">
            <span className="text-[#00ffaa]">Loading</span> Resource<span className="animate-blink">_</span>
          </h1>
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
          <div className="bg-[#ff4082]/10 border border-[#ff4082]/30 p-8 rounded-lg mb-6 max-w-md backdrop-blur-sm">
            <div className="text-[#ff4082] mb-4 text-4xl">!</div>
            <h1 className="text-2xl font-mono font-bold mb-4 text-[#ff4082]">
              Error_Loading<span className="animate-blink">_</span>
            </h1>
            <p className="font-mono mb-6 text-gray-700 dark:text-gray-300">
              <code className="bg-[#ff4082]/5 p-2 rounded border border-[#ff4082]/20">{error}</code>
            </p>
            <Link href="/" className="font-mono inline-flex items-center justify-center px-4 py-2 rounded border border-[#ff4082]/50 text-[#ff4082] hover:bg-[#ff4082]/10 transition-colors">
              <TbChevronLeft className="mr-2" />
              Return_to_MainFrame
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  if (!resource) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="bg-[#5a00ff]/10 border border-[#5a00ff]/30 p-8 rounded-lg mb-6 max-w-md backdrop-blur-sm">
            <div className="text-[#5a00ff] mb-4 text-4xl">404</div>
            <h1 className="text-2xl font-mono font-bold mb-4 text-[#5a00ff]">
              Resource_Not_Found<span className="animate-blink">_</span>
            </h1>
            <p className="font-mono mb-6 text-gray-700 dark:text-gray-300">
              The requested resource could not be located in the database.
            </p>
            <Link href="/" className="font-mono inline-flex items-center justify-center px-4 py-2 rounded border border-[#5a00ff]/50 text-[#5a00ff] hover:bg-[#5a00ff]/10 transition-colors">
              <TbChevronLeft className="mr-2" />
              Return_to_MainFrame
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <main>
      <Container size="lg" className="py-12">
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-[#00ffaa] dark:text-gray-300 dark:hover:text-[#00ffaa] mb-6 transition-colors font-mono"
        >
          <TbChevronLeft className="mr-1" /> Back to resources
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-[#00ffaa]/30 dark:hover:border-[#00ffaa]/30 transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ffaa]/10 to-transparent dark:from-[#00ffaa]/5 dark:to-transparent border-b border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-3xl font-bold mb-2 font-mono">{resource.name}<span className="text-[#00ffaa] animate-blink">_</span></h1>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-mono font-semibold mb-2 flex items-center">
                <span className="text-[#00ffaa] mr-2">{">"}</span> Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {resource.description || 'No description available.'}
              </p>
            </div>

            {resource.categories && resource.categories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-mono font-semibold mb-2 flex items-center">
                  <span className="text-[#5a00ff] mr-2">{">"}</span> Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resource.categories.map(category => (
                    <span
                      key={category}
                      className="bg-[#5a00ff]/10 text-[#5a00ff] dark:text-[#5a00ff] px-3 py-1 rounded-md font-mono border border-[#5a00ff]/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resource.keywords && resource.keywords.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-mono font-semibold mb-2 flex items-center">
                  <span className="text-[#ff4082] mr-2">{">"}</span> Keywords
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resource.keywords.map(
                    (keyword, index) =>
                      keyword && (
                        <span
                          key={index}
                          className="bg-[#ff4082]/10 text-[#ff4082] dark:text-[#ff4082] px-3 py-1 rounded-md text-sm font-mono border border-[#ff4082]/20"
                        >
                          {keyword}
                        </span>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer - Call to action */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 flex justify-center">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn font-mono flex items-center justify-center gap-2 text-lg mt-6 bg-[#00ffaa] hover:bg-[#00d791] text-gray-900 px-8 py-3 rounded-md font-semibold transition-all shadow-lg shadow-[#00ffaa]/10"
            >
              Visit Resource <TbExternalLink />
            </a>
          </div>
        </div>
      </Container>
    </main>
  )
}
