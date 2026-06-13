import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { PageShell } from "@/components/SiteChrome";
import { VOICE_DOCS, readVoiceDoc } from "@/lib/design-data";

export function generateStaticParams() {
  return VOICE_DOCS.map((v) => ({ slug: v.slug }));
}

export default async function VoiceDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = readVoiceDoc(slug);
  if (!doc) notFound();

  return (
    <PageShell current="/voice" title={doc.title}>
      <Markdown source={doc.body} />
    </PageShell>
  );
}
