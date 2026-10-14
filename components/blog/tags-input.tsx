import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

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
      <div className="flex min-h-[46px] flex-wrap items-center gap-1.5 rounded-md border border-border-strong bg-input px-2.5 py-2 transition-[border-color,box-shadow] focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-wash)]">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-accent-wash py-1 pl-3 pr-1 text-[0.8125rem] font-medium text-accent-deep"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="inline-flex size-[22px] items-center justify-center rounded-full transition-colors hover:bg-accent-deep/10"
              aria-label={`Remove tag ${tag}`}
            >
              <Icon icon={Cancel01Icon} size={12} strokeWidth={2} />
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          placeholder={value.length ? "Add a tag" : "Add a tag, then press Enter"}
          value={tagInput}
          className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none"
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
            } else if (e.key === "Backspace" && !tagInput && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
        />
      </div>
    </div>
  );
}
