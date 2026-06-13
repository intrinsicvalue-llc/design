import type { AdrRecord } from "./changelog-types";

/** Parse adr/DESIGN_ADR.md into structured records for the reference site. */
export function parseAdrs(markdown: string): AdrRecord[] {
  const blocks = markdown.split(/^## ADR-/m).slice(1);

  return blocks.map((block) => {
    const lines = block.trim().split("\n");
    const header = lines[0] ?? "";
    const body = lines.slice(1).join("\n");

    const headerMatch = header.match(/^(\d+)\s*—\s*(.+?)\s*\((\d{4}(?:-\d{2})?)\)/);
    const id = headerMatch ? `ADR-${headerMatch[1].padStart(3, "0")}` : "ADR-???";
    const title = headerMatch?.[2]?.trim() ?? header;
    const date = headerMatch?.[3] ?? "";

    const field = (name: string) => {
      const match = body.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*(.+?)(?=\\n\\*\\*|\\n---|$)`, "s"));
      return match?.[1]?.trim().replace(/\s+/g, " ") ?? "";
    };

    return {
      id,
      title,
      date,
      decision: field("Decision"),
      context: field("Context"),
      consequence: field("Consequence"),
    };
  });
}
