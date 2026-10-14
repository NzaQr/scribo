"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type Highlighter = Awaited<
  ReturnType<typeof import("shiki/core").createHighlighterCore>
>;

let highlighterPromise: Promise<Highlighter> | null = null;

// Shiki loads on demand so that it stays out of the route chunk. The
// JavaScript regex engine replaces the 225 KB (gzip) Oniguruma WASM.
function getHighlighter() {
  highlighterPromise ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/themes"),
  ]).then(
    ([{ createHighlighterCore }, { createJavaScriptRegexEngine }, { bundledThemes }]) =>
      createHighlighterCore({
        engine: createJavaScriptRegexEngine({ forgiving: true }),
        themes: [
          bundledThemes["github-light"],
          bundledThemes["github-dark-dimmed"],
        ],
        langs: [],
      })
  );
  return highlighterPromise;
}

async function highlight(code: string, language: string) {
  const [highlighter, { bundledLanguages }] = await Promise.all([
    getHighlighter(),
    import("shiki/langs"),
  ]);
  const loader =
    language in bundledLanguages
      ? bundledLanguages[language as keyof typeof bundledLanguages]
      : undefined;
  // Each grammar loads only when a post uses it. Unknown languages show as plain text.
  if (loader && !highlighter.getLoadedLanguages().includes(language)) {
    await highlighter.loadLanguage(loader);
  }

  return highlighter.codeToHtml(code, {
    lang: loader ? language : "text",
    themes: {
      light: "github-light",
      dark: "github-dark-dimmed",
    },
    defaultColor: false,
  });
}

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "text",
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    highlight(code, language || "text")
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div
      className={cn(
        "code-block group relative my-7 overflow-hidden rounded-[0.875rem] border border-border bg-paper",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border py-2 pl-4 pr-2">
        <span className="font-mono text-xs text-muted-foreground">
          {language || "text"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-7 items-center gap-1.5 rounded-full bg-muted px-3 font-sans text-xs text-foreground transition-colors hover:bg-border"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          <Icon icon={copied ? Tick02Icon : Copy01Icon} size={14} />
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm leading-relaxed">{code}</code>
        </pre>
      )}
    </div>
  );
}
