import Link from "next/link";
import { Navigation } from "./navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return <header className="site-header"><Link className="brand" href="/" aria-label="BuddyDays home"><span className="brand-mark" aria-hidden="true">B</span><span>BuddyDays</span></Link><Navigation/><MobileMenu/></header>;
}
