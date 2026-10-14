"use client";

import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/blog/markdown-editor";
import { TagsInput } from "@/components/blog/tags-input";

export interface PostFormValues {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

interface PostFormFieldsProps {
  values: PostFormValues;
  onChange: (field: keyof PostFormValues, value: string | string[]) => void;
}

/** Title, summary, body and tags. Shared by the create and edit pages. */
export function PostFormFields({ values, onChange }: PostFormFieldsProps) {
  return (
    <div className="space-y-7">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="A clear, specific title"
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="block w-full border-0 border-b border-border bg-transparent pb-3 font-serif text-[clamp(2rem,1.6rem+1.4vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-foreground placeholder:text-quiet-foreground focus:border-accent focus:outline-none focus-visible:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Summary
        </label>
        <Input
          id="description"
          type="text"
          placeholder="Two lines that tell readers what the post covers"
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
        />
      </div>

      <TagsInput
        id="tags"
        value={values.tags}
        onChange={(value) => onChange("tags", value)}
      />

      <div>
        <label
          htmlFor="markdown-editor"
          className="mb-3 block text-sm font-medium"
        >
          Content
        </label>
        <MarkdownEditor
          value={values.content}
          onChange={(value) => onChange("content", value)}
          placeholder="Write in Markdown…"
        />
      </div>
    </div>
  );
}
