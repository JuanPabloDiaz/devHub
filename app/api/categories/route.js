/**
 * Retrieves a list of resource categories from the categories.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the categories data.
 */

import categoriesData from '@/data/db/categories.json'
import { NextResponse } from 'next/server'

export async function GET() {
  // Add cache control headers to prevent caching
  const response = NextResponse.json({
    categories: categoriesData.data,
    count: categoriesData.count,
  })

  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}
