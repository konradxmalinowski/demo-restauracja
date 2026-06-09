import { lazy } from 'react'

// Lazy-loaded pages for route-based code splitting (REQ-31)
export const LazyHome = lazy(() => import('../pages/Home'))
export const LazyMenu = lazy(() => import('../pages/Menu'))
export const LazyReservations = lazy(() => import('../pages/Reservations'))
export const LazyEvents = lazy(() => import('../pages/Events'))
export const LazyGallery = lazy(() => import('../pages/Gallery'))
export const LazyAbout = lazy(() => import('../pages/About'))
export const LazyContact = lazy(() => import('../pages/Contact'))
export const LazyDemoResult = lazy(() => import('../pages/DemoResult'))
export const LazyNotFound = lazy(() => import('../pages/NotFound'))
