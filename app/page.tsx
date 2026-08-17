import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Graphotherapy } from "@/components/sections/Graphotherapy";
import { Programs } from "@/components/sections/Programs";
import { About } from "@/components/sections/About";
import { Media } from "@/components/sections/Media";
import { Recognition } from "@/components/sections/Recognition";
import { Podcasts } from "@/components/sections/Podcasts";
import { StudentResults } from "@/components/sections/StudentResults";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { OfferPopup } from "@/components/marketing/OfferPopup";

// Render dynamically. Vercel was caching this route's prefetch (RSC) response and
// briefly serving it as the page document (a CDN Vary-header glitch — the page is
// fine locally). Dynamic rendering removes the cached prefetch artifact so the
// document is always served as clean HTML.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Graphotherapy />
      <About />
      <Media />
      <Recognition />
      <Programs />
      <Podcasts />
      <StudentResults />
      <Testimonials />
      <ClosingCTA />
      <OfferPopup />
    </main>
  );
}
