import { Markdown } from "@/components/Markdown";
import { PageShell } from "@/components/SiteChrome";
import { readMarkdown } from "@/lib/design-data";

export const metadata = { title: "Decisions" };

export default function DecisionsPage() {
  const adr = readMarkdown("adr/DESIGN_ADR.md");
  const repo = readMarkdown("adr/DESIGN_REPO.md");

  return (
    <PageShell
      current="/decisions"
      title="Decisions"
      description="Design ADRs — why past choices were made. Append-only log."
    >
      <div className="space-y-12">
        <Markdown source={repo} />
        <hr className="border-[var(--color-intrinsic-line)]" />
        <Markdown source={adr} />
      </div>
    </PageShell>
  );
}
