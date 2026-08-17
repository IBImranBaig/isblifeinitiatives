import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Subdomain routing + "bare chrome" flagging.
 *
 * Some routes render WITHOUT the main-site nav/footer — focused funnel pages with
 * no exit links. They are tagged with `x-bare-chrome`, which the root layout reads
 * to drop the chrome. Two cases use it:
 *
 *  1. `ebook.imranbaig.com` — the ebook funnel. Clean subdomain paths are mapped
 *     onto the repo's `/ebook/*` routes (rewrite, not redirect — the bare
 *     subdomain stays in the URL bar):
 *       ebook.imranbaig.com/           → /ebook            (opt-in entry page)
 *       ebook.imranbaig.com/thank-you  → /ebook/thank-you  (post-submit page)
 *     Its links are homepage anchors (`/#programs`, …) that, on the subdomain,
 *     resolve back to the funnel — i.e. dead links — so the chrome is dropped.
 *
 *  2. `/tpapaid` — the post-purchase Professional Approach upgrade offer (OTO),
 *     shown right after the ₹2,400 First Step checkout. Distraction-free by design.
 */
const BARE_HEADER = "x-bare-chrome";

const SUBDOMAIN_ROUTES: Record<string, string> = {
  "/": "/ebook",
  "/thank-you": "/ebook/thank-you",
};

function withBareHeader(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set(BARE_HEADER, "1");
  return headers;
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const isEbookHost = host === "ebook.imranbaig.com" || host.startsWith("ebook.");
  const { pathname } = req.nextUrl;

  // Ebook subdomain → map its clean paths onto the /ebook/* routes.
  if (isEbookHost) {
    const target = SUBDOMAIN_ROUTES[pathname];
    if (target) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.rewrite(url, { request: { headers: withBareHeader(req) } });
    }
  }

  // Direct access to a bare funnel path → flag it so chrome is dropped there too.
  if (pathname === "/ebook" || pathname.startsWith("/ebook/") || pathname === "/tpapaid") {
    return NextResponse.next({ request: { headers: withBareHeader(req) } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/thank-you", "/ebook", "/ebook/:path*", "/tpapaid"],
};
