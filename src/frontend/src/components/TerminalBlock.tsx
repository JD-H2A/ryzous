import { cn } from "@/lib/utils";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

interface TerminalBlockProps {
  code: string;
  label?: string;
  variant?: "default" | "attack" | "fix";
  className?: string;
}

export function TerminalBlock({
  code,
  label,
  variant = "default",
  className,
}: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const headerColor = {
    default: "bg-muted/50 border-border/50",
    attack: "bg-destructive/10 border-destructive/30",
    fix: "bg-primary/10 border-primary/30",
  }[variant];

  const borderColor = {
    default: "border-border/40",
    attack: "border-destructive/30",
    fix: "border-primary/30",
  }[variant];

  const dotColors = {
    default: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
    attack: ["bg-destructive/80", "bg-destructive/50", "bg-destructive/30"],
    fix: ["bg-primary/80", "bg-primary/50", "bg-primary/30"],
  }[variant];

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border font-mono text-sm",
        borderColor,
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 border-b",
          headerColor,
          borderColor,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {dotColors.map((dot) => (
              <div key={dot} className={cn("w-3 h-3 rounded-full", dot)} />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Terminal className="w-3 h-3" />
            <span>{label ?? "terminal"}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <div className="p-4 bg-background/80 overflow-x-auto">
        <pre
          className={cn(
            "text-xs leading-relaxed whitespace-pre",
            variant === "attack" && "text-destructive/90",
            variant === "fix" && "text-primary/90",
            variant === "default" && "text-foreground/80",
          )}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
