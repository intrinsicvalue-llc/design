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

  if (!isClient) {
    return (
      <p
        className="mt-3 text-[14px] tabular-nums text-[var(--color-intrinsic-muted)] sm:text-[15px]"
        aria-hidden
      >
        …
      </p>
    );
  }

  let localized: string;
  try {
    localized = formatLocalizedInstant(utc);
  } catch {
    localized = utc;
  }

  return (
    <time
      dateTime={dateTime}
      title={utc}
      className="mt-3 block w-fit cursor-default text-[14px] tabular-nums text-[var(--color-intrinsic-muted)] underline decoration-dotted decoration-[var(--color-intrinsic-line)] underline-offset-[3px] sm:text-[15px]"
    >
      {localized}
    </time>
  );
}
