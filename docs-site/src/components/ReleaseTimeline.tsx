import type { Release, ReleaseSection } from "@/lib/changelog-types";

const SECTION_TONE: Record<string, string> = {
  Added: "text-emerald-700 dark:text-emerald-400",
  Changed: "text-sky-700 dark:text-sky-400",
  Fixed: "text-amber-700 dark:text-amber-400",
  Documented: "text-violet-700 dark:text-violet-400",
  Migration: "text-[var(--color-intrinsic-accent)]",
};

function SectionBlock({ section }: { section: ReleaseSection }) {
  const tone = SECTION_TONE[section.label] ?? "text-[var(--color-intrinsic-muted)]";

  return (
    <div>
      <p className={`text-[11px] font-semibold uppercase tracking-wider ${tone}`}>{section.label}</p>
      <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-[var(--color-intrinsic-fg)]">
        {section.items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-intrinsic-line)]" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReleaseEntry({ release, latest }: { release: Release; latest?: boolean }) {
  return (
    <article
      id={`v${release.version}`}
      className={
        latest
          ? "scroll-mt-24 rounded-2xl border border-[var(--color-intrinsic-line)] bg-[var(--color-intrinsic-surface)] p-6 sm:p-8"
          : "scroll-mt-24 border-t border-[var(--color-intrinsic-line)] pt-10 first:border-t-0 first:pt-0"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <time
          dateTime={release.date.length === 7 ? `${release.date}-01` : release.date}
          className="text-[13px] tabular-nums text-[var(--color-intrinsic-muted)]"
        >
          {formatReleaseDate(release.date)}
        </time>
        <span className="font-mono text-[12px] text-[var(--color-intrinsic-muted)]">v{release.version}</span>
      </div>

      <h2 className="mt-3 text-[22px] font-semibold tracking-tight text-[var(--color-intrinsic-fg)] sm:text-2xl">
        {release.title}
      </h2>

      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--color-intrinsic-muted)]">
        {release.summary}
      </p>

      {release.sections.length > 0 ? (
        <div className="mt-6 space-y-5">{release.sections.map((s) => <SectionBlock key={s.label} section={s} />)}</div>
      ) : null}
    </article>
  );
}

function formatReleaseDate(iso: string): string {
  if (iso.length === 7) {
    const [year, month] = iso.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ReleaseTimeline({ releases }: { releases: Release[] }) {
  const [latest, ...earlier] = releases;

  return (
    <div className="max-w-2xl">
      {latest ? (
        <section className="mb-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Latest
          </p>
          <ReleaseEntry release={latest} latest />
        </section>
      ) : null}

      {earlier.length > 0 ? (
        <section>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-intrinsic-muted)]">
            Earlier releases
          </p>
          <div className="space-y-10">
            {earlier.map((release) => (
              <ReleaseEntry key={release.version} release={release} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
