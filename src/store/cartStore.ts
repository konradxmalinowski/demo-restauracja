import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types/menu.types'

interface CartState {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
}

function computeTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          let newItems: CartItem[]
          if (existing) {
            newItems = state.items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            )
          } else {
            newItems = [...state.items, { ...item, qty: 1 }]
          }
          return { items: newItems, total: computeTotal(newItems) }
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id)
          return { items: newItems, total: computeTotal(newItems) }
        }),

      updateQty: (id, qty) =>
        set((state) => {
          let newItems: CartItem[]
          if (qty <= 0) {
            newItems = state.items.filter((i) => i.id !== id)
          } else {
            newItems = state.items.map((i) => (i.id === id ? { ...i, qty } : i))
          }
          return { items: newItems, total: computeTotal(newItems) }
        }),

      clear: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'restauracja-cart',
      partialize: (state: CartState) => ({ items: state.items, total: state.total }),
    }
  )
)
