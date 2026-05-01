import { useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { value: string[]; onChange: (next: string[]) => void; placeholder?: string; suggestions?: string[]; id?: string };

export function TagInput({ value, onChange, placeholder, suggestions = [], id }: Props) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const v = raw.trim();
    if (!v) return;
    if (value.some((x) => x.toLowerCase() === v.toLowerCase())) return;
    onChange([...value, v]);
    setDraft("");
  };
  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(draft); }
    else if (e.key === "Backspace" && !draft && value.length > 0) remove(value.length - 1);
  };
  const filtered = suggestions
    .filter((s) => !value.some((v) => v.toLowerCase() === s.toLowerCase()))
    .filter((s) => (draft ? s.toLowerCase().includes(draft.toLowerCase()) : true))
    .slice(0, 6);
  return (
    <div className="space-y-2">
      <div className={cn("min-h-11 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 flex flex-wrap gap-1.5 items-center focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/40 transition-colors")}>
        {value.map((tag, i) => (
          <Badge key={`${tag}-${i}`} variant="secondary" className="gap-1 font-medium bg-primary/15 text-primary border border-primary/30">
            {tag}
            <button type="button" onClick={() => remove(i)} className="ml-0.5 rounded hover:bg-foreground/10 p-0.5" aria-label={`Remove ${tag}`}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input id={id} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKeyDown} onBlur={() => draft && add(draft)} placeholder={value.length === 0 ? placeholder : ""} className="flex-1 min-w-[120px] border-0 px-1 h-7 shadow-none focus-visible:ring-0 bg-transparent" />
      </div>
      {filtered.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filtered.map((s) => (
            <button key={s} type="button" onClick={() => add(s)} className="text-xs text-muted-foreground hover:text-primary px-2 py-0.5 rounded-full border border-dashed border-white/15 hover:border-primary/50 hover:bg-primary/5 transition-colors">
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
