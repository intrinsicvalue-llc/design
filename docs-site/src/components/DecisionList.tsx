import type { AdrRecord } from "@/lib/changelog-types";

function DecisionCard({ record }: { record: AdrRecord }) {
  return (
    <article
      id={record.id.toLowerCase()}
      className="scroll-mt-24 rounded-2xl border border-[var(--color-intrinsic-line)] p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-[var(--color-intrinsic-surface)] px-2 py-0.5 font-mono text-[12px] font-medium text-[var(--color-intrinsic-fg)]">
          {record.id}
        </span>
        {record.date ? (
          <span className="text-[13px] tabular-nums text-[var(--color-intrinsic-muted)]">{record.date}</span>
        ) : null}
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          Accepted
        </span>
      </div>

      <h3 className="mt-4 text-[18px] font-semibold leading-snug tracking-tight text-[var(--color-intrinsic-fg)]">
        {record.title}
      </h3>

      <dl className="mt-5 space-y-4">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Decision
          </dt>
          <dd className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-intrinsic-fg)]">{record.decision}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Context
          </dt>
          <dd className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-intrinsic-muted)]">{record.context}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Consequence
          </dt>
          <dd className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-intrinsic-muted)]">{record.consequence}</dd>
        </div>
      </dl>
    </article>
  );
}

export function DecisionList({ records }: { records: AdrRecord[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {records.map((record) => (
        <DecisionCard key={record.id} record={record} />
      ))}
    </div>
  );
}

export function ArchitectureOverview() {
  return (
    <section className="mb-12 max-w-3xl rounded-2xl border border-[var(--color-intrinsic-line)] bg-[var(--color-intrinsic-surface)] p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
        Architecture
      </p>
      <h2 className="mt-3 text-[20px] font-semibold tracking-tight text-[var(--color-intrinsic-fg)]">
        Standalone design repo
      </h2>
      <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-intrinsic-muted)]">
        Intrinsic Design lives in <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-[13px] dark:bg-black/40">intrinsicvalue-llc/design</code>,
        not inside any product repo. Multiple products share tokens, patterns, and voice without depending on each other.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-[14px]">
          <thead>
            <tr className="border-b border-[var(--color-intrinsic-line)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
              <th className="pb-3 pr-4 font-semibold">Product type</th>
              <th className="pb-3 pr-4 font-semibold">Web CSS</th>
              <th className="pb-3 pr-4 font-semibold">iOS</th>
              <th className="pb-3 font-semibold">Submodule</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-intrinsic-fg)]">
            <tr className="border-b border-[var(--color-intrinsic-line)]">
              <td className="py-3 pr-4 font-medium">Web-only</td>
              <td className="py-3 pr-4 text-[var(--color-intrinsic-muted)]">@intrinsic/tokens-css</td>
              <td className="py-3 pr-4 text-[var(--color-intrinsic-muted)]">—</td>
              <td className="py-3 text-[var(--color-intrinsic-muted)]">No</td>
            </tr>
            <tr className="border-b border-[var(--color-intrinsic-line)]">
              <td className="py-3 pr-4 font-medium">iOS + web</td>
              <td className="py-3 pr-4 text-[var(--color-intrinsic-muted)]">@intrinsic/tokens-css</td>
              <td className="py-3 pr-4 text-[var(--color-intrinsic-muted)]">IntrinsicDesign SPM</td>
              <td className="py-3 text-[var(--color-intrinsic-muted)]">Yes (iOS path)</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">Patterns & voice</td>
              <td className="py-3 pr-4 text-[var(--color-intrinsic-muted)]" colSpan={3}>
                Reference site — no vendored copy in web repos
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="mt-6 space-y-2 text-[15px] leading-relaxed text-[var(--color-intrinsic-muted)]">
        <li>Token releases ship on semver tags → public npm.</li>
        <li>Web CI uses plain <code className="font-mono text-[13px]">npm ci</code> — no auth tokens.</li>
        <li>Only tasteful keeps <code className="font-mono text-[13px]">design/</code> for SwiftPM.</li>
      </ul>
    </section>
  );
}
