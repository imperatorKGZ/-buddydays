export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNavigation: NavigationItem[] = [
  { label: "Dogs", href: "/dogs", description: "Guides and resources for dog owners" },
  { label: "Cats", href: "/cats", description: "Guides and resources for cat owners" },
  { label: "Journal", href: "/blog", description: "All BuddyDays articles and guides" },
  { label: "Tools", href: "/tools", description: "Practical pet-owner utilities" },
];
