// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
export { auth as middleware } from "@/auth"

// export function middleware(request: NextRequest) {
  

//   // Example: Check if the user is authenticated
//   const isAuthenticated = checkAuth(request)

//   if (!isAuthenticated && request.nextUrl.pathname.startsWith('/protected')) {
//     // Redirect to login page if trying to access protected routes
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   // Continue with the request
//   return NextResponse.next()
// }

// // Optional: Configure on which paths to run the middleware
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }

// // Helper function to check authentication (implement your own logic)
// function checkAuth(request: NextRequest): boolean {
//   // Example: Check for a token in cookies
//   const token = request.cookies.get('token')
//   return !!token
// }