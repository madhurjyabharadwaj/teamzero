import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  as?: "div" | "section" | "article";
};

export const GlassCard = React.forwardRef<HTMLDivElement, Props>(
  ({ className, hover = true, as: Tag = "div", ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          "glass rounded-[var(--radius)] text-card-foreground",
          hover && "glass-hover",
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = "GlassCard";