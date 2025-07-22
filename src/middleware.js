import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Only apply middleware to admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    try {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // Debug logs (remove in production)
      console.log("=== MIDDLEWARE DEBUG ===");
      console.log("Path:", req.nextUrl.pathname);
      console.log("Token exists:", !!token);
      console.log("Token email:", token?.email);
      console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
      console.log("======================");

      // Check if user is authenticated
      if (!token) {
        console.log("❌ No token found, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Check if user is authorized (specific email)
      const authorizedEmail = 'ayanahmadkhan042@gmail.com';
      if (token.email !== authorizedEmail) {
        console.log(`❌ Unauthorized email: ${token.email}`);
        console.log(`❌ Expected: ${authorizedEmail}`);
        return NextResponse.redirect(new URL("/not-authorized", req.url));
      }

      console.log("✅ User authorized, proceeding to admin");
      return NextResponse.next();
      
    } catch (error) {
      console.error("❌ Middleware error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
