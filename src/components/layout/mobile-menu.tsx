"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu">
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Menu"}</button>
    {open ? <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{mainNavigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav> : null}
  </div>;
}
