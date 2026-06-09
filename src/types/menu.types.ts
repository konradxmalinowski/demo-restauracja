export interface MenuItem {
  id: string
  name: string
  description: string
  category: MenuCategory
  image: string
  price: number
  bestseller: boolean
  chefChoice: boolean
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
}

export type MenuCategory =
  | 'Przystawki'
  | 'Zupy'
  | 'Dania Główne'
  | 'Ryby'
  | 'Desery'
  | 'Napoje'
  | 'Wina'

export const MENU_CATEGORIES: MenuCategory[] = [
  'Przystawki',
  'Zupy',
  'Dania Główne',
  'Ryby',
  'Desery',
  'Napoje',
  'Wina',
]

export interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  category: string
  price?: number
  capacity?: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
}

export type GalleryCategory = 'Jedzenie' | 'Wnętrze' | 'Wydarzenia'

export interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  comment: string
  date: string
}
