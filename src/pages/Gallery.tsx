import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryItems } from '../data/gallery.data'
import type { GalleryCategory } from '../types/menu.types'
import { useScrollReveal } from '../hooks/useScrollReveal'

const CATEGORIES: Array<'Wszystkie' | GalleryCategory> = [
  'Wszystkie',
  'Jedzenie',
  'Wnętrze',
  'Wydarzenia',
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'Wszystkie' | GalleryCategory>('Wszystkie')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const headRef = useScrollReveal<HTMLDivElement>()

  const filtered =
    activeCategory === 'Wszystkie'
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  const prevImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }

  const nextImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <>
      <Helmet>
        <title>Galeria — Restauracja Złoty Talerz</title>
        <meta
          name="description"
          content="Galeria zdjęć restauracji Złoty Talerz — dania, wnętrze i wyjątkowe wydarzenia."
        />
      </Helmet>

      <div className="min-h-screen bg-[var(--color-parchment)] dark:bg-restauracja-dark pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <div ref={headRef} className="text-center mb-10">
            <p className="text-restauracja-burgundy/70 uppercase tracking-widest text-xs mb-3">Galeria</p>
            <h1 className="text-4xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment mb-4">
              Złoty Talerz w obiektywie
            </h1>
            <div className="w-16 border-t border-dotted border-restauracja-burgundy/40 mx-auto" />
          </div>

          {/* Category filter */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat
                    ? 'bg-restauracja-burgundy text-white border-restauracja-burgundy'
                    : 'border-restauracja-burgundy/30 text-restauracja-dark dark:text-restauracja-parchment hover:border-restauracja-burgundy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="popLayout">
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-restauracja-dark/0 group-hover:bg-restauracja-dark/40 transition-colors duration-300 rounded-xl flex items-end p-3">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                      {item.alt}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Zamknij"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Poprzednie"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl max-h-[80vh] flex flex-col items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl"
                />
                <p className="text-white/80 text-sm text-center">{filtered[lightboxIndex].alt}</p>
                <p className="text-white/40 text-xs">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Następne"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
