'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Toast, ToastType } from "@/components/ui/Toast"
import { AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { useUserStore } from "@/store/useUserStore"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const { setUser } = useUserStore()
  const [toast, setToast] = React.useState<{ id: string, title: string, type: ToastType } | null>(null)
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (authError) throw authError

      // Fetch user profile to get role
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) throw profileError

      setUser(profile)
      setToast({ id: Date.now().toString(), title: "Login Successful", type: "success" })
      
      // Role-based redirection
      setTimeout(() => {
        if (profile.role === 'admin') router.push("/admin/dashboard")
        else if (profile.role === 'technician') router.push("/technician/jobs")
        else router.push("/home")
      }, 1000)

    } catch (error: any) {
      setToast({ id: Date.now().toString(), title: error.message || "Login Failed", type: "error" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface px-6 pt-safe pb-safe">
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

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-10 text-center">
          <h1 className="text-display-lg font-heading font-extrabold text-primary mb-2">Boys@Work</h1>
          <p className="text-onSurfaceVariant font-body">Delhi NCR's Most Trusted Home Services</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input 
            label="Email Address" 
            placeholder="name@example.com" 
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
          
          <Button 
            type="submit" 
            className="w-full mt-8"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center font-body text-sm text-onSurfaceVariant">
          Don't have an account?{" "}
          <button 
            type="button" 
            onClick={() => router.push("/signup")}
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  )
}
