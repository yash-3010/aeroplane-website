import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    "use server"
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res})
    const { data } = await supabase.auth.getSession();

    if(!data?.session) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/cart',
        '/resetPassword',
    ]
}