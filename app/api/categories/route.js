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
