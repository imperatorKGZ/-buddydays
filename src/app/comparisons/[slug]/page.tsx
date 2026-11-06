import { notFound } from "next/navigation";
export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; void slug; notFound(); }
