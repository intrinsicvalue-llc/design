import Link from "next/link";
import { getDesignVersion } from "@/lib/design-data";
import { NAV } from "@/lib/design-types";

export function SiteHeader({ current, designVersion }: { current?: string; designVersion: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-intrinsic-line)] bg-[var(--color-intrinsic-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-3">
        <div className="flex items-baseline gap-2">
          <Link
            href="https://intrinsicvalue.llc"
            className="text-[13px] font-medium text-[var(--color-intrinsic-muted)] hover:text-[var(--color-intrinsic-fg)]"
          >
            Intrinsic Value
          </Link>
          <span className="text-[13px] text-[var(--color-intrinsic-line)]" aria-hidden>
            /
          </span>
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-[var(--color-intrinsic-fg)]">
            Intrinsic Design
          </Link>
          <Link
            href="/changelog"
            className="rounded-full bg-[var(--color-intrinsic-line)] px-2.5 py-0.5 font-mono text-[12px] font-semibold text-[var(--color-intrinsic-fg)] hover:bg-[var(--color-intrinsic-accent)]/15"
          >
            v{designVersion}
          </Link>
        </div>
        <nav className="flex flex-wrap gap-1 text-[14px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                current === item.href
                  ? "bg-[var(--color-intrinsic-fg)] text-[var(--color-intrinsic-surface)]"
                  : "text-[var(--color-intrinsic-muted)] hover:bg-[var(--color-intrinsic-line)] hover:text-[var(--color-intrinsic-fg)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function PageShell({
  title,
  description,
  current,
  children,
}: {
  title: string;
  description?: string;
  current?: string;
  children: React.ReactNode;
}) {
  const designVersion = getDesignVersion();

  return (
    <>
      <SiteHeader current={current} designVersion={designVersion} />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <header className="mb-10 border-b border-[var(--color-intrinsic-line)] pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-intrinsic-fg)]">{title}</h1>
          {description && (
            <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[var(--color-intrinsic-muted)]">
              {description}
            </p>
          )}
        </header>
        {children}
      </main>
      <footer className="border-t border-[var(--color-intrinsic-line)] py-8 text-center text-[13px] text-[var(--color-intrinsic-muted)]">
        <p>
          <Link href="https://intrinsicvalue.llc" className="hover:text-[var(--color-intrinsic-fg)]">
            Intrinsic Value LLC
          </Link>
          {" · "}
          <span>design.intrinsicvalue.llc</span>
          {" · "}
          <span>pattern-first reference</span>
        </p>
      </footer>
    </>
  );
}
