'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding')
    }, 2500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex bg-primaryContainer h-screen w-full items-center justify-center">
      <h1 className="text-onPrimary font-heading text-4xl font-extrabold tracking-tighter">
        Boys@Work
      </h1>
    </div>
  )
}
