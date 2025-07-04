'use client';

import { Suspense } from 'react'
import { Container } from '@/components'
import dynamic from 'next/dynamic'

// Importar dinámicamente el componente cliente para evitar problemas con useSearchParams
const HomePageClient = dynamic(() => import('./components/HomePage.client'), {
  loading: () => (
    <Container size="lg" className="py-12">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-bold">Loading Resources...</h1>
      </div>
    </Container>
  )
})

// Componente principal que se exporta
export default function HomePage() {
  return (
    <Suspense fallback={
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-bold">Loading Resources...</h1>
        </div>
      </Container>
    }>
      <HomePageClient />
    </Suspense>
  )
}
