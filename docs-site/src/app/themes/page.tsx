import { PageShell } from "@/components/SiteChrome";
import { KeystoneAdminSpecimen } from "@/components/KeystoneAdminSpecimen";
import { ThemeExplorer } from "@/components/ThemePreview";
import { getThemes } from "@/lib/design-data";

export const metadata = { title: "Themes" };

export default function ThemesPage() {
  const themes = getThemes();
  return (
    <PageShell
      current="/themes"
      title="Themes"
      description="Product personality on shared foundation. Accent divergence is intentional — not drift."
    >
      <section className="mb-12 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-intrinsic-fg)]">Keystone admin console</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-[var(--color-intrinsic-muted)]">
            Semantic typography acceptance specimen — body, label, tab, table-cell, table-code from{" "}
            <code className="rounded bg-[var(--color-intrinsic-surface)] px-1.5 py-0.5 font-mono text-[13px]">
              tokens/themes/keystone.json
            </code>
            . Tables and monospace IDs render at body scale (15px), not ad-hoc <code className="font-mono text-[13px]">text-xs</code>.
          </p>
        </div>
        <KeystoneAdminSpecimen />
      </section>
      <ThemeExplorer themes={themes} />
    </PageShell>
  );
}
