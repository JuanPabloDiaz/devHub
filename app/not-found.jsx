'use client';

import { Suspense } from 'react'
import { Container } from '@/components'
import dynamic from 'next/dynamic'

// Importar dinámicamente el componente cliente para evitar problemas con useSearchParams
const NotFoundClient = dynamic(() => import('./components/NotFound.client'))

export default function NotFound() {
  return (
    <Suspense fallback={
      <Container className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </Container>
    }>
      <NotFoundClient />
    </Suspense>
  )
}
