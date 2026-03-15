import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // unprotected routes
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/signup') || 
                     request.nextUrl.pathname.startsWith('/onboarding') ||
                     request.nextUrl.pathname.startsWith('/admin-login') ||
                     request.nextUrl.pathname.startsWith('/technician-signup') ||
                     request.nextUrl.pathname === '/'

  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-based protection
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role

    if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/home', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/technician') && role !== 'technician') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    
    // If logged in, don't allow accessing login pages
    if (isAuthPage && request.nextUrl.pathname !== '/' && !request.nextUrl.pathname.startsWith('/onboarding')) {
        if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        if (role === 'technician') return NextResponse.redirect(new URL('/technician/jobs', request.url))
        return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
