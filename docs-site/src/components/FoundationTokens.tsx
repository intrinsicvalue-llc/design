import type { Foundation, TypographyRoleSpec } from "@/lib/design-types";

function iosLabel(ios: TypographyRoleSpec["ios"]): string {
  if (typeof ios === "string") return `.${ios}`;
  const weight = ios.weight ? `.weight(.${ios.weight})` : "";
  return `.${ios.textStyle}${weight}`;
}

function roleSlug(role: string): string {
  return role.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export function FoundationTokens({ foundation }: { foundation: Foundation }) {
  const roles = foundation.typography.roles ?? {};

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
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-intrinsic-fg)]">Typography</h2>
        <p className="mb-6 text-[15px] text-[var(--color-intrinsic-muted)]">
          Semantic roles · Swift: IntrinsicTypography · Web: .iv-* from foundation.utilities.css · ADR-011
        </p>

        <div className="mb-8 overflow-hidden rounded-xl border border-[var(--color-intrinsic-line)]">
          <div className="border-b border-[var(--color-intrinsic-line)] bg-[var(--color-intrinsic-surface)] px-4 py-3">
            <p className="iv-label text-[var(--color-intrinsic-muted)]">Acceptance specimen — list row hierarchy</p>
          </div>
          <div className="space-y-1 px-4 py-4">
            <p className="iv-headline text-[var(--color-intrinsic-fg)]">Chicken Tikka Masala</p>
            <p className="iv-subheadline text-[var(--color-intrinsic-muted)]">Serves 4 · 45 min · Medium spice</p>
            <p className="iv-footnote text-[var(--color-intrinsic-muted)]">Last edited yesterday</p>
          </div>
          <div className="border-t border-[var(--color-intrinsic-line)] px-4 py-3">
            <p className="iv-callout text-[var(--color-intrinsic-fg)]">Callout — short intro or banner copy at secondary emphasis.</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--color-intrinsic-line)]">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-[var(--color-intrinsic-line)] bg-[var(--color-intrinsic-surface)]">
                <th className="iv-label px-4 py-3 text-[var(--color-intrinsic-muted)]">Role</th>
                <th className="iv-label px-4 py-3 text-[var(--color-intrinsic-muted)]">iOS</th>
                <th className="iv-label px-4 py-3 text-[var(--color-intrinsic-muted)]">Web</th>
                <th className="iv-label px-4 py-3 text-[var(--color-intrinsic-muted)]">Use</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(roles).map(([role, spec]) => (
                <tr key={role} className="border-b border-[var(--color-intrinsic-line)] last:border-0">
                  <td className="px-4 py-3 font-mono text-[13px] text-[var(--color-intrinsic-fg)]">{role}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-intrinsic-muted)]">{iosLabel(spec.ios)}</td>
                  <td className="px-4 py-3">
                    <span className={`iv-${roleSlug(role)} text-[var(--color-intrinsic-fg)]`}>
                      .iv-{roleSlug(role)}
                    </span>
                    <span className="ml-2 font-mono text-[11px] text-[var(--color-intrinsic-muted)]">
                      {spec.web.sizePx}px
                    </span>
                  </td>
                  <td className="iv-footnote px-4 py-3 text-[var(--color-intrinsic-muted)]">{spec.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
