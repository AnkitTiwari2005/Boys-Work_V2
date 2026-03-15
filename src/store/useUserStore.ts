import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserProfile {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  avatar_url: string | null
  role: 'customer' | 'technician' | 'admin'
}

interface UserState {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  isAuthenticated: boolean
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
