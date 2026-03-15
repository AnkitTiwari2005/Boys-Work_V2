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

const techSignupSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  category: z.string().min(2, "Category is required"),
  password: z.string().min(6, "Minimum 6 characters"),
})

type TechSignupFormValues = z.infer<typeof techSignupSchema>

export default function TechnicianSignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const { setUser } = useUserStore()
  const [toast, setToast] = React.useState<{ id: string, title: string, type: ToastType } | null>(null)
  
  const form = useForm<TechSignupFormValues>({
    resolver: zodResolver(techSignupSchema),
    defaultValues: { fullName: "", email: "", phone: "", category: "", password: "" },
  })

  const onSubmit = async (data: TechSignupFormValues) => {
    try {
      // 1. Sign up user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("Signup failed")

      // 2. Create profile in users table
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          role: 'technician'
        })
        .select()
        .single()

      if (profileError) throw profileError

      // 3. Create technician record
      const { error: techError } = await supabase
        .from('technicians')
        .insert({
          id: authData.user.id,
          user_id: authData.user.id,
          category: data.category,
          is_verified: false,
          is_online: false
        })

      if (techError) throw techError

      setUser(profile)
      setToast({ id: Date.now().toString(), title: "Professional Profile Created!", type: "success" })
      
      setTimeout(() => router.push("/technician/jobs"), 1500)

    } catch (error: any) {
      setToast({ id: Date.now().toString(), title: error.message || "Signup Failed", type: "error" })
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

      <TopHeader title="Join as Professional" />

      <div className="flex-1 flex flex-col pt-8 max-w-sm mx-auto w-full px-6 mb-16 pb-safe">
        <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-sm font-bold text-primary">Join 500+ Experts in Delhi NCR</p>
          <p className="text-xs text-onSurfaceVariant mt-1">Start receiving jobs in your area immediately.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            {...form.register("fullName")}
            error={form.formState.errors.fullName?.message}
          />
          <Input 
            label="Email Address" 
            placeholder="pro@example.com" 
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
          <Input 
            label="Phone Number" 
            placeholder="9811797407" 
            {...form.register("phone")}
            error={form.formState.errors.phone?.message}
          />
          <Input 
            label="Service Category" 
            placeholder="Plumbing, Electrical, etc." 
            {...form.register("category")}
            error={form.formState.errors.category?.message}
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
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Applying..." : "Apply Now"}
          </Button>
        </form>

        <div className="mt-8 text-center font-body text-sm text-onSurfaceVariant pb-8">
          Looking for services?{" "}
          <button 
            type="button" 
            onClick={() => router.push("/signup")}
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Sign up as Customer
          </button>
        </div>
      </div>
    </div>
  )
}
