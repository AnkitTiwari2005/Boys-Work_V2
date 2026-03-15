import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  category: string
  estimated_time: string
  image_url?: string | null
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalAmount: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = [...get().items]
        const existingItem = items.find((item) => item.id === newItem.id)
        
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          items.push({ ...newItem, quantity: 1 })
        }
        
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        set({ items, totalAmount })
      },
      removeItem: (id) => {
        const items = get().items.filter((item) => item.id !== id)
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        set({ items, totalAmount })
      },
      clearCart: () => set({ items: [], totalAmount: 0 }),
      totalAmount: 0,
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
