import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Route access based on roles
const roleAccess: Record<string, string[]> = {
    "/dashboard/users": ["superadmin"],
    "/dashboard/organizations": ["superadmin"],
    "/dashboard/admin": ["superadmin"],
    "/dashboard/billing": ["superadmin", "admin"],
    "/dashboard/team": ["superadmin", "admin"],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /dashboard routes
    if (!pathname.startsWith("/dashboard")) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET || "super-secret-key-change-in-production",
    });

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Check role-based access
    const userRole = token.role as string;

    for (const [route, allowedRoles] of Object.entries(roleAccess)) {
        if (pathname.startsWith(route) && !allowedRoles.includes(userRole)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
