import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const startTime = Date.now();
  const pathname = req.nextUrl.pathname;
  const url = req.url;
  
  console.log("🔍 MIDDLEWARE DEBUG START ===========================");
  console.log("📍 Request URL:", url);
  console.log("📍 Pathname:", pathname);
  console.log("📍 Method:", req.method);
  console.log("📍 User Agent:", req.headers.get("user-agent"));
  console.log("📍 Origin:", req.headers.get("origin"));
  console.log("📍 Referer:", req.headers.get("referer"));

  let token = null;
  let tokenError = null;

  try {
    console.log("🔑 Attempting to get token...");
    console.log("🔑 NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
    console.log("🔑 NEXTAUTH_SECRET length:", process.env.NEXTAUTH_SECRET?.length || 0);
    
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    console.log("🔑 Token retrieval successful");
    console.log("🔑 Token exists:", !!token);
    
    if (token) {
      console.log("🔑 Token data:", {
        name: token.name,
        email: token.email,
        sub: token.sub,
        iat: token.iat,
        exp: token.exp,
        jti: token.jti
      });
      console.log("🔑 Token user object:", token.user);
      console.log("🔑 Token email:", token.email);
      console.log("🔑 Token user email:", token.user?.email);
    } else {
      console.log("🔑 No token found");
    }
    
  } catch (error) {
    tokenError = error;
    console.error("❌ Error getting token:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);
  }

  // Check if requesting admin routes
  if (pathname.startsWith("/admin")) {
    console.log("🚨 ADMIN ROUTE DETECTED");
    console.log("🚨 Checking authorization...");
    
    const adminEmail = "ayanahmadkhan042@gmail.com";
    console.log("🚨 Expected admin email:", adminEmail);
    
    if (!token) {
      console.log("❌ UNAUTHORIZED: No token found");
      console.log("🔄 Redirecting to /not-authorized");
      
      const redirectUrl = new URL("/not-authorized", req.url);
      console.log("🔄 Redirect URL:", redirectUrl.toString());
      
      const response = NextResponse.redirect(redirectUrl);
      console.log("🔍 MIDDLEWARE DEBUG END (UNAUTHORIZED) ===============");
      return response;
    }
    
    // Check email from different possible locations
    const tokenEmail = token.email;
    const userEmail = token.user?.email;
    
    console.log("🔍 Email comparison:");
    console.log("  - token.email:", tokenEmail);
    console.log("  - token.user?.email:", userEmail);
    console.log("  - Expected:", adminEmail);
    console.log("  - token.email === adminEmail:", tokenEmail === adminEmail);
    console.log("  - token.user?.email === adminEmail:", userEmail === adminEmail);
    
    const isAuthorized = tokenEmail === adminEmail || userEmail === adminEmail;
    
    if (!isAuthorized) {
      console.log("❌ UNAUTHORIZED: Email mismatch");
      console.log("🔄 Redirecting to /not-authorized");
      
      const redirectUrl = new URL("/not-authorized", req.url);
      console.log("🔄 Redirect URL:", redirectUrl.toString());
      
      const response = NextResponse.redirect(redirectUrl);
      console.log("🔍 MIDDLEWARE DEBUG END (EMAIL MISMATCH) =============");
      return response;
    }
    
    console.log("✅ AUTHORIZED: Admin access granted");
  } else {
    console.log("ℹ️  Non-admin route, allowing access");
  }

  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log("⏱️  Middleware execution time:", duration + "ms");
  console.log("🔍 MIDDLEWARE DEBUG END (SUCCESS) ===================");
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
