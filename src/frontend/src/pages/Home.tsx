import { GlassCard } from "@/components/GlassCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Bug,
  ChevronRight,
  Code2,
  Globe,
  Search,
  Shield,
  Terminal,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LogEntry {
  id: number;
  time: string;
  message: string;
  severity: "critical" | "warn" | "info" | "success";
}

interface StatItem {
  target: number;
  label: string;
  suffix?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const LOG_POOL: Omit<LogEntry, "id" | "time">[] = [
  {
    message: "XSS attack detected on endpoint /api/v2/search",
    severity: "critical",
  },
  {
    message: "SQL Injection attempt blocked — payload sanitized",
    severity: "critical",
  },
  { message: "Bug patched successfully — CVE-2024-1984", severity: "success" },
  {
    message: "Recon scan initiated on target 192.168.1.0/24",
    severity: "info",
  },
  { message: "Port scan completed — 3 open ports flagged", severity: "warn" },
  {
    message: "CSRF token validation failed — request rejected",
    severity: "critical",
  },
  { message: "Auth bypass attempt detected and logged", severity: "warn" },
  { message: "Vulnerability report generated — 7 findings", severity: "info" },
  { message: "Patch deployed successfully to production", severity: "success" },
  {
    message: "SSRF probe blocked — external call prevented",
    severity: "critical",
  },
];

const SERVICES = [
  {
    icon: Shield,
    title: "Penetration Testing",
    description:
      "Simulate real-world attacks to uncover exploitable weaknesses before malicious actors do.",
    glow: "neon" as const,
    accent: "text-primary",
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description:
      "Comprehensive scans and manual review to identify, classify, and prioritize security risks.",
    glow: "cyan" as const,
    accent: "text-accent",
  },
  {
    icon: Code2,
    title: "Secure Development",
    description:
      "Embed security into your SDLC with code reviews, threat modelling, and secure architecture.",
    glow: "purple" as const,
    accent: "text-destructive",
  },
  {
    icon: Bug,
    title: "Bug Fixing",
    description:
      "Rapid remediation of confirmed vulnerabilities with regression testing and documented patches.",
    glow: "neon" as const,
    accent: "text-primary",
  },
];

const STATS: StatItem[] = [
  { target: 142, label: "Vulnerabilities Found", suffix: "+" },
  { target: 98, label: "Clients Secured", suffix: "+" },
  { target: 99, label: "Patch Success Rate", suffix: "%" },
  { target: 5, label: "Years in Operation", suffix: "+" },
];

const SCAN_OUTPUT = [
  "$ ryzous-scan --target {url} --mode full",
  "",
  "[*] Initializing scan engine v3.2.1...",
  "[*] Resolving hostname...",
  "[+] DNS resolved → 185.220.101.47",
  "[*] Running port discovery (top-1000)...",
  "[+] Open ports: 80/tcp, 443/tcp, 8080/tcp",
  "[*] Fingerprinting web server...",
  "[+] Server: nginx/1.24.0 | TLS: 1.3",
  "[!] WARN: Server version disclosure detected",
  "[*] Crawling application endpoints...",
  "[+] Discovered 47 unique endpoints",
  "[*] Testing for XSS vulnerabilities...",
  "[!] POTENTIAL XSS found at /search?q=",
  "[*] Testing for SQL injection...",
  "[+] No SQLi found (parameterized queries detected)",
  "[*] Checking authentication mechanisms...",
  "[!] WARN: Password reset lacks rate limiting",
  "[*] Scanning for outdated dependencies...",
  "[!] 3 CVEs found in frontend bundle",
  "",
  "[+] Scan complete. Generating report...",
  "[+] Critical: 1  High: 2  Medium: 4  Low: 8",
  ">> Full report exported to report_2026.pdf",
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);
  return count;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScanLineOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(var(--primary)/0.015)_2px,oklch(var(--primary)/0.015)_4px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(var(--primary)/0.08)_0%,transparent_70%)]" />
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(oklch(var(--border)/0.4)_1px,transparent_1px),linear-gradient(90deg,oklch(var(--border)/0.4)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}

function LogLine({ entry }: { entry: LogEntry }) {
  const colors: Record<LogEntry["severity"], string> = {
    critical: "text-destructive",
    warn: "text-yellow-400",
    info: "text-accent",
    success: "text-primary",
  };
  const prefix: Record<LogEntry["severity"], string> = {
    critical: "[ALERT]",
    warn: "[WARN] ",
    info: "[INFO] ",
    success: "[OK]   ",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex gap-3 items-start font-mono text-xs leading-relaxed py-1 border-b border-border/20"
    >
      <span className="text-muted-foreground shrink-0 tabular-nums">
        {entry.time}
      </span>
      <span className={`shrink-0 font-medium ${colors[entry.severity]}`}>
        {prefix[entry.severity]}
      </span>
      <span className="text-foreground/80 min-w-0 break-words">
        {entry.message}
      </span>
    </motion.div>
  );
}

function StatCard({ item }: { item: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(item.target, 1600, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold tabular-nums text-primary drop-shadow-[0_0_12px_oklch(var(--primary)/0.6)]">
        {count}
        <span className="text-accent">{item.suffix}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
        {item.label}
      </div>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  glow,
  accent,
  index,
}: (typeof SERVICES)[number] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <GlassCard
        glow={glow}
        hover
        className="h-full flex flex-col gap-4"
        data-ocid={`services.card.${index + 1}`}
      >
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${accent === "text-primary" ? "bg-primary/10" : accent === "text-accent" ? "bg-accent/10" : "bg-destructive/10"}`}
        >
          <Icon className={`w-6 h-6 ${accent}`} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-auto pt-2">
          <Link to="/services">
            <button
              type="button"
              className={`flex items-center gap-1 text-xs font-medium transition-smooth hover:gap-2 ${accent}`}
            >
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  // Activity feed
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    LOG_POOL.slice(0, 5).map((l, i) => ({
      ...l,
      id: i,
      time: new Date(Date.now() - (5 - i) * 3000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
    })),
  );
  const logCounter = useRef(5);

  useEffect(() => {
    const interval = setInterval(() => {
      const poolEntry = LOG_POOL[logCounter.current % LOG_POOL.length];
      const newEntry: LogEntry = {
        ...poolEntry,
        id: logCounter.current,
        time: new Date().toLocaleTimeString("en-US", { hour12: false }),
      };
      logCounter.current += 1;
      setLogs((prev) => [newEntry, ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scan demo
  const [scanUrl, setScanUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanLines, setScanLines] = useState<string[]>([]);
  const [scanDone, setScanDone] = useState(false);
  const scanRef = useRef<HTMLDivElement>(null);

  const runScan = useCallback(() => {
    if (!scanUrl.trim() || scanning) return;
    setScanLines([]);
    setScanDone(false);
    setScanning(true);
    const lines = SCAN_OUTPUT.map((l) => l.replace("{url}", scanUrl.trim()));
    lines.forEach((line, i) => {
      setTimeout(() => {
        setScanLines((prev) => [...prev, line]);
        if (i === lines.length - 1) {
          setScanning(false);
          setScanDone(true);
        }
        if (scanRef.current) {
          scanRef.current.scrollTop = scanRef.current.scrollHeight;
        }
      }, i * 90);
    });
  }, [scanUrl, scanning]);

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-cyber-network.dim_1600x900.jpg')",
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95" />
        <ScanLineOverlay />
        <GridBackground />

        {/* Corner accents */}
        <div className="absolute top-24 left-8 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-lg opacity-60" />
        <div className="absolute bottom-16 right-8 w-32 h-32 border-b-2 border-r-2 border-accent/30 rounded-br-lg opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Tag line badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <Badge className="border-primary/40 bg-primary/10 text-primary px-4 py-1.5 font-mono text-xs tracking-widest">
              <Activity className="w-3 h-3 mr-1.5 animate-pulse" />
              LIVE THREAT MONITORING
            </Badge>
          </motion.div>

          {/* Hero title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6"
          >
            <span className="block text-foreground">Ryzous</span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_oklch(var(--primary)/0.5)]">
              Securing the
            </span>
            <span className="block text-foreground/90">Digital Future</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We find vulnerabilities before hackers do.{" "}
            <span className="text-foreground/70">
              Think Like a Hacker. Defend Like a Pro.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/dashboard">
              <Button
                size="lg"
                className="glow-neon bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold px-8 py-3 text-base tracking-wide transition-smooth"
                data-ocid="hero.open_dashboard_button"
              >
                Open Dashboard <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="glass-effect border-accent/40 text-accent hover:border-accent/70 hover:bg-accent/10 font-display font-bold px-8 py-3 text-base tracking-wide transition-smooth"
                data-ocid="hero.request_test_button"
              >
                Request Test <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground"
        >
          <span className="text-xs font-mono uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── Stats Ticker ────────────────────────────────────────── */}
      <section
        className="relative py-12 bg-card border-y border-border/30 overflow-hidden"
        data-ocid="stats.section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((s) => (
              <StatCard key={s.label} item={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Activity Feed ──────────────────────────────────── */}
      <section
        className="py-20 px-4 bg-background"
        data-ocid="activity.section"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title="Live Threat Activity"
              subtitle="Real-time monitoring feed — threats detected, blocked, and patched as they happen."
              accent="neon"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GlassCard className="overflow-hidden p-0">
              {/* Terminal header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono ml-2">
                  <Terminal className="w-3 h-3" />
                  <span>ryzous-monitor — live feed</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs font-mono text-primary animate-pulse">
                    ● LIVE
                  </span>
                </div>
              </div>
              {/* Log entries */}
              <div className="p-4 space-y-0 min-h-[240px]">
                {logs.map((entry) => (
                  <LogLine key={entry.id} entry={entry} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-muted/20" data-ocid="services.section">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title="Our Services"
              subtitle="Comprehensive cybersecurity solutions built for modern threat landscapes."
              accent="cyan"
            />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Scan My Website Demo ────────────────────────────────── */}
      <section className="py-20 px-4 bg-background" data-ocid="scan.section">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title="Scan My Website"
              subtitle="Enter a URL to see a simulated security scan — a taste of what Ryzous delivers."
              accent="purple"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GlassCard glow="purple">
              {/* URL Input row */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 flex items-center gap-2 bg-background/60 border border-border/50 rounded-lg px-4 py-2.5 focus-within:border-accent/60 transition-smooth">
                  <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runScan()}
                    placeholder="https://example.com"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
                    data-ocid="scan.input"
                    disabled={scanning}
                  />
                </div>
                <Button
                  onClick={runScan}
                  disabled={scanning || !scanUrl.trim()}
                  className="glow-neon bg-primary text-primary-foreground font-display font-bold px-6 transition-smooth disabled:opacity-50"
                  data-ocid="scan.submit_button"
                >
                  {scanning ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />{" "}
                      Scanning…
                    </span>
                  ) : (
                    "Scan"
                  )}
                </Button>
              </div>

              {/* Terminal output */}
              {(scanLines.length > 0 || scanning) && (
                <div
                  ref={scanRef}
                  className="rounded-lg border border-border/40 bg-background/80 p-4 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto scroll-smooth"
                  data-ocid="scan.output"
                >
                  {scanLines.map((line, lineIndex) => {
                    const lineKey = `scan-line-${lineIndex}`;
                    const cls = line.startsWith("[!]")
                      ? "text-yellow-400"
                      : line.startsWith("[ALERT]") || line.includes("CRITICAL")
                        ? "text-destructive"
                        : line.startsWith("[+]") || line.startsWith(">>")
                          ? "text-primary"
                          : line.startsWith("$")
                            ? "text-accent"
                            : "text-foreground/70";
                    return (
                      <div key={lineKey} className={cls}>
                        {line || "\u00A0"}
                      </div>
                    );
                  })}
                  {scanning && (
                    <span className="text-primary animate-pulse">█</span>
                  )}
                </div>
              )}

              {scanDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center justify-between"
                >
                  <p className="text-xs text-muted-foreground font-mono">
                    Demo scan complete. Real scans reveal deeper findings.
                  </p>
                  <Link to="/contact">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/40 text-primary hover:bg-primary/10 text-xs"
                      data-ocid="scan.request_full_button"
                    >
                      Request Full Scan{" "}
                      <ArrowUpRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────── */}
      <section
        className="py-20 px-4 bg-muted/20 border-t border-border/20"
        data-ocid="cta.section"
      >
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow="neon" className="py-14">
              <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-4">
                Ready to{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Secure Your Systems?
                </span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                Join 98+ companies that trust Ryzous to protect their
                infrastructure. Start with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="glow-neon bg-primary text-primary-foreground font-display font-bold px-8 transition-smooth"
                    data-ocid="cta.contact_button"
                  >
                    Get Free Consultation
                  </Button>
                </Link>
                <Link to="/proof">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/60 text-foreground hover:border-accent/50 hover:text-accent font-display transition-smooth"
                    data-ocid="cta.proof_button"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
