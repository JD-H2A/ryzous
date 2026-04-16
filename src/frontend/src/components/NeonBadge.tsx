import { cn } from "@/lib/utils";
import type { SeverityLevel, StatusType } from "../types";

type BadgeVariant = "severity" | "status" | "category";

interface NeonBadgeProps {
  label: string;
  variant?: BadgeVariant;
  severity?: SeverityLevel;
  status?: StatusType;
  className?: string;
}

const severityStyles: Record<SeverityLevel, string> = {
  Critical:
    "bg-destructive/20 text-destructive border-destructive/50 shadow-[0_0_8px_oklch(var(--destructive)/0.4)]",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_8px_rgba(249,115,22,0.3)]",
  Medium:
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-[0_0_8px_rgba(234,179,8,0.3)]",
  Low: "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_oklch(var(--primary)/0.3)]",
};

const statusStyles: Record<StatusType, string> = {
  Fixed:
    "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_oklch(var(--primary)/0.4)]",
  InProgress:
    "bg-accent/20 text-accent border-accent/50 shadow-[0_0_8px_oklch(var(--accent)/0.3)]",
};

export function NeonBadge({
  label,
  variant = "category",
  severity,
  status,
  className,
}: NeonBadgeProps) {
  let styles = "bg-muted/50 text-muted-foreground border-border/50";

  if (variant === "severity" && severity) {
    styles = severityStyles[severity];
  } else if (variant === "status" && status) {
    styles = statusStyles[status];
  } else if (variant === "category") {
    styles = "bg-accent/10 text-accent border-accent/40";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-smooth",
        styles,
        className,
      )}
    >
      {label}
    </span>
  );
}
