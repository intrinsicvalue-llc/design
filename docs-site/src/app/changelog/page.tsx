import { PageShell } from "@/components/SiteChrome";
import { ReleaseTimeline } from "@/components/ReleaseTimeline";
import { getChangelogReleases, getDesignVersion } from "@/lib/design-data";

export const metadata = { title: "Changelog" };

export default function ChangelogPage() {
  const releases = getChangelogReleases();
  const designVersion = getDesignVersion();

  return (
    <PageShell
      current="/changelog"
      title="Changelog"
      description={`Release history for Intrinsic Design and @intrinsic/tokens-css. Local time shown; hover for UTC. Currently v${designVersion}.`}
    >
      <ReleaseTimeline releases={releases} />
    </PageShell>
  );
}
