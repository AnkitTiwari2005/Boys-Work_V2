'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// --- SERVICES ---
export function useServices(category?: string, searchTerm?: string) {
  return useQuery({
    queryKey: ['services', category, searchTerm],
    queryFn: async () => {
      let query = supabase.from('services').select('*')
      if (category && category !== 'All' && category !== 'all') {
        query = query.ilike('category', category)
      }
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }
      const { data, error } = await query
      if (error) throw error
      return data || []
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
             user:user_id(*)
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

// --- TECHNICIAN JOBS ---
export function useTechnicianJobs(category?: string, technicianId?: string) {
  return useQuery({
    queryKey: ['tech-jobs', category, technicianId],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          service:service_id(*),
          customer:customer_id(*)
        `)
      
      if (technicianId) {
        // Show assigned jobs OR pending jobs in their category
        query = query.or(`technician_id.eq.${technicianId},and(status.eq.pending,service.category.ilike.%${category}%)`)
      } else if (category) {
        query = query.eq('status', 'pending')
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: true,
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ bookingId, status, technicianId }: { bookingId: string, status: string, technicianId?: string }) => {
      const updateData: any = { status }
      if (technicianId) updateData.technician_id = technicianId
      
      const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tech-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// --- ADMIN STATS ---
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data: usersCount } = await supabase.from('users').select('id', { count: 'exact', head: true })
      const { data: techCount } = await supabase.from('technicians').select('id', { count: 'exact', head: true })
      const { data: jobsCount } = await supabase.from('bookings').select('id', { count: 'exact', head: true })
      const { data: revenue } = await supabase.from('bookings').select('total_price').eq('payment_status', 'paid')

      const totalRevenue = revenue?.reduce((acc, curr) => acc + Number(curr.total_price), 0) || 0

      return {
        totalUsers: usersCount || 0,
        totalTechnicians: techCount || 0,
        totalBookings: jobsCount || 0,
        totalRevenue
      }
    }
  })
}

// --- ADMIN PORTAL HOOKS ---
export function useAllUsers() {
  return useQuery({
    queryKey: ['admin-all-users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    }
  })
}

export function useAllTechnicians() {
  return useQuery({
    queryKey: ['admin-all-techs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('technicians').select('*, user:user_id(*)').order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    }
  })
}

export function useAllBookings() {
  return useQuery({
    queryKey: ['admin-all-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service:service_id(*),
          customer:customer_id(*),
          technician:technician_id(*, profile:users(*))
        `)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    }
  })
}

// --- USERS / PROFILES ---
export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          technician:technicians(*)
        `)
        .eq('id', userId)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}
