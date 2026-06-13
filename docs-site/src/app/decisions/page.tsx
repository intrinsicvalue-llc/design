import { ArchitectureOverview, DecisionList } from "@/components/DecisionList";
import { PageShell } from "@/components/SiteChrome";
import { readMarkdown } from "@/lib/design-data";
import { parseAdrs } from "@/lib/parse-adrs";

export const metadata = { title: "Decisions" };

export default function DecisionsPage() {
  const adrMarkdown = readMarkdown("adr/DESIGN_ADR.md");
  const records = parseAdrs(adrMarkdown).reverse();

  return (
    <PageShell
      current="/decisions"
      title="Decisions"
      description="Architecture decision records — why Intrinsic Design is structured this way. Append-only; supersede with a new ADR, never delete."
    >
      <ArchitectureOverview />

      <section>
        <div className="mb-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Decision log
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-intrinsic-muted)]">
            {records.length} records · newest first · full text in{" "}
            <code className="rounded bg-[var(--color-intrinsic-surface)] px-1.5 py-0.5 font-mono text-[13px]">
              adr/DESIGN_ADR.md
            </code>
          </p>
        </div>
        <DecisionList records={records} />
      </section>
    </PageShell>
  );
}
