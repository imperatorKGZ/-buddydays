export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNavigation: NavigationItem[] = [
  { label: "Dogs", href: "/dogs", description: "Stories and resources for dog people" },
  { label: "Cats", href: "/cats", description: "Stories and resources for cat people" },
  { label: "Blog", href: "/blog", description: "All BuddyDays articles" },
  { label: "Tools", href: "/tools", description: "Practical pet-owner utilities" },
];
