'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const supabase = (await import('@/lib/supabase/client')).createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      const timer = setTimeout(() => {
        if (session) {
          router.push('/home')
        } else {
          router.push('/onboarding')
        }
      }, 2000)
      
      return timer
    }

    const timerPromise = checkSession()
    return () => {
      timerPromise.then(timer => clearTimeout(timer))
    }
  }, [router])


  return (
    <div className="flex bg-primaryContainer h-screen w-full items-center justify-center">
      <h1 className="text-onPrimary font-heading text-4xl font-extrabold tracking-tighter">
        Boys@Work
      </h1>
    </div>
  )
}
