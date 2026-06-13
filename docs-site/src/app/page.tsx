import Link from "next/link";
import { PageShell } from "@/components/SiteChrome";
import { ThemePreview } from "@/components/ThemePreview";
import { getDesignVersion, getFoundation, getThemes, PATTERNS, VOICE_DOCS } from "@/lib/design-data";

export default function HomePage() {
  const themes = getThemes();
  const foundation = getFoundation();
  const designVersion = getDesignVersion();

  return (
    <PageShell
      title="Intrinsic Design"
      description="Pattern-first, platform-native design foundation for every Intrinsic Value product. Tokens are law; themes express personality; patterns define behavior."
      current="/"
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-2xl border border-[var(--color-intrinsic-line)] bg-[var(--color-intrinsic-surface)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-intrinsic-fg)]">Architecture</h2>
            <ol className="mt-4 space-y-2 text-[15px] leading-relaxed text-[var(--color-intrinsic-muted)]">
              <li>
                <strong className="text-[var(--color-intrinsic-fg)]">Foundation</strong> — spacing, radius, motion, status roles (shared)
              </li>
              <li>
                <strong className="text-[var(--color-intrinsic-fg)]">Themes</strong> — accent & surface per product ({themes.length} live)
              </li>
              <li>
                <strong className="text-[var(--color-intrinsic-fg)]">Patterns</strong> — List→Detail, editor sheet, empty state, destructive
              </li>
              <li>
                <strong className="text-[var(--color-intrinsic-fg)]">Voice</strong> — copy standards & entity names
              </li>
              <li>
                <strong className="text-[var(--color-intrinsic-fg)]">Specimens</strong> — canon examples, not shared widget packages
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-intrinsic-fg)]">Themes</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {themes.slice(0, 4).map((t) => (
                <Link
                  key={t.meta.id}
                  href="/themes"
                  className="block transition-opacity hover:opacity-90"
                >
                  <ThemePreview theme={t} mode="light" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-[var(--color-intrinsic-line)] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
              Version
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[var(--color-intrinsic-fg)]">v{designVersion}</p>
            <p className="mt-2 text-[13px] text-[var(--color-intrinsic-muted)]">Git tag on intrinsicvalue-llc/design</p>
          </div>

          <div className="rounded-2xl border border-[var(--color-intrinsic-line)] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
              Foundation
            </p>
            <ul className="mt-3 space-y-1 font-mono text-[13px] text-[var(--color-intrinsic-fg)]">
              <li>{Object.keys(foundation.space).length} spacing tokens</li>
              <li>{Object.keys(foundation.radius).length} radius tokens</li>
              <li>{Object.keys(foundation.colorRole).length} status roles</li>
            </ul>
            <Link
              href="/foundation"
              className="mt-4 inline-block text-[14px] font-medium text-[var(--color-intrinsic-accent)]"
            >
              Explore foundation →
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--color-intrinsic-line)] p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
              Quick links
            </p>
            <ul className="space-y-2 text-[14px]">
              {PATTERNS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/patterns/${p.slug}`} className="text-[var(--color-intrinsic-accent)] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
              {VOICE_DOCS.map((v) => (
                <li key={v.slug}>
                  <Link href={`/voice/${v.slug}`} className="text-[var(--color-intrinsic-muted)] hover:text-[var(--color-intrinsic-fg)]">
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
