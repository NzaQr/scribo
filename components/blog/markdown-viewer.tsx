import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code
              className="bg-muted px-2 py-1 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6">
            {children}
          </blockquote>
        ),
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-6 mt-8 text-foreground">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-4 mt-6 text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mb-3 mt-5 text-foreground">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-6 leading-relaxed text-foreground">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-6 space-y-2">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-foreground">{children}</li>,
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-primary hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-border rounded-lg">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border px-4 py-3 bg-muted font-semibold text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-3">{children}</td>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-lg shadow-md my-6 max-w-full h-auto"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
