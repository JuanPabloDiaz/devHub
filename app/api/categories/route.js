/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all resource categories
 *     description: Retrieves a list of all resource categories available in the system
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                 count:
 *                   type: integer
 */

import categoriesData from '@/data/db/categories.json'
import resourcesData from '@/data/db/resources.json'
import { NextResponse } from 'next/server'

export async function GET() {
  // Create a map to store the count of resources for each category
  const categoryCounts = {}

  // Initialize counts to 0 for all categories
  for (const category of categoriesData.data) {
    categoryCounts[category.name] = 0
  }

  // Iterate over resources to count them by category
  for (const resource of resourcesData.data) {
    if (resource.categories && Array.isArray(resource.categories)) {
      for (const categoryName of resource.categories) {
        if (categoryCounts.hasOwnProperty(categoryName)) {
          categoryCounts[categoryName]++
        }
      }
    }
  }

  // Add the count to each category object
  const categoriesWithCounts = categoriesData.data.map(category => ({
    ...category,
    count: categoryCounts[category.name] || 0,
  }))

  // Add cache control headers to prevent caching
  const response = NextResponse.json({
    categories: categoriesWithCounts,
    count: categoriesData.count,
  })

  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}
