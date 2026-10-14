"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { cn } from "@/lib/utils";
import {
  CodeIcon,
  Edit02Icon,
  Heading02Icon,
  LeftToRightListBulletIcon,
  Link01Icon,
  QuoteDownIcon,
  SourceCodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

type ViewMode = "edit" | "preview" | "split";

interface ToolbarAction {
  label: string;
  before: string;
  after?: string;
  icon: typeof TextBoldIcon;
}

const toolbarActions: ToolbarAction[] = [
  { label: "Bold", before: "**", after: "**", icon: TextBoldIcon },
  { label: "Italic", before: "*", after: "*", icon: TextItalicIcon },
  { label: "Link", before: "[", after: "](url)", icon: Link01Icon },
  { label: "Inline code", before: "`", after: "`", icon: SourceCodeIcon },
  {
    label: "Code block",
    before: "```ts\n",
    after: "\n```",
    icon: CodeIcon,
  },
  { label: "Quote", before: "> ", after: "", icon: QuoteDownIcon },
  {
    label: "List",
    before: "- ",
    after: "",
    icon: LeftToRightListBulletIcon,
  },
  { label: "Heading", before: "## ", after: "", icon: Heading02Icon },
];

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
  className = "",
}: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
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

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    });
  };

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  const showEditor = viewMode === "edit" || viewMode === "split";

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-full bg-muted p-[3px]"
          role="tablist"
          aria-label="Editor view"
        >
          {(
            [
              { mode: "edit", label: "Write", icon: Edit02Icon },
              { mode: "split", label: "Split", icon: CodeIcon },
              { mode: "preview", label: "Preview", icon: ViewIcon },
            ] as const
          ).map(({ mode, label, icon }) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={viewMode === mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] font-medium leading-none transition-colors",
                viewMode === mode
                  ? "bg-paper text-foreground shadow-[var(--shadow-sm)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon icon={icon} size={14} />
              {label}
            </button>
          ))}
        </div>
        <p className="meta-label">
          {words} {words === 1 ? "word" : "words"} · {minutes} min read
        </p>
      </div>

      <div
        className={cn("grid gap-4", viewMode === "split" && "lg:grid-cols-2")}
      >
        {showEditor && (
          <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-paper transition-[border-color,box-shadow] focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-wash)]">
            <div
              role="toolbar"
              aria-label="Formatting"
              className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5"
            >
              {toolbarActions.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    insertMarkdown(action.before, action.after || "")
                  }
                  title={action.label}
                  aria-label={action.label}
                  className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <Icon icon={action.icon} size={16} />
                </Button>
              ))}
              <span className="meta-label ml-auto pr-2">Markdown</span>
            </div>
            <textarea
              ref={textareaRef}
              id="markdown-editor"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-[28rem] w-full flex-1 resize-y bg-transparent px-5 py-5 font-mono text-sm leading-[1.75] text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none"
              spellCheck
            />
          </div>
        )}

        {(viewMode === "preview" || viewMode === "split") && (
          <section
            key={viewMode}
            aria-label="Preview"
            className="min-h-[28rem] overflow-auto rounded-lg border border-border bg-paper p-[clamp(1.5rem,3vw,3rem)]"
          >
            {value ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-sm text-muted-foreground">
                The preview shows here when you start to write.
              </p>
            )}
          </section>
        )}
      </div>

      <p className="text-[0.8125rem] text-muted-foreground">
        You can use headings, lists, tables, task lists, code blocks, images
        and links.
      </p>
    </div>
  );
}
