"use client";

import { KeystoneAdminSpecimen } from "@/components/KeystoneAdminSpecimen";
import type { Theme } from "@/lib/design-types";
import { cssVarsForTheme } from "@/lib/design-types";

export function ThemePreview({
  theme,
  mode = "light",
}: {
  theme: Theme;
  mode?: "light" | "dark";
}) {
  const p = theme.cssPrefix;
  const vars = cssVarsForTheme(theme, mode);
  const bg = mode === "light" ? "#ffffff" : "#000000";

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--color-intrinsic-line)]"
      style={{ ...vars, background: bg, color: vars[`--color-${p}-fg`] }}
    >
      <div className="border-b px-4 py-3" style={{ borderColor: vars[`--color-${p}-line`] }}>
        <p className="text-[13px] font-semibold" style={{ color: vars[`--color-${p}-fg`] }}>
          {theme.meta.label}
        </p>
        <p className="text-[12px]" style={{ color: vars[`--color-${p}-muted`] }}>
          {theme.meta.surface} · {mode}
        </p>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap gap-2">
          {(["accent", "surface", "fg", "muted", "line"] as const).map((key) => (
            <div key={key} className="text-center">
              <div
                className="h-10 w-10 rounded-lg border"
                style={{
                  background: key === "line" ? bg : vars[`--color-${p}-${key}`],
                  borderColor: vars[`--color-${p}-line`],
                }}
              />
              <span className="mt-1 block font-mono text-[10px] opacity-70">{key}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full rounded-xl px-4 py-2.5 text-[14px] font-semibold text-white"
          style={{ background: vars[`--color-${p}-accent`] }}
        >
          Primary action
        </button>
        <div
          className="rounded-xl border p-3 text-[14px]"
          style={{
            borderColor: vars[`--color-${p}-line`],
            background: vars[`--color-${p}-surface`],
            color: vars[`--color-${p}-muted`],
          }}
        >
          Card surface · secondary copy
        </div>
      </div>
    </div>
  );
}

export function ThemeExplorer({ themes }: { themes: Theme[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {themes.map((theme) => (
        <div key={theme.meta.id} className="space-y-3">
          <h3 className="text-lg font-semibold text-[var(--color-intrinsic-fg)]">{theme.meta.label}</h3>
          <p className="font-mono text-[12px] text-[var(--color-intrinsic-muted)]">{theme.meta.id}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <ThemePreview theme={theme} mode="light" />
            <ThemePreview theme={theme} mode="dark" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PatternSpecimen({ themeId }: { themeId: string }) {
  const specimens: Record<string, React.ReactNode> = {
    "tasteful-app": (
      <div className="rounded-2xl border border-[var(--color-tasteful-line)] bg-white p-4 dark:bg-black">
        <p className="text-[13px] font-semibold text-[var(--color-tasteful-fg)]">Log a meal</p>
        <p className="mt-1 text-[13px] text-[var(--color-tasteful-muted)]">Editor sheet · checkmark save</p>
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-[var(--color-tasteful-accent)] py-2.5 text-[14px] font-semibold text-white"
        >
          Save
        </button>
      </div>
    ),
    keystone: <KeystoneAdminSpecimen />,
  };

  return (
    <div data-theme={themeId} className="theme-specimen">
      {specimens[themeId] ?? (
        <p className="text-[14px] text-[var(--color-intrinsic-muted)]">Specimen coming soon.</p>
      )}
    </div>
  );
}
