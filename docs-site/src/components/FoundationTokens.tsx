import type { Foundation } from "@/lib/design-types";

export function FoundationTokens({ foundation }: { foundation: Foundation }) {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-intrinsic-fg)]">Spacing</h2>
        <p className="mb-6 text-[15px] text-[var(--color-intrinsic-muted)]">4pt grid · Swift: IntrinsicSpacing · CSS: --intrinsic-space-*</p>
        <div className="space-y-3">
          {Object.entries(foundation.space).map(([key, px]) => (
            <div key={key} className="flex items-center gap-4">
              <code className="w-20 shrink-0 font-mono text-[13px] text-[var(--color-intrinsic-muted)]">{key}</code>
              <div
                className="h-4 rounded bg-[var(--color-intrinsic-accent)]"
                style={{ width: px * 4 }}
              />
              <span className="font-mono text-[13px] text-[var(--color-intrinsic-fg)]">{px}px</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-intrinsic-fg)]">Radius</h2>
        <div className="flex flex-wrap gap-6">
          {Object.entries(foundation.radius).map(([key, px]) => (
            <div key={key} className="text-center">
              <div
                className="mx-auto h-20 w-20 border-2 border-[var(--color-intrinsic-accent)] bg-[var(--color-intrinsic-surface)]"
                style={{ borderRadius: px }}
              />
              <p className="mt-2 font-mono text-[12px] text-[var(--color-intrinsic-muted)]">
                {key} · {px}px
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-intrinsic-fg)]">Status colors</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(foundation.colorRole).map(([key, role]) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-intrinsic-line)] p-4"
            >
              <div className="h-10 w-10 rounded-full" style={{ background: role.web }} />
              <div>
                <p className="font-mono text-[13px] font-medium text-[var(--color-intrinsic-fg)]">{key}</p>
                <p className="text-[12px] text-[var(--color-intrinsic-muted)]">
                  Swift .{role.swift} · {role.web}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-intrinsic-fg)]">Motion</h2>
        <ul className="space-y-2 font-mono text-[14px] text-[var(--color-intrinsic-muted)]">
          {Object.entries(foundation.motion).map(([key, ms]) => (
            <li key={key}>
              <span className="text-[var(--color-intrinsic-fg)]">{key}</span> — {ms}ms
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
