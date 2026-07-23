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

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <div
          className="inline-flex rounded-md border border-border bg-paper p-0.5"
          role="tablist"
          aria-label="Editor mode"
        >
          {(
            [
              { mode: "edit", label: "Edit", icon: Edit02Icon },
              { mode: "preview", label: "Preview", icon: ViewIcon },
              { mode: "split", label: "Split", icon: CodeIcon },
            ] as const
          ).map(({ mode, label, icon }) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={viewMode === mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium leading-none transition-colors",
                viewMode === mode
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon icon={icon} size={14} />
              {label}
            </button>
          ))}
        </div>

        {(viewMode === "edit" || viewMode === "split") && (
          <>
            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <div className="flex flex-wrap items-center gap-0.5">
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
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Icon icon={action.icon} size={15} />
                </Button>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className={cn(
          "grid gap-4",
          viewMode === "split" && "lg:grid-cols-2"
        )}
      >
        {(viewMode === "edit" || viewMode === "split") && (
          <div className="overflow-hidden rounded-md border border-border bg-paper">
            <textarea
              ref={textareaRef}
              id="markdown-editor"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-[28rem] w-full resize-y bg-transparent p-4 font-mono text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
              spellCheck
            />
          </div>
        )}

        {(viewMode === "preview" || viewMode === "split") && (
          <div
            key={viewMode}
            className="min-h-[28rem] overflow-auto rounded-md border border-border bg-paper p-4 sm:p-6"
          >
            {value ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-sm italic text-muted-foreground">
                {placeholder}
              </p>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Markdown supported: headings, lists, tables, task lists, fenced code,
        images, and links.
      </p>
    </div>
  );
}
