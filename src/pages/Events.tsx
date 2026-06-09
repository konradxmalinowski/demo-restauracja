import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar, Users, Tag } from 'lucide-react'
import { events } from '../data/events.data'
import { useDemoModal } from '../hooks/useDemoModal'
import { useNavigate } from 'react-router-dom'

const ALL_CATEGORIES = ['Wszystkie', ...Array.from(new Set(events.map((e) => e.category)))]

export default function Events() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Wszystkie')
  const [selected, setSelected] = useState<string | null>(null)
  const { triggerDemo } = useDemoModal()
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (category !== 'Wszystkie' && e.category !== category) return false
      if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, category])

  const selectedEvent = events.find((e) => e.id === selected)

  const handleSignup = () => {
    triggerDemo()
    navigate('/demo')
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Helmet>
        <title>Wydarzenia — Restauracja Złoty Talerz</title>
        <meta name="description" content="Wieczory jazzowe, degustacje win, kolacje szefa kuchni — wyjątkowe wydarzenia w restauracji Złoty Talerz." />
      </Helmet>

      <div className="min-h-screen bg-[var(--color-parchment)] dark:bg-restauracja-dark pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold font-serif text-restauracja-burgundy mb-2">
              Nadchodzące Wydarzenia
            </h1>
            <p className="text-gray-500 dark:text-restauracja-cream/60">
              Wyjątkowe wieczory, degustacje i warsztaty kulinarne
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj wydarzenia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-restauracja-burgundy/20 rounded-lg bg-white dark:bg-restauracja-dark text-sm focus:outline-none focus:ring-2 focus:ring-restauracja-burgundy/30"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors border ${
                    category === cat
                      ? 'bg-restauracja-burgundy text-white border-restauracja-burgundy'
                      : 'border-restauracja-burgundy/30 text-restauracja-dark dark:text-restauracja-parchment hover:border-restauracja-burgundy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <motion.article
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-restauracja-dark/80 rounded-xl overflow-hidden border border-restauracja-burgundy/10 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelected(event.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-restauracja-burgundy text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Tag size={9} />
                      {event.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-restauracja-dark dark:text-restauracja-parchment text-lg mb-2 leading-snug">
                      {event.title}
                    </h3>
                    <div className="border-b border-dotted border-restauracja-burgundy/20 mb-3" />
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-restauracja-cream/50 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(event.date)}
                      </span>
                      {event.capacity && (
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {event.capacity} miejsc
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-restauracja-cream/60 line-clamp-2 mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {event.price && (
                        <span className="font-bold text-restauracja-burgundy text-sm">{event.price} zł / os.</span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSignup() }}
                        className="px-4 py-2 bg-restauracja-burgundy text-white text-xs font-medium rounded-full hover:bg-restauracja-wine transition-colors"
                      >
                        Zapisz się
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Event detail modal */}
      <AnimatePresence>
        {selected && selectedEvent && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 bg-[var(--color-parchment)] dark:bg-restauracja-dark rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-serif font-bold text-restauracja-burgundy mb-2">{selectedEvent.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={13} />{formatDate(selectedEvent.date)}</span>
                  {selectedEvent.capacity && <span className="flex items-center gap-1"><Users size={13} />{selectedEvent.capacity} miejsc</span>}
                  {selectedEvent.price && <span className="font-bold text-restauracja-burgundy">{selectedEvent.price} zł</span>}
                </div>
                <p className="text-sm text-gray-600 dark:text-restauracja-cream/70 leading-relaxed mb-6">
                  {selectedEvent.description}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleSignup}
                    className="flex-1 py-2.5 bg-restauracja-burgundy text-white rounded-full font-medium hover:bg-restauracja-wine transition-colors"
                  >
                    Zapisz się (Demo)
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2.5 border border-restauracja-burgundy/30 rounded-full text-sm hover:bg-restauracja-burgundy/5 transition-colors"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
