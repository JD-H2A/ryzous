import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "neon" | "cyan" | "purple";
  hover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = "none", hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-effect rounded-xl p-6",
          glow === "neon" && "glow-neon border border-primary/30",
          glow === "cyan" && "glow-cyan border border-accent/30",
          glow === "purple" &&
            "border border-destructive/30 shadow-[0_0_20px_oklch(var(--destructive)/0.3)]",
          hover &&
            "transition-smooth hover:border-primary/50 hover:-translate-y-0.5 cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
