import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Award, Leaf, Clock } from 'lucide-react'
import { menuItems } from '../data/menu.data'
import { testimonials } from '../data/testimonials.data'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Featured dishes — bestsellers + chefChoice
const featuredDishes = menuItems.filter((m) => m.bestseller || m.chefChoice).slice(0, 6)

// Count-up hook
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function CountUpStat({
  value,
  label,
  suffix = '',
}: {
  value: number
  label: string
  suffix?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 2000, visible)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold font-serif text-restauracja-burgundy mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-restauracja-cream/60 uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

function TestimonialsSlider() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[index]

  return (
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="text-center px-8"
        >
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-restauracja-burgundy text-restauracja-burgundy" />
            ))}
          </div>
          <blockquote className="text-lg italic text-gray-700 dark:text-restauracja-cream/80 leading-relaxed mb-6">
            &ldquo;{t.comment}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-restauracja-burgundy/30"
              loading="lazy"
            />
            <div>
              <div className="font-semibold text-restauracja-dark dark:text-restauracja-parchment text-sm">
                {t.name}
              </div>
              <div className="text-xs text-gray-600">
                {new Date(t.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long' })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <button
        onClick={prev}
        aria-label="Poprzednia opinia"
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-restauracja-burgundy/20 hover:bg-restauracja-burgundy/10 transition-colors"
      >
        <ChevronLeft size={18} className="text-restauracja-burgundy" />
      </button>
      <button
        onClick={next}
        aria-label="Następna opinia"
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-restauracja-burgundy/20 hover:bg-restauracja-burgundy/10 transition-colors"
      >
        <ChevronRight size={18} className="text-restauracja-burgundy" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Opinia ${i + 1}`}
            className={`w-4 h-4 rounded-full transition-colors ${
              i === index ? 'bg-restauracja-burgundy' : 'bg-restauracja-burgundy/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const featuredRef = useScrollReveal<HTMLDivElement>()
  const statsRef = useScrollReveal<HTMLDivElement>()
  const testRef = useScrollReveal<HTMLDivElement>()

  return (
    <>
      <Helmet>
        <title>Restauracja Złoty Talerz — Fine Dining Warsaw</title>
        <meta
          name="description"
          content="Restauracja premium w sercu Warszawy. Kuchnia śródziemnomorska z polskim twistem. Rezerwacje online."
        />
      </Helmet>

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-restauracja-parchment uppercase tracking-[0.3em] text-xs mb-6"
          >
            Fine Dining · Warszawa
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-7xl font-bold font-serif text-restauracja-parchment mb-6 leading-tight"
          >
            Złoty Talerz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-restauracja-cream/90 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Kuchnia śródziemnomorska z polskim twistem. Slow-food, lokalne składniki, niepowtarzalne smaki.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/reservations"
              className="px-8 py-4 bg-restauracja-burgundy text-white rounded-full font-medium text-sm uppercase tracking-widest hover:bg-restauracja-wine transition-colors"
            >
              Zarezerwuj stolik
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 border-2 border-restauracja-parchment/60 text-restauracja-parchment rounded-full font-medium text-sm uppercase tracking-widest hover:bg-restauracja-parchment/10 transition-colors"
            >
              Zobacz menu
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-restauracja-parchment/50" />
        </motion.div>
      </section>

      {/* ─── Featured dishes ──────────────────────────────── */}
      <section className="py-24 bg-[var(--color-parchment)] dark:bg-restauracja-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuredRef} className="text-center mb-14">
            <p className="text-restauracja-burgundy/90 uppercase tracking-widest text-xs mb-3">
              Polecamy
            </p>
            <h2 className="text-4xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment mb-4">
              Wyróżnione dania
            </h2>
            <div className="w-16 border-t border-dotted border-restauracja-burgundy/40 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-restauracja-dark/60 rounded-2xl overflow-hidden border border-restauracja-burgundy/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {dish.bestseller && (
                      <span className="px-2 py-1 bg-restauracja-burgundy text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                        <Star size={9} className="fill-white" />
                        Bestseller
                      </span>
                    )}
                    {dish.chefChoice && (
                      <span className="px-2 py-1 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                        <Award size={9} />
                        Szefa Kuchni
                      </span>
                    )}
                  </div>
                  {dish.vegetarian && (
                    <span className="absolute top-3 right-3 p-1.5 bg-green-100 rounded-full">
                      <Leaf size={12} className="text-green-700" />
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-semibold text-restauracja-dark dark:text-restauracja-parchment text-base mb-1 leading-snug">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-restauracja-cream/60 line-clamp-2 mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-restauracja-burgundy">{dish.price} zł</span>
                    <Link
                      to="/menu"
                      className="text-xs text-restauracja-burgundy underline-offset-2 hover:underline"
                    >
                      Zamów
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-block px-8 py-3 border border-restauracja-burgundy/40 text-restauracja-burgundy rounded-full text-sm font-medium hover:bg-restauracja-burgundy hover:text-white transition-colors"
            >
              Pełne menu
            </Link>
          </div>
        </div>
      </section>

      {/* ─── About teaser with count-up ───────────────────── */}
      <section className="py-24 bg-restauracja-burgundy/5 dark:bg-restauracja-dark/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-restauracja-burgundy/90 uppercase tracking-widest text-xs mb-3">
                Nasza historia
              </p>
              <h2 className="text-4xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment mb-6 leading-tight">
                Od 2008 roku tworzymy wyjątkowe chwile przy stole
              </h2>
              <p className="text-gray-600 dark:text-restauracja-cream/70 leading-relaxed mb-6 text-sm">
                Restauracja Złoty Talerz to miejsce, gdzie slow-food spotyka się z elegancją fine dining. Każde danie przygotowujemy z lokalnych, sezonowych składników — z miłością do tradycji i pasją do nowoczesności.
              </p>
              <div className="flex items-center gap-3 text-sm text-restauracja-burgundy/90 mb-8">
                <Clock size={16} />
                <span>Czynne: Wt–Ndz, 12:00–23:00</span>
              </div>
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-restauracja-burgundy text-white rounded-full text-sm font-medium hover:bg-restauracja-wine transition-colors"
              >
                Poznaj nas lepiej
              </Link>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-8">
              <CountUpStat value={17} label="Lat doświadczenia" />
              <CountUpStat value={48} label="Pozycji w menu" />
              <CountUpStat value={12000} label="Zadowolonych gości" suffix="+" />
              <CountUpStat value={5} label="Nagród kulinarnych" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="py-24 bg-[var(--color-parchment)] dark:bg-restauracja-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={testRef} className="text-center mb-14">
            <p className="text-restauracja-burgundy/90 uppercase tracking-widest text-xs mb-3">
              Opinie gości
            </p>
            <h2 className="text-4xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment mb-4">
              Co mówią nasi goście
            </h2>
            <div className="w-16 border-t border-dotted border-restauracja-burgundy/40 mx-auto" />
          </div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────── */}
      <section
        className="relative py-28 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400)',
        }}
      >
        <div className="absolute inset-0 bg-restauracja-dark/75" />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl font-bold font-serif text-restauracja-parchment mb-4">
            Zarezerwuj swój stolik
          </h2>
          <p className="text-restauracja-cream/80 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Zadzwoń lub skorzystaj z naszego formularza online. Wyjątkowy wieczór czeka na Ciebie.
          </p>
          <Link
            to="/reservations"
            className="inline-block px-10 py-4 bg-restauracja-burgundy text-white rounded-full font-medium text-sm uppercase tracking-widest hover:bg-restauracja-wine transition-colors"
          >
            Zarezerwuj teraz
          </Link>
        </div>
      </section>
    </>
  )
}
