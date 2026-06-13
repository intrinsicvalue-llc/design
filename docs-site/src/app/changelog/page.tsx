import { Markdown } from "@/components/Markdown";
import { PageShell } from "@/components/SiteChrome";
import { getDesignVersion, readChangelog } from "@/lib/design-data";

export const metadata = { title: "Changelog" };

export default function ChangelogPage() {
  const body = readChangelog();
  const designVersion = getDesignVersion();

  return (
    <PageShell
      current="/changelog"
      title="Changelog"
      description={`What changed in Intrinsic Design — currently v${designVersion}. Plain-English release notes for tokens, patterns, and the reference site.`}
    >
      <Markdown source={body} />
    </PageShell>
  );
}
