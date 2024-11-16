import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Allow public access to sign-in, sign-up, and sso-callback routes
    "/(sign-in|sign-up|sso-callback)(.*)",
    // Always run for Students, Dashboard, and other private routes
    "/(students|Dashboard|companies|api|trpc)(.*)",
    // Skip Next.js internals and static assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
