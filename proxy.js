import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(req => {
    const isLoggedIn = !!req.auth
    const isAuthRoute = req.nextUrl.pathname.startsWith("/login")
    const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")

    // Biarkan route auth lewat
    if (isApiAuth) return NextResponse.next()

    // Kalau API route tapi blm login, return 401 JSON
    if (isApiRoute && !isLoggedIn) {
        return NextResponse.json(
            { success: false, message: "Unauthorized", data: null, meta: null },
            { status: 401 }
        )
    }

    // Kalau sudah login dan akses halaman login, maka redirect ke dashboard
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }

    // Kalau belum login dan akses halaman selain login, maka redirect ke halaman login
    if (!isLoggedIn && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}