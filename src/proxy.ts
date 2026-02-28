// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const path = req.nextUrl.pathname;

   // 🔍 DEBUG: Print ALL cookies in detail
  // console.log("=== MIDDLEWARE DEBUG ===");
  // console.log("Path:", path);
  // console.log("All cookies:", JSON.stringify(req.cookies.getAll(), null, 2));
  // console.log("Request headers cookie:", req.headers.get("cookie"));
  // console.log("Token found:", !!token);
  // console.log("=======================");

  // Public routes (allow without token)
  const publicPaths = [
    "/",
    "/about",
    "/contact",
    "/courses",
    "/unauthorized",
  ];

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
  );

  if (isPublicPath) {
    console.log("🛡️ Middleware - Public path, allowing");
    return NextResponse.next();
  }

  // Protected routes (student, instructor, admin)
  const isProtectedRoute =
    path.startsWith("/student") ||
    path.startsWith("/instructor") ||
    path.startsWith("/admin");

  if (isProtectedRoute && !token) {
    console.log("🛡️ Middleware - No token, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If token exists, allow access
  // Role-based authorization will be handled by your components/AuthContext
  console.log("🛡️ Middleware - Token exists, allowing");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files with extensions (images, etc.)
     * - API routes
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};