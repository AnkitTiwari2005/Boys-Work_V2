'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  AlertCircle,
  Mail,
  Phone,
  ArrowLeft,
  UserPlus
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import { motion } from "framer-motion"

const MOCK_USERS = [
  { id: 1, name: "Ankit Kumar", email: "ankit@example.com", phone: "+91 98117XXXXX", role: 'customer', status: 'verified', joined: '15 Jan 2026' },
  { id: 2, name: "Rajesh Pro", email: "rajesh@work.com", phone: "+91 98227XXXXX", role: 'technician', status: 'pending', joined: '10 Feb 2026' },
  { id: 3, name: "John Doe", email: "john@test.com", phone: "+91 99999XXXXX", role: 'customer', status: 'blocked', joined: '01 Mar 2026' },
]

export default function UserManagement() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-surfaceContainerLow">
      <header className="bg-surfaceContainerLowest border-b border-outlineVariant/10 px-8 py-6 sticky top-0 z-50">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="lg:hidden p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold font-display text-onSurface">User Management</h1>
            </div>
            <Button className="h-11 rounded-xl px-6 font-bold shadow-lg flex items-center gap-2">
               <UserPlus size={18} /> Add User
            </Button>
         </div>

         <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
               <input 
                 type="text" 
                 placeholder="Search by name, email, or phone..." 
                 className="w-full pl-12 pr-4 py-3 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent"
               />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
               <Button variant="outline" className="flex-1 md:flex-none h-11 rounded-xl bg-surfaceContainerLowest border-outlineVariant/20 text-onSurfaceVariant text-xs gap-2">
                  <Filter size={16} /> Filters
               </Button>
               <Button variant="outline" className="flex-1 md:flex-none h-11 rounded-xl bg-surfaceContainerLowest border-outlineVariant/20 text-onSurfaceVariant text-xs">
                  Export CSV
               </Button>
            </div>
         </div>
      </header>

      <main className="p-8">
         <Card className="border-none bg-surfaceContainerLowest rounded-[32px] overflow-hidden shadow-2xl shadow-surfaceContainerLow/50">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-outlineVariant/10">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-onSurfaceVariant">User</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-onSurfaceVariant">Role</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-onSurfaceVariant">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-onSurfaceVariant">Joined</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-onSurfaceVariant text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {MOCK_USERS.map((user) => (
                        <tr key={user.id} className="border-b border-outlineVariant/5 hover:bg-surfaceContainerLow/50 transition-colors group">
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                 <Avatar src={`https://i.pravatar.cc/150?u=${user.id}`} size="md" fallback={user.name[0]} className="shadow-md" />
                                 <div>
                                    <p className="text-sm font-bold text-onSurface group-hover:text-primary transition-colors">{user.name}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                       <span className="text-[10px] text-onSurfaceVariant flex items-center gap-1">
                                          <Mail size={10} /> {user.email}
                                       </span>
                                       <span className="text-[10px] text-onSurfaceVariant flex items-center gap-1">
                                          <Phone size={10} /> {user.phone}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider ${user.role === 'technician' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                 {user.role}
                              </span>
                           </td>
                           <td className="px-6 py-5">
                              {user.status === 'verified' && (
                                 <Badge variant="success" className="h-6 px-2 text-[8px] font-bold flex items-center gap-1 max-w-fit rounded-full uppercase">
                                    <ShieldCheck size={10} /> Verified
                                 </Badge>
                              )}
                              {user.status === 'pending' && (
                                 <Badge variant="warning" className="h-6 px-2 text-[8px] font-bold flex items-center gap-1 max-w-fit rounded-full uppercase">
                                    <AlertCircle size={10} /> Pending
                                 </Badge>
                              )}
                              {user.status === 'blocked' && (
                                 <Badge variant="error" className="h-6 px-2 text-[8px] font-bold flex items-center gap-1 max-w-fit rounded-full uppercase">
                                    <AlertCircle size={10} /> Blocked
                                 </Badge>
                              )}
                           </td>
                           <td className="px-6 py-5">
                              <p className="text-xs font-medium text-onSurfaceVariant">{user.joined}</p>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <button className="p-2 text-onSurfaceVariant hover:text-primary transition-colors rounded-lg hover:bg-surfaceContainerLow">
                                 <MoreVertical size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="px-8 py-6 flex items-center justify-between border-t border-outlineVariant/10 bg-surfaceContainerLow/30">
               <p className="text-xs text-onSurfaceVariant font-medium">Showing 1-3 of 8,540 users</p>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-xs font-bold" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-xs font-bold border-primary text-primary">Next</Button>
               </div>
            </div>
         </Card>
      </main>
    </div>
  )
}
