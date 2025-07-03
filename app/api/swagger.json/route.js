import { NextResponse } from 'next/server';
import swaggerSpec from '@/lib/swagger';

export async function GET() {
  const response = NextResponse.json(swaggerSpec);
  
  // Add cache control headers to prevent caching
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}
