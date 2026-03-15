'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { TopHeader } from "@/components/layout/TopHeader"

const signupSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  password: z.string().min(6, "Minimum 6 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", phone: "", password: "" },
  })

  const onSubmit = async (data: SignupFormValues) => {
    // Supabase auth logic
    router.push("/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopHeader title="Create Account" />

      <div className="flex-1 flex flex-col pt-8 max-w-sm mx-auto w-full px-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            {...form.register("fullName")}
            error={form.formState.errors.fullName?.message}
          />
          <Input 
            label="Email Address" 
            placeholder="name@example.com" 
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
            label="Password" 
            type="password" 
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center font-body text-sm text-onSurfaceVariant">
          Are you a professional?{" "}
          <button 
            type="button" 
            onClick={() => router.push("/technician-signup")}
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Join as Pro
          </button>
        </div>
      </div>
    </div>
  )
}
