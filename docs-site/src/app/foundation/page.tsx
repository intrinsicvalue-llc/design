import { FoundationTokens } from "@/components/FoundationTokens";
import { PageShell } from "@/components/SiteChrome";
import { getFoundation } from "@/lib/design-data";

export const metadata = { title: "Foundation" };

export default function FoundationPage() {
  const foundation = getFoundation();
  return (
    <PageShell
      current="/foundation"
      title="Foundation"
      description="Company-wide tokens — never fork spacing or status semantics per app."
    >
      <FoundationTokens foundation={foundation} />
    </PageShell>
  );
}
