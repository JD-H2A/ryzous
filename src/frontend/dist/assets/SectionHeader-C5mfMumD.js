import { r as reactExports, j as jsxRuntimeExports, e as cn } from "./index-C_2TD7nS.js";
const GlassCard = reactExports.forwardRef(
  ({ className, glow = "none", hover = false, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "glass-effect rounded-xl p-6",
          glow === "neon" && "glow-neon border border-primary/30",
          glow === "cyan" && "glow-cyan border border-accent/30",
          glow === "purple" && "border border-destructive/30 shadow-[0_0_20px_oklch(var(--destructive)/0.3)]",
          hover && "transition-smooth hover:border-primary/50 hover:-translate-y-0.5 cursor-pointer",
          className
        ),
        ...props,
        children
      }
    );
  }
);
GlassCard.displayName = "GlassCard";
function SectionHeader({
  title,
  subtitle,
  accent = "neon",
  align = "center",
  className
}) {
  const accentLine = {
    neon: "from-primary to-transparent via-primary/60",
    cyan: "from-accent to-transparent via-accent/60",
    purple: "from-destructive to-transparent via-destructive/60"
  }[accent];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("mb-12", align === "center" && "text-center", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: cn(
              "font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground",
              "uppercase leading-tight"
            ),
            children: title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "mt-3 h-0.5 w-24 bg-gradient-to-r",
              accentLine,
              align === "center" ? "mx-auto" : "ml-0"
            )
          }
        ),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-2xl leading-relaxed text-base md:text-lg mx-auto", children: subtitle })
      ]
    }
  );
}
export {
  GlassCard as G,
  SectionHeader as S
};
