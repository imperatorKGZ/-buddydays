import Link from "next/link";

export function Footer() {
  return <footer className="site-footer">
    <div><Link className="brand footer-brand" href="/">BuddyDays</Link><p>Better days, together.</p></div>
    <nav aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/methodology">Our methodology</Link><Link href="/affiliate-disclosure">Affiliate disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></nav>
    <p className="copyright">© {new Date().getFullYear()} BuddyDays. Product information is provided for research purposes.</p>
  </footer>;
}
