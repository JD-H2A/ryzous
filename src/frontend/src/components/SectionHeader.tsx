import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "neon" | "cyan" | "purple";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  accent = "neon",
  align = "center",
  className,
}: SectionHeaderProps) {
  const accentLine = {
    neon: "from-primary to-transparent via-primary/60",
    cyan: "from-accent to-transparent via-accent/60",
    purple: "from-destructive to-transparent via-destructive/60",
  }[accent];

  return (
    <div
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground",
          "uppercase leading-tight",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "mt-3 h-0.5 w-24 bg-gradient-to-r",
          accentLine,
          align === "center" ? "mx-auto" : "ml-0",
        )}
      />
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed text-base md:text-lg mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
