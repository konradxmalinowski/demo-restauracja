import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../store/cartStore'

// Reset store before each test
beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('cartStore', () => {
  it('starts with empty cart', () => {
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('addItem adds a new dish to the cart', () => {
    const { addItem } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ id: 'p1', name: 'Tatar', price: 48, qty: 1 })
  })

  it('addItem increments qty when item already in cart', () => {
    const { addItem } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].qty).toBe(2)
  })

  it('removeItem removes a dish from cart', () => {
    const { addItem, removeItem } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    removeItem('p1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('updateQty updates quantity of item', () => {
    const { addItem, updateQty } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    updateQty('p1', 5)
    const { items } = useCartStore.getState()
    expect(items[0].qty).toBe(5)
  })

  it('updateQty with 0 removes the item', () => {
    const { addItem, updateQty } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    updateQty('p1', 0)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('clear empties the cart', () => {
    const { addItem, clear } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    addItem({ id: 'p2', name: 'Burrata', price: 42 })
    clear()
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('total computes correctly', () => {
    const { addItem } = useCartStore.getState()
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    addItem({ id: 'p1', name: 'Tatar', price: 48 })
    addItem({ id: 'p2', name: 'Burrata', price: 42 })
    const { total } = useCartStore.getState()
    expect(total).toBe(48 * 2 + 42)
  })
})
