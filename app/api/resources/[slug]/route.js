/**
 * @swagger
 * /resources/{slug}:
 *   get:
 *     summary: Get a specific resource by slug
 *     description: Retrieves details for a specific developer resource identified by its slug
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the resource to retrieve
 *     responses:
 *       200:
 *         description: Resource retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resource:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     url:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     keywords:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

import resourcesData from '@/data/db/resources.json'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { slug } = params

  // Find the resource by slug in our data
  const resource = resourcesData.data.find(resource => {
    const resourceSlug = resource.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    return resourceSlug === slug
  })

  if (!resource) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
  }

  // Create a consistent slug for the resource
  const resourceSlug = resource.name
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')

  const transformedResource = {
    id: resource.name,
    name: resource.name,
    slug: resourceSlug,
    description: resource.description,
    url: resource.url,
    categories: resource.categories || [],
    keywords: resource.keywords || [],
  }

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ resource: transformedResource })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}
