"use client";

import { useSyncExternalStore } from "react";
import {
  formatBackfillLabel,
  formatLocalizedInstant,
  parseReleasedAt,
} from "@/lib/format-release-time";

function subscribe() {
  return () => {};
}

function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function ReleaseTimestamp({ releasedAt }: { releasedAt: string }) {
  const isClient = useIsClient();
  const { dateTime, utc, precision } = parseReleasedAt(releasedAt);

  if (precision !== "instant") {
    return (
      <time
        dateTime={dateTime}
        className="mt-3 block font-mono text-[13px] tabular-nums text-[var(--color-intrinsic-muted)] sm:text-[14px]"
      >
        {formatBackfillLabel(releasedAt, precision)}
      </time>
    );
  }

  const localized = isClient ? formatLocalizedInstant(utc) : null;

  return (
    <div className="mt-3 space-y-1">
      {localized ? (
        <time
          dateTime={dateTime}
          title={utc}
          className="block text-[14px] tabular-nums text-[var(--color-intrinsic-fg)] sm:text-[15px]"
        >
          {localized}
        </time>
      ) : null}
      <p className="font-mono text-[12px] tabular-nums text-[var(--color-intrinsic-muted)] sm:text-[13px]">
        {utc}
        <span className="ml-2 text-[11px] uppercase tracking-wide">UTC</span>
      </p>
    </div>
  );
}
