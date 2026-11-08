import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href="/">
          BuddyDays
        </Link>
        <p className="footer-copy">
          Thoughtful guides and practical ideas for people who share their homes with dogs and cats.
        </p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/dogs">Dogs</Link>
        <Link href="/cats">Cats</Link>
        <Link href="/blog">Journal</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/emergency-pet-help">Emergency Pet Help</Link>
        <Link href="/about">About</Link>
        <Link href="/methodology">Editorial standards</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
      </nav>
      <p className="copyright">© {new Date().getFullYear()} BuddyDays. Better days, together.</p>
    </footer>
  );
}
