import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { email, password, secretKey } = await req.json()

  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Invalid admin secret key' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return NextResponse.json({ error: error.message }, { status: 401 })

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Not an admin account' }, { status: 403 })
  }

  return NextResponse.json({ session: data.session, user: data.user })
}
