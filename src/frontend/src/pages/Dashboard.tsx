import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Bug,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  KeyRound,
  Lock,
  Scan,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard } from "../components/GlassCard";
import { SectionHeader } from "../components/SectionHeader";
import { useDashboardStats } from "../hooks/useBackend";

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * ease));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);
  return count;
}

// ─── Static chart data ────────────────────────────────────────────────────────
const vulnByCategory = [
  { name: "XSS", count: 42 },
  { name: "SQLi", count: 31 },
  { name: "RCE", count: 18 },
  { name: "CSRF", count: 24 },
  { name: "IDOR", count: 27 },
  { name: "XXE", count: 11 },
  { name: "SSRF", count: 14 },
];

const monthlyScoreTrend = [
  { month: "Jan", score: 61 },
  { month: "Feb", score: 64 },
  { month: "Mar", score: 67 },
  { month: "Apr", score: 66 },
  { month: "May", score: 71 },
  { month: "Jun", score: 74 },
  { month: "Jul", score: 78 },
  { month: "Aug", score: 77 },
  { month: "Sep", score: 82 },
  { month: "Oct", score: 85 },
  { month: "Nov", score: 88 },
  { month: "Dec", score: 92 },
];

const processSteps = [
  { id: "recon", label: "Recon", Icon: Target, active: false },
  { id: "scan", label: "Scan", Icon: Scan, active: false },
  { id: "exploit", label: "Exploit", Icon: Zap, active: true },
  { id: "report", label: "Report", Icon: FileText, active: false },
  { id: "fix", label: "Fix", Icon: Wrench, active: false },
];

const workflowSteps = [
  { label: "Identify Issue", Icon: Bug, status: "done" },
  { label: "Analyze Impact", Icon: TrendingUp, status: "done" },
  { label: "Patch Securely", Icon: Wrench, status: "active" },
  { label: "Retest", Icon: Scan, status: "idle" },
  { label: "Deploy", Icon: CheckCircle2, status: "idle" },
] as const;

const accordionPanels = [
  {
    id: "validation",
    title: "Input Validation",
    Icon: ShieldCheck,
    color: "neon" as const,
    content:
      "All user-supplied data must be validated server-side regardless of client-side checks. Use allowlists over denylists, enforce strict type checking, limit field lengths, and apply context-aware encoding. Never trust the raw input pipeline.",
  },
  {
    id: "auth",
    title: "Authentication Security",
    Icon: KeyRound,
    color: "cyan" as const,
    content:
      "Implement short-lived JWTs with RS256 signing, rotate refresh tokens on every use, and store tokens in httpOnly cookies — never localStorage. Enforce MFA for privileged accounts, rate-limit login endpoints, lock accounts after 5 failed attempts.",
  },
  {
    id: "encryption",
    title: "Encryption Methods",
    Icon: Lock,
    color: "purple" as const,
    content:
      "Use AES-256-GCM for symmetric encryption of sensitive data at rest. Enforce TLS 1.3 in transit; disable older cipher suites. Hash passwords with Argon2id. Never roll your own crypto — use audited libraries such as libsodium or Web Crypto API.",
  },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  glow,
  isLoading,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  glow: "neon" | "cyan" | "purple";
  isLoading: boolean;
}) {
  const counted = useCountUp(isLoading ? 0 : value);
  return (
    <GlassCard glow={glow} hover className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      {isLoading ? (
        <Skeleton className="h-10 w-24" />
      ) : (
        <span className="font-display text-4xl font-bold tracking-tight text-foreground">
          {counted}
        </span>
      )}
    </GlassCard>
  );
}

// ─── Security Score Card ──────────────────────────────────────────────────────
function SecurityScoreCard({
  score,
  isLoading,
}: { score: number; isLoading: boolean }) {
  const counted = useCountUp(isLoading ? 0 : score);
  return (
    <GlassCard glow="neon" hover className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Security Score
        </span>
        <Shield className="w-4 h-4 text-muted-foreground" />
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-2 w-full rounded-full" />
        </>
      ) : (
        <>
          <span className="font-display text-4xl font-bold tracking-tight text-primary">
            {counted}%
          </span>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-primary rounded-full"
              style={{ boxShadow: "0 0 10px oklch(var(--primary) / 0.8)" }}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.6, ease: [0.33, 1, 0.68, 1] }}
            />
          </div>
        </>
      )}
    </GlassCard>
  );
}

// ─── Process Flow ─────────────────────────────────────────────────────────────
function ProcessFlow() {
  return (
    <section className="py-14 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Attack Process Flow"
          subtitle="Our structured methodology for every engagement — from initial recon to final fix."
          accent="cyan"
        />
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-center">
          {processSteps.map((step, i) => (
            <div
              key={step.id}
              className="flex flex-col md:flex-row items-center gap-2 md:gap-0"
            >
              <motion.div
                data-ocid={`process.step.${i + 1}`}
                whileHover={{ scale: 1.05 }}
                className={[
                  "relative flex flex-col items-center gap-2 px-5 py-4 rounded-xl border transition-smooth",
                  step.active
                    ? "border-accent/60 bg-accent/10 glow-cyan"
                    : "border-border/40 bg-card/40",
                ].join(" ")}
              >
                <step.Icon
                  className={[
                    "w-5 h-5",
                    step.active ? "text-accent" : "text-muted-foreground",
                  ].join(" ")}
                />
                <span
                  className={[
                    "font-display font-semibold text-sm uppercase tracking-wide",
                    step.active ? "text-accent" : "text-foreground/70",
                  ].join(" ")}
                >
                  {step.label}
                </span>
                {step.active && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-ping" />
                )}
              </motion.div>
              {i < processSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 rotate-90 md:rotate-0 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Workflow Timeline ────────────────────────────────────────────────────────
function WorkflowTimeline() {
  return (
    <div className="flex flex-col gap-0 relative">
      <div className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-border/40" />
      {workflowSteps.map((step, i) => (
        <motion.div
          key={step.label}
          data-ocid={`workflow.step.${i + 1}`}
          className="flex items-start gap-4 relative pb-6 last:pb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div
            className={[
              "relative z-10 flex items-center justify-center w-9 h-9 rounded-full border shrink-0",
              step.status === "done" ? "border-primary/60 bg-primary/15" : "",
              step.status === "active" ? "border-accent/60 bg-accent/10" : "",
              step.status === "idle" ? "border-border/40 bg-muted/30" : "",
            ].join(" ")}
          >
            {step.status === "done" && (
              <CheckCircle className="w-4 h-4 text-primary" />
            )}
            {step.status === "active" && (
              <>
                <span className="absolute w-full h-full rounded-full bg-accent/20 animate-ping" />
                <Circle className="w-4 h-4 text-accent fill-accent" />
              </>
            )}
            {step.status === "idle" && (
              <Circle className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <div className="pt-1 flex items-center gap-2">
            <span
              className={[
                "font-display font-semibold text-sm uppercase tracking-wide",
                step.status === "done" ? "text-primary" : "",
                step.status === "active" ? "text-accent" : "",
                step.status === "idle" ? "text-muted-foreground" : "",
              ].join(" ")}
            >
              {step.label}
            </span>
            <step.Icon className="w-3 h-3 opacity-50" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function SecureDevAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {accordionPanels.map((panel) => {
        const isOpen = open === panel.id;
        return (
          <GlassCard
            key={panel.id}
            glow={panel.color}
            className="p-0 overflow-hidden"
          >
            <button
              type="button"
              data-ocid={`accordion.${panel.id}.toggle`}
              onClick={() => setOpen(isOpen ? null : panel.id)}
              className="w-full flex items-center justify-between p-5 text-left transition-smooth hover:bg-muted/20"
            >
              <div className="flex items-center gap-3">
                <panel.Icon
                  className={[
                    "w-5 h-5",
                    panel.color === "neon" ? "text-primary" : "",
                    panel.color === "cyan" ? "text-accent" : "",
                    panel.color === "purple" ? "text-destructive" : "",
                  ].join(" ")}
                />
                <span className="font-display font-semibold text-foreground">
                  {panel.title}
                </span>
              </div>
              <ChevronDown
                className={[
                  "w-4 h-4 text-muted-foreground transition-transform duration-300",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm font-mono">
                    {panel.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        );
      })}
    </div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-effect rounded-lg px-3 py-2 border border-border/40 text-xs font-mono">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="text-primary font-bold">{payload[0].value}</p>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  const totalProjects = Number(stats?.totalProjects ?? 47n);
  const vulnerabilitiesFound = Number(stats?.vulnerabilitiesFound ?? 183n);
  const bugsFixed = Number(stats?.bugsFixed ?? 171n);
  const securityScore = Number(stats?.securityScore ?? 92n);

  return (
    <div data-ocid="dashboard.page">
      {/* ── Page Header ── */}
      <section className="py-14 px-6 bg-card border-b border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Live Operations
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
              Security Dashboard
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Real-time overview of your security posture, active engagements,
              and remediation progress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Cards ── */}
      <section
        className="py-12 px-6 bg-background"
        data-ocid="dashboard.stats.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: "Total Projects",
                value: totalProjects,
                icon: Shield,
                glow: "cyan" as const,
              },
              {
                label: "Vulnerabilities Found",
                value: vulnerabilitiesFound,
                icon: Bug,
                glow: "purple" as const,
              },
              {
                label: "Bugs Fixed",
                value: bugsFixed,
                icon: CheckCircle2,
                glow: "neon" as const,
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                data-ocid={`dashboard.stat.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <StatCard {...card} isLoading={isLoading} />
              </motion.div>
            ))}
            <motion.div
              data-ocid="dashboard.stat.4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SecurityScoreCard score={securityScore} isLoading={isLoading} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process Flow ── */}
      <ProcessFlow />

      {/* ── Charts ── */}
      <section
        className="py-14 px-6 bg-background"
        data-ocid="dashboard.charts.section"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Security Analytics"
            subtitle="Vulnerability breakdown by category and your security score trajectory over the past year."
            accent="neon"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <GlassCard glow="neon" className="p-5">
              <p className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-5">
                Vulns by Category
              </p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={vulnByCategory}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border)/0.3)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    fill="oklch(var(--primary))"
                    style={{
                      filter: "drop-shadow(0 0 6px oklch(var(--primary)/0.6))",
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Line Chart */}
            <GlassCard glow="cyan" className="p-5">
              <p className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-5">
                Security Score Trend
              </p>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={monthlyScoreTrend}
                  margin={{ top: 0, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border)/0.3)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[55, 100]}
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="oklch(var(--accent))"
                    strokeWidth={2.5}
                    dot={{ fill: "oklch(var(--accent))", r: 4, strokeWidth: 0 }}
                    activeDot={{
                      r: 6,
                      fill: "oklch(var(--accent))",
                      strokeWidth: 0,
                    }}
                    style={{
                      filter: "drop-shadow(0 0 6px oklch(var(--accent)/0.7))",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── Bug Fix Workflow + Secure Dev ── */}
      <section
        className="py-14 px-6 bg-muted/20"
        data-ocid="dashboard.workflow.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <SectionHeader
                title="Bug Fix Workflow"
                accent="cyan"
                align="left"
              />
              <GlassCard glow="cyan">
                <WorkflowTimeline />
              </GlassCard>
            </div>
            <div>
              <SectionHeader
                title="Secure Development"
                accent="purple"
                align="left"
              />
              <SecureDevAccordion />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
