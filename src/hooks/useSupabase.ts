'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// --- SERVICES ---
export function useServices(category?: string) {
  return useQuery({
    queryKey: ['services', category],
    queryFn: async () => {
      let query = supabase.from('services').select('*')
      if (category && category !== 'All') {
        query = query.eq('category', category)
      }
      const { data, error } = await query
      if (error) throw error
      return data
    },
  })
}

// --- BOOKINGS ---
export function useUserBookings(userId: string) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service:service_id(*),
          technician:technician_id(
             *,
             profile:users(*)
          )
        `)
        .eq('customer_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings', variables.customer_id] })
    },
  })
}

// --- USERS / PROFILES ---
export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}
