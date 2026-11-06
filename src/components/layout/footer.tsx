import Link from "next/link";

export function Footer() {
  return <footer className="site-footer">
    <div><Link className="brand footer-brand" href="/">BuddyDays</Link><p>Practical guides for life with dogs and cats.</p></div>
    <nav aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/methodology">Editorial standards</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
    <p className="copyright">© {new Date().getFullYear()} BuddyDays. Better days, together.</p>
  </footer>;
}
