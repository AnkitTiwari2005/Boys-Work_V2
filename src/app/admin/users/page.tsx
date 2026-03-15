'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search, 
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Phone,
  MoreVertical,
  ChevronRight
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useAllUsers } from "@/hooks/useSupabase"

export default function AdminUsersPage() {
  const router = useRouter()
  const { data: users = [], isLoading } = useAllUsers()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-surfaceContainerLow flex flex-col">
      <header className="bg-surfaceContainerLowest border-b border-outlineVariant/10 px-8 py-6 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/admin/dashboard')}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold font-display text-onSurface">User Management</h1>
          </div>
          <Button className="gap-2 rounded-xl">
            <UserPlus size={18} /> Add User
          </Button>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
          />
        </div>
      </header>

      <main className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-40 bg-surfaceContainerLowest animate-pulse rounded-3xl" />)
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="p-6 border-none bg-surfaceContainerLowest rounded-3xl shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-lg">
                    {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-onSurface group-hover:text-primary transition-colors">{user.full_name || "New User"}</h3>
                    <Badge variant="secondary" className="uppercase text-[8px] tracking-widest px-2">{user.role}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full text-onSurfaceVariant">
                  <MoreVertical size={18} />
                </Button>
              </div>

              <div className="space-y-3 mb-6">
                 <div className="flex items-center gap-2 text-xs text-onSurfaceVariant">
                    <Mail size={14} className="text-primary/60" /> {user.email}
                 </div>
                 {user.phone && (
                   <div className="flex items-center gap-2 text-xs text-onSurfaceVariant">
                      <Phone size={14} className="text-primary/60" /> {user.phone}
                   </div>
                 )}
              </div>

              <div className="pt-4 border-t border-outlineVariant/10 flex items-center justify-between">
                 <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-widest">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                 <Button variant="ghost" size="sm" className="text-primary gap-2 h-8 px-2 font-bold text-xs">
                    Full Profile <ChevronRight size={14} />
                 </Button>
              </div>
            </Card>
          ))
        )}
      </main>
    </div>
  )
}
