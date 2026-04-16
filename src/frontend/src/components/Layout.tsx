import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { ExternalLink, Menu, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Proof", to: "/proof" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

function NavLink({
  to,
  label,
  onClick,
}: { to: string; label: string; onClick?: () => void }) {
  const router = useRouterState();
  const isActive = router.location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      data-ocid={`nav.${label.toLowerCase()}.link`}
      className={cn(
        "relative text-sm font-medium transition-smooth py-1",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-full transition-smooth",
          isActive
            ? "bg-primary shadow-[0_0_6px_oklch(var(--primary)/0.8)] opacity-100"
            : "bg-primary opacity-0",
        )}
      />
    </Link>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 group"
      data-ocid="nav.logo.link"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 group-hover:glow-neon transition-smooth">
        <Shield className="w-4 h-4 text-primary" />
      </div>
      <span className="font-display text-xl font-bold tracking-widest uppercase text-foreground group-hover:text-primary transition-smooth">
        Ryzous
      </span>
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-smooth",
          scrolled
            ? "glass-effect border-b border-border/40 shadow-[0_2px_20px_oklch(0_0_0/0.4)]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact">
              <Button
                size="sm"
                data-ocid="nav.request_test.button"
                className="bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth hover:glow-neon font-medium"
                variant="outline"
              >
                Request Test
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
                data-ocid="nav.mobile_menu.button"
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="glass-effect border-l border-border/40 w-72 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-border/30">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    data-ocid="nav.mobile_close.button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      {...link}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t border-border/30">
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>
                    <Button
                      className="w-full bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                      variant="outline"
                    >
                      Request Test
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-card/80 border-t border-border/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Think Like a Hacker. Defend Like a Pro.
              </p>
              <div className="flex items-center gap-3">
                {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href={`#${s.toLowerCase()}`}
                    aria-label={s}
                    className="w-8 h-8 rounded-lg glass-effect flex items-center justify-center text-muted-foreground hover:text-primary border-glow transition-smooth"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Web Pentesting",
                  "API Security",
                  "Network Testing",
                  "Code Review",
                ].map((s) => (
                  <li
                    key={s}
                    className="hover:text-primary transition-smooth cursor-default"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} Ryzous. All rights reserved.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
