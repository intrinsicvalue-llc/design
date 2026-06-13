import Link from "next/link";
import { PageShell } from "@/components/SiteChrome";
import { PATTERNS } from "@/lib/design-data";

export const metadata = { title: "Patterns" };

export default function PatternsIndexPage() {
  return (
    <PageShell
      current="/patterns"
      title="Patterns"
      description="Named UX recipes — authority lives here. Specimens show platform-native implementations, not shared npm widgets."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PATTERNS.map((p) => (
          <Link
            key={p.slug}
            href={`/patterns/${p.slug}`}
            className="rounded-2xl border border-[var(--color-intrinsic-line)] p-6 transition-colors hover:border-[var(--color-intrinsic-accent)]"
          >
            <h2 className="text-lg font-semibold text-[var(--color-intrinsic-fg)]">{p.title}</h2>
            <p className="mt-2 text-[14px] text-[var(--color-intrinsic-muted)]">Pattern · {p.file}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
