import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // 1. Create a response object that we can modify later
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Create a Supabase client wired to the request/response cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request (for downstream server components)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Recreate the response so it carries the updated request
          supabaseResponse = NextResponse.next({
            request,
          });
          // Set cookies on the response (so the browser stores them)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 3. Refresh the session — this is the whole reason the middleware exists
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. If not logged in and trying to access a protected route, redirect to login
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 5. Return the response (with refreshed cookies)
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
