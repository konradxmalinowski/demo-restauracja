import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Star, ChefHat, Leaf, SlidersHorizontal } from 'lucide-react'
import { menuItems } from '../../data/menu.data'
import { MENU_CATEGORIES, type MenuCategory } from '../../types/menu.types'
import { useCartStore } from '../../store/cartStore'
import { CartDrawer } from '../cart/CartDrawer'

type SortMode = 'default' | 'price-asc' | 'price-desc' | 'popularity'

interface DietFilters {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  bestseller: boolean
  chefChoice: boolean
}

export function MenuTabs() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'Wszystkie'>('Wszystkie')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortMode>('default')
  const [dietFilters, setDietFilters] = useState<DietFilters>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    bestseller: false,
    chefChoice: false,
  })
  const [cartOpen, setCartOpen] = useState(false)

  const { addItem, items: cartItems } = useCartStore()
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  const filtered = useMemo(() => {
    let result = menuItems.filter((item) => {
      if (activeCategory !== 'Wszystkie' && item.category !== activeCategory) return false
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false
      if (dietFilters.vegetarian && !item.vegetarian) return false
      if (dietFilters.vegan && !item.vegan) return false
      if (dietFilters.glutenFree && !item.glutenFree) return false
      if (dietFilters.bestseller && !item.bestseller) return false
      if (dietFilters.chefChoice && !item.chefChoice) return false
      return true
    })

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    else if (sort === 'popularity') result = [...result].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))

    return result
  }, [activeCategory, search, sort, dietFilters])

  const toggleDiet = (key: keyof DietFilters) => {
    setDietFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price })
    setCartOpen(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-restauracja-burgundy font-serif">
            Karta Dań
          </h1>
          <p className="text-gray-500 dark:text-restauracja-cream/60 mt-1 text-sm">
            Kuchnia śródziemnomorska z polskim akcentem
          </p>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 bg-restauracja-burgundy text-white rounded-full text-sm font-medium hover:bg-restauracja-wine transition-colors"
          aria-label="Otwórz koszyk"
        >
          <span>Koszyk</span>
          {cartCount > 0 && (
            <span className="bg-white text-restauracja-burgundy w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Szukaj potrawy..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-restauracja-burgundy/20 rounded-lg bg-white dark:bg-restauracja-dark text-sm focus:outline-none focus:ring-2 focus:ring-restauracja-burgundy/30"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['Wszystkie', ...MENU_CATEGORIES] as Array<'Wszystkie' | MenuCategory>).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === cat
                ? 'bg-restauracja-burgundy text-white border-restauracja-burgundy'
                : 'border-restauracja-burgundy/30 text-restauracja-dark dark:text-restauracja-parchment hover:border-restauracja-burgundy hover:text-restauracja-burgundy'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Diet filters + sort */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <SlidersHorizontal size={14} className="text-gray-400" />
        {[
          { key: 'vegetarian' as const, label: 'Wegetariańskie', icon: <Leaf size={12} /> },
          { key: 'vegan' as const, label: 'Wegańskie', icon: <Leaf size={12} /> },
          { key: 'glutenFree' as const, label: 'Bezglutenowe', icon: null },
          { key: 'bestseller' as const, label: 'Bestseller', icon: <Star size={12} /> },
          { key: 'chefChoice' as const, label: 'Szefa', icon: <ChefHat size={12} /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => toggleDiet(key)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              dietFilters[key]
                ? 'bg-restauracja-gold text-white border-restauracja-gold'
                : 'border-gray-300 dark:border-restauracja-cream/20 text-gray-600 dark:text-restauracja-cream/60 hover:border-restauracja-gold'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="ml-auto px-3 py-1.5 text-xs border border-gray-300 dark:border-restauracja-cream/20 rounded-lg bg-white dark:bg-restauracja-dark focus:outline-none"
        >
          <option value="default">Kolejność domyślna</option>
          <option value="price-asc">Cena rosnąco</option>
          <option value="price-desc">Cena malejąco</option>
          <option value="popularity">Popularność</option>
        </select>
      </div>

      {/* Menu grid with AnimatePresence layout animation */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 py-12"
          >
            Brak dań spełniających kryteria.
          </motion.p>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-restauracja-dark rounded-xl overflow-hidden border border-restauracja-burgundy/10 hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-restauracja-cream/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {item.bestseller && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 bg-restauracja-gold text-white text-[10px] font-bold rounded-full">
                        <Star size={9} /> Bestseller
                      </span>
                    )}
                    {item.chefChoice && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 bg-restauracja-burgundy text-white text-[10px] font-bold rounded-full">
                        <ChefHat size={9} /> Chef Choice
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    {item.vegan && (
                      <span className="px-1.5 py-0.5 bg-green-500 text-white text-[9px] font-bold rounded-full">V</span>
                    )}
                    {item.vegetarian && !item.vegan && (
                      <span className="px-1.5 py-0.5 bg-green-300 text-white text-[9px] font-bold rounded-full">VG</span>
                    )}
                    {item.glutenFree && (
                      <span className="px-1.5 py-0.5 bg-amber-400 text-white text-[9px] font-bold rounded-full">GF</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-serif font-semibold text-restauracja-dark dark:text-restauracja-parchment text-base leading-snug">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-bold text-restauracja-burgundy">{item.price} zł</span>
                  </div>
                  {/* Dotted separator */}
                  <div className="border-b border-dotted border-restauracja-burgundy/20 my-2" />
                  <p className="text-xs text-gray-500 dark:text-restauracja-cream/60 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2 bg-restauracja-burgundy/10 hover:bg-restauracja-burgundy hover:text-white text-restauracja-burgundy text-sm font-medium rounded-lg transition-colors"
                  >
                    Dodaj do koszyka
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
