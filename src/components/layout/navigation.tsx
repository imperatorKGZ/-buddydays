import Link from "next/link";
import { mainNavigation } from "@/config/navigation";

export function Navigation() {
  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {mainNavigation.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
