import { Check } from "lucide-react";

export function MatchReasonList({ reasons }: { reasons: string[] }) {
  return (
    <ul className="space-y-1.5">
      {reasons.map((r, i) => (
        <li key={i} className="flex gap-2 text-sm text-foreground/80">
          <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
}
