import { useState, useEffect } from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, ShoppingBag } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'

const navLinks = [
  { to: '/', label: 'Strona Główna' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Rezerwacje' },
  { to: '/events', label: 'Wydarzenia' },
  { to: '/gallery', label: 'Galeria' },
  { to: '/about', label: 'O Nas' },
  { to: '/contact', label: 'Kontakt' },
]

const BREADCRUMB_LABELS: Record<string, string> = {
  menu: 'Menu',
  reservations: 'Rezerwacje',
  events: 'Wydarzenia',
  gallery: 'Galeria',
  about: 'O Nas',
  contact: 'Kontakt',
  demo: 'Demo',
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useUiStore()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Build breadcrumbs from path (REQ-29)
  const pathSegments = location.pathname.replace(/^\//, '').split('/').filter(Boolean)
  const showBreadcrumbs = pathSegments.length > 0

  // Only the home route has a dark hero behind the transparent navbar;
  // everywhere else the page background is light parchment
  const isHome = location.pathname === '/'
  const overHero = !scrolled && isHome

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-restauracja-parchment dark:bg-restauracja-dark shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className={`font-serif text-xl lg:text-2xl font-bold tracking-wide group-hover:opacity-80 transition-opacity ${overHero ? 'text-restauracja-parchment' : 'text-restauracja-burgundy dark:text-restauracja-gold'}`}>
              Złoty Talerz
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative pb-0.5 font-medium transition-colors hover:text-restauracja-burgundy dark:hover:text-restauracja-gold ${
                      isActive
                        ? 'text-restauracja-burgundy dark:text-restauracja-gold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-restauracja-burgundy dark:after:bg-restauracja-gold'
                        : overHero
                        ? 'text-white/90'
                        : 'text-restauracja-dark dark:text-restauracja-parchment'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle (REQ-28) */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Tryb jasny' : 'Tryb ciemny'}
              className={`p-2 rounded-full hover:bg-restauracja-burgundy/10 transition-colors ${overHero ? 'text-restauracja-parchment' : 'text-restauracja-dark dark:text-restauracja-parchment'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart icon - shown on menu page */}
            <CartIcon />

            {/* Reserve CTA */}
            <Link
              to="/reservations"
              className="hidden lg:inline-flex items-center px-5 py-2 bg-restauracja-burgundy text-white text-sm font-medium rounded-full hover:bg-restauracja-wine transition-colors"
            >
              Zarezerwuj stolik
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu mobilne"
              className={`lg:hidden p-2 rounded-full hover:bg-restauracja-burgundy/10 transition-colors ${overHero ? 'text-restauracja-parchment' : 'text-restauracja-dark dark:text-restauracja-parchment'}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Breadcrumbs (REQ-29) */}
        {showBreadcrumbs && scrolled && (
          <div className="hidden lg:block bg-restauracja-cream/80 dark:bg-restauracja-dark/80 border-t border-restauracja-burgundy/10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-1.5 flex items-center gap-2 text-xs text-restauracja-dark/60 dark:text-restauracja-cream/60">
              <Link to="/" className="hover:text-restauracja-burgundy transition-colors">
                Strona Główna
              </Link>
              {pathSegments.map((seg, i) => (
                <span key={seg} className="flex items-center gap-2">
                  <span>/</span>
                  <span className={i === pathSegments.length - 1 ? 'text-restauracja-burgundy dark:text-restauracja-gold font-medium' : 'hover:text-restauracja-burgundy transition-colors cursor-pointer'}>
                    {BREADCRUMB_LABELS[seg] || seg}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-restauracja-parchment dark:bg-restauracja-dark pt-20 px-6"
          >
            <ul className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 border-b border-restauracja-burgundy/10 text-lg font-medium transition-colors ${
                        isActive ? 'text-restauracja-burgundy dark:text-restauracja-gold' : 'text-restauracja-dark dark:text-restauracja-parchment hover:text-restauracja-burgundy'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-4 text-center px-6 py-3 bg-restauracja-burgundy text-white font-medium rounded-full hover:bg-restauracja-wine transition-colors"
                >
                  Zarezerwuj stolik
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CartIcon() {
  const location = useLocation()
  if (location.pathname !== '/menu') return null
  return (
    <button
      aria-label="Koszyk"
      className="p-2 rounded-full hover:bg-restauracja-burgundy/10 transition-colors text-restauracja-dark dark:text-restauracja-parchment relative"
    >
      <ShoppingBag size={18} />
    </button>
  )
}
