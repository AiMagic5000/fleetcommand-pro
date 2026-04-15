import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/tracking",
  "/white-label",
  "/add-fleet",
  "/help",
  "/support",
  "/terms",
  "/privacy",
  "/esign",
  "/api/(.*)",
])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get("host") || ""

  // Skip static files and the standalone dashboard HTML
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon") || pathname.endsWith(".html") || pathname.endsWith(".png") || pathname.endsWith(".jpg") || pathname.endsWith(".css") || pathname.endsWith(".js")) {
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // Path-based tenant: /t/{slug}/...
  const pathMatch = pathname.match(/^\/t\/([a-z0-9-]+)(.*)/)
  if (pathMatch) {
    const response = NextResponse.next()
    response.headers.set("x-tenant-slug", pathMatch[1])
    return response
  }

  // Subdomain-based tenant
  const parts = hostname.split(".")
  if (parts.length >= 3) {
    const subdomain = parts[0]
    if (subdomain !== "www" && subdomain !== "getfleetcommand") {
      const response = NextResponse.next()
      response.headers.set("x-tenant-slug", subdomain)
      return response
    }
  }

  // Custom domain (not getfleetcommand.com)
  if (!hostname.includes("getfleetcommand.com") && !hostname.includes("localhost")) {
    const response = NextResponse.next()
    response.headers.set("x-tenant-domain", hostname)
    return response
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
