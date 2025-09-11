"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit3, Code } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

type ViewMode = "edit" | "preview" | "split";

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
  className = "",
}: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("edit");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById(
      "markdown-editor"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const markdownButtons = [
    { label: "Bold", before: "**", after: "**", icon: "B" },
    { label: "Italic", before: "*", after: "*", icon: "I" },
    { label: "Link", before: "[", after: "](url)", icon: "🔗" },
    { label: "Code", before: "`", after: "`", icon: "<>" },
    { label: "Code Block", before: "```\n", after: "\n```", icon: "```" },
    { label: "Quote", before: "> ", after: "", icon: "❝" },
    { label: "List", before: "- ", after: "", icon: "•" },
    { label: "Header", before: "## ", after: "", icon: "H" },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant={viewMode === "edit" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("edit")}
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            type="button"
            variant={viewMode === "preview" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            type="button"
            variant={viewMode === "split" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("split")}
          >
            <Code className="w-4 h-4 mr-1" />
            Split
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap items-center gap-1">
          {markdownButtons.map((button) => (
            <Button
              key={button.label}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown(button.before, button.after)}
              title={button.label}
              className="h-8 w-8 p-0"
            >
              {button.icon}
            </Button>
          ))}
        </div>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: viewMode === "split" ? "1fr 1fr" : "1fr",
        }}
      >
        {(viewMode === "edit" || viewMode === "split") && (
          <Card className="p-0 overflow-hidden">
            <textarea
              id="markdown-editor"
              value={value}
              onChange={handleTextareaChange}
              placeholder={placeholder}
              className="w-full h-96 p-4 border-0 resize-none focus:outline-none bg-transparent font-mono text-sm leading-relaxed"
              style={{ minHeight: "400px" }}
            />
          </Card>
        )}

        {(viewMode === "preview" || viewMode === "split") && (
          <Card className="p-4 overflow-auto">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {value ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code: ({ className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match;
                      return !isInline ? (
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code
                          className="bg-muted px-1 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-4 text-foreground">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mb-3 text-foreground">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium mb-2 text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-foreground">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-foreground">{children}</li>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-border rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-border px-4 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {value}
                </ReactMarkdown>
              ) : (
                <div className="text-muted-foreground italic">
                  {placeholder}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        <p>
          <strong>Markdown Tips:</strong> Use **text** for bold, *text* for
          italic, [link](url) for links, `code` for inline code, and ``` for
          code blocks.
        </p>
      </div>
    </div>
  );
}
