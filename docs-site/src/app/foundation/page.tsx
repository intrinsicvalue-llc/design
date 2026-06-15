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
      description="Company-wide tokens — spacing, typography roles, status semantics. Never fork per app."
    >
      <FoundationTokens foundation={foundation} />
    </PageShell>
  );
}
