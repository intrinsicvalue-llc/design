import Link from "next/link";
import { PageShell } from "@/components/SiteChrome";
import { VOICE_DOCS } from "@/lib/design-data";

export const metadata = { title: "Voice" };

export default function VoiceIndexPage() {
  return (
    <PageShell
      current="/voice"
      title="Voice & copy"
      description="Language is part of the design system. Same entity names on screen, in Keystone, and in Siri."
    >
      <div className="grid gap-4">
        {VOICE_DOCS.map((v) => (
          <Link
            key={v.slug}
            href={`/voice/${v.slug}`}
            className="rounded-2xl border border-[var(--color-intrinsic-line)] p-6 transition-colors hover:border-[var(--color-intrinsic-accent)]"
          >
            <h2 className="text-lg font-semibold text-[var(--color-intrinsic-fg)]">{v.title}</h2>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
