import { notFound } from "next/navigation";
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  void slug;
  notFound();
}
