import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TagsInputProps {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagsInput({ id, value, onChange }: TagsInputProps) {
  const [tagInput, setTagInput] = useState("");

  return (
    <div>
      <label htmlFor="tags" className="block text-sm font-medium mb-2">
        Tags
      </label>
      <div className="space-y-3">
        <Input
          id={id}
          type="text"
          placeholder="Enter tags separated by commas..."
          value={tagInput}
          onChange={(e) => {
            const inputValue = e.target.value;
            setTagInput(inputValue);

            if (inputValue.includes(",")) {
              const tagsArray = inputValue
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);

              const newTags = tagsArray.filter((tag) => !value.includes(tag));
              if (newTags.length > 0) {
                onChange([...value, ...newTags]);
              }

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
          <div className="flex flex-wrap gap-2">
            {value.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    const newTags = value.filter((_, i) => i !== index);
                    onChange(newTags);
                  }}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/20 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
