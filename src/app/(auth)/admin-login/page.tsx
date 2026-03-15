'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { TopHeader } from "@/components/layout/TopHeader"

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6),
  secretKey: z.string().min(1, { message: "Secret key is required" }),
})

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  
  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "", secretKey: "" },
  })

  const onSubmit = async (data: AdminLoginFormValues) => {
    // API logic to /api/auth/admin-login in phase 5
    router.push("/admin/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopHeader title="Admin Access" showBack={false} />

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-6 mb-20">
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
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />
          <Input 
            label="Admin Secret Key" 
            type="password" 
            {...form.register("secretKey")}
            error={form.formState.errors.secretKey?.message}
          />
          
          <Button 
            type="submit" 
            variant="secondary"
            className="w-full mt-8"
            disabled={form.formState.isSubmitting}
          >
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  )
}
