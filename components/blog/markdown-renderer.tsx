"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { CodeBlock } from "@/components/blog/code-block";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ["className"]],
    span: [...(defaultSchema.attributes?.span || []), ["className"]],
    pre: [...(defaultSchema.attributes?.pre || []), ["className"]],
    input: [
      ...(defaultSchema.attributes?.input || []),
      ["type"],
      ["checked"],
      ["disabled"],
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "input",
  ],
};

const components: Components = {
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const text = String(children).replace(/\n$/, "");
    const isBlock = Boolean(match) || text.includes("\n");

    if (isBlock) {
      return <CodeBlock code={text} language={match?.[1] || "text"} />;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ""} loading="lazy" />
  ),
  table: ({ children }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/** Shared markdown pipeline for published posts and editor preview. */
export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={cn("prose-scribo animate-preview-swap", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
