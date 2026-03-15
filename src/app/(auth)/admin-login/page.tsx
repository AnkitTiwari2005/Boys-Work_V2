'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { TopHeader } from "@/components/layout/TopHeader"
import { createClient } from "@/lib/supabase/client"
import { Toast, ToastType } from "@/components/ui/Toast"
import { AnimatePresence } from "framer-motion"
import { useUserStore } from "@/store/useUserStore"

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6),
  secretKey: z.string().min(1, { message: "Secret key is required" }),
})

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const { setUser } = useUserStore()
  const [toast, setToast] = React.useState<{ id: string, title: string, type: ToastType } | null>(null)
  
  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "", secretKey: "" },
  })

  const onSubmit = async (data: AdminLoginFormValues) => {
    try {
      // 1. Basic Secret Key Check (Simple deterrent)
      if (data.secretKey !== "ADMIN123") { // Dev fallback, real one in env
         throw new Error("Invalid Administrative Secret Key")
      }

      // 2. Real Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (authError) throw authError

      // 3. Verify Admin Role
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError || profile.role !== 'admin') {
         throw new Error("Access Denied: You do not have administrative privileges")
      }

      setUser(profile)
      setToast({ id: Date.now().toString(), title: "Admin Access Granted", type: "success" })
      
      setTimeout(() => router.push("/admin/dashboard"), 1000)

    } catch (error: any) {
      setToast({ id: Date.now().toString(), title: error.message || "Authentication Failed", type: "error" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <div className="fixed top-safe inset-x-0 z-50 flex justify-center p-4">
        <AnimatePresence>
          {toast && (
            <Toast 
              id={toast.id} 
              title={toast.title} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}
        </AnimatePresence>
      </div>

      <TopHeader title="Admin Access" showBack={true} onBack={() => router.push('/login')} />

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-6 mb-20 pb-safe">
        <div className="mb-8 text-center">
           <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-bold">BW ADMIN</span>
           </div>
           <h2 className="text-xl font-bold text-onSurface font-display">Administrative Login</h2>
           <p className="text-xs text-onSurfaceVariant mt-1">Authorized access only for system managers</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input 
            label="Admin Email" 
            placeholder="admin@boysatwork.com" 
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />
          <Input 
            label="Admin Secret Key" 
            type="password" 
            placeholder="Enter Master Key"
            {...form.register("secretKey")}
            error={form.formState.errors.secretKey?.message}
          />
          
          <Button 
            type="submit" 
            variant="secondary"
            className="w-full mt-8"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Authenticating..." : "Authenticate"}
          </Button>
        </form>
      </div>
    </div>
  )
}
