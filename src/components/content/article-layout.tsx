import type { ReactNode } from "react";
export function ArticleLayout({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <article className="content-layout"><header><p className="eyebrow">BuddyDays guide</p><h1>{title}</h1><p className="lead">{description}</p></header><div className="article-body">{children}</div></article>;
}
