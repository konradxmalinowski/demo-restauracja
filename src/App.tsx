import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { DemoModal } from './components/demo/DemoModal'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { LoadingScreen } from './components/layout/LoadingScreen'
import {
  LazyHome,
  LazyMenu,
  LazyReservations,
  LazyEvents,
  LazyGallery,
  LazyAbout,
  LazyContact,
  LazyDemoResult,
  LazyNotFound,
} from './routes/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-restauracja-parchment dark:bg-restauracja-dark">
      <div className="w-8 h-8 border-2 border-restauracja-burgundy border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/demo-restauracja">
          <LoadingScreen />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<LazyHome />} />
                  <Route path="/menu" element={<LazyMenu />} />
                  <Route path="/reservations" element={<LazyReservations />} />
                  <Route path="/events" element={<LazyEvents />} />
                  <Route path="/gallery" element={<LazyGallery />} />
                  <Route path="/about" element={<LazyAbout />} />
                  <Route path="/contact" element={<LazyContact />} />
                  <Route path="/demo" element={<LazyDemoResult />} />
                  <Route path="*" element={<LazyNotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <DemoModal />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
