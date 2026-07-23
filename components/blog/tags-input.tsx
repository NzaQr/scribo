import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TagsInputProps {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagsInput({ id, value, onChange }: TagsInputProps) {
  const [tagInput, setTagInput] = useState("");

  const commitTags = (raw: string) => {
    const tagsArray = raw
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const newTags = tagsArray.filter((tag) => !value.includes(tag));
    if (newTags.length > 0) {
      onChange([...value, ...newTags]);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        Tags
      </label>
      <div className="space-y-3">
        <Input
          id={id}
          type="text"
          placeholder="Add a tag, then press Enter or comma"
          value={tagInput}
          onChange={(e) => {
            const inputValue = e.target.value;
            setTagInput(inputValue);

            if (inputValue.includes(",")) {
              commitTags(inputValue);
              setTagInput("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const trimmedValue = tagInput.trim();
              if (trimmedValue && !value.includes(trimmedValue)) {
                onChange([...value, trimmedValue]);
                setTagInput("");
              }
            }
          }}
        />
        {value.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {value.map((tag) => (
              <li
                key={tag}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-sm border border-border bg-muted px-2 py-1 font-mono text-xs text-foreground"
                )}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onChange(value.filter((t) => t !== tag))}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
