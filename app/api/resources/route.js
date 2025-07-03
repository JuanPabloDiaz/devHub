/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all developer resources
 *     description: Retrieves a list of all developer resources with their details
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of resources retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resources:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       url:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                       keywords:
 *                         type: array
 *                         items:
 *                           type: string
 *                 count:
 *                   type: integer
 */

import resourcesData from '@/data/db/resources.json'
import { NextResponse } from 'next/server'

export async function GET() {
  // Transform resources data to include slugs and any necessary transformations
  const transformedResources = resourcesData.data.map(resource => {
    // Create a slug from the name
    const slug = resource.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')

    return {
      id: resource.name, // Use name as ID since there's no explicit ID
      name: resource.name,
      slug: slug,
      description: resource.description,
      url: resource.url,
      categories: resource.categories || [],
      keywords: resource.keywords || [],
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({
    resources: transformedResources,
    count: resourcesData.count,
  })

  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}
