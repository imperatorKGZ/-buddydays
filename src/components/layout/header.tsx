import Link from "next/link";
import { Navigation } from "./navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="BuddyDays home">
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            <span className="brand-name">BuddyDays</span>
            <span className="brand-tagline">Better days, together.</span>
          </span>
        </Link>
        <Navigation />
        <Link className="header-cta" href="/blog">
          Explore Guides <span aria-hidden="true">→</span>
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
