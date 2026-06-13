import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ source }: { source: string }) {
  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-sem prose-a:text-[var(--color-intrinsic-accent)] prose-code:rounded prose-code:bg-[var(--color-intrinsic-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </article>
  );
}
