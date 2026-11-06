export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  species: "dog" | "cat" | "both";
  href: string;
  status: "available" | "planned";
}
