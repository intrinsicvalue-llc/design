import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { PageShell } from "@/components/SiteChrome";
import { PatternSpecimen } from "@/components/ThemePreview";
import { PATTERNS, readPattern } from "@/lib/design-data";

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ slug: p.slug }));
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = readPattern(slug);
  if (!doc) notFound();

  return (
    <PageShell current="/patterns" title={doc.title} description="Pattern specification + reference specimen.">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Markdown source={doc.body} />
        </div>
        <aside className="space-y-4">
          <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Specimens
          </h3>
          <PatternSpecimen themeId="tasteful-app" />
          <PatternSpecimen themeId="keystone" />
        </aside>
      </div>
    </PageShell>
  );
}
