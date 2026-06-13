import { PageShell } from "@/components/SiteChrome";
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
      <ThemeExplorer themes={themes} />
    </PageShell>
  );
}
