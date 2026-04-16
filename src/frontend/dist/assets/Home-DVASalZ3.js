import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, S as Shield } from "./index-C_2TD7nS.js";
import { S as SectionHeader, G as GlassCard } from "./SectionHeader-C5mfMumD.js";
import { B as Badge, T as Terminal } from "./badge-7Bfpkyxf.js";
import { r as resolveElements, m as motion } from "./proxy-K7n5D9Td.js";
import { C as ChevronRight, G as Globe } from "./globe-ORq_GYZJ.js";
import { B as Bug } from "./bug-JMigUG93.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
const LOG_POOL = [
  {
    message: "XSS attack detected on endpoint /api/v2/search",
    severity: "critical"
  },
  {
    message: "SQL Injection attempt blocked — payload sanitized",
    severity: "critical"
  },
  { message: "Bug patched successfully — CVE-2024-1984", severity: "success" },
  {
    message: "Recon scan initiated on target 192.168.1.0/24",
    severity: "info"
  },
  { message: "Port scan completed — 3 open ports flagged", severity: "warn" },
  {
    message: "CSRF token validation failed — request rejected",
    severity: "critical"
  },
  { message: "Auth bypass attempt detected and logged", severity: "warn" },
  { message: "Vulnerability report generated — 7 findings", severity: "info" },
  { message: "Patch deployed successfully to production", severity: "success" },
  {
    message: "SSRF probe blocked — external call prevented",
    severity: "critical"
  }
];
const SERVICES = [
  {
    icon: Shield,
    title: "Penetration Testing",
    description: "Simulate real-world attacks to uncover exploitable weaknesses before malicious actors do.",
    glow: "neon",
    accent: "text-primary"
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description: "Comprehensive scans and manual review to identify, classify, and prioritize security risks.",
    glow: "cyan",
    accent: "text-accent"
  },
  {
    icon: CodeXml,
    title: "Secure Development",
    description: "Embed security into your SDLC with code reviews, threat modelling, and secure architecture.",
    glow: "purple",
    accent: "text-destructive"
  },
  {
    icon: Bug,
    title: "Bug Fixing",
    description: "Rapid remediation of confirmed vulnerabilities with regression testing and documented patches.",
    glow: "neon",
    accent: "text-primary"
  }
];
const STATS = [
  { target: 142, label: "Vulnerabilities Found", suffix: "+" },
  { target: 98, label: "Clients Secured", suffix: "+" },
  { target: 99, label: "Patch Success Rate", suffix: "%" },
  { target: 5, label: "Years in Operation", suffix: "+" }
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
  ">> Full report exported to report_2026.pdf"
];
function useCountUp(target, duration = 1800, enabled = false) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!enabled) return;
    let start = null;
    const step = (ts) => {
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
function ScanLineOverlay() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(var(--primary)/0.015)_2px,oklch(var(--primary)/0.015)_4px)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(var(--primary)/0.08)_0%,transparent_70%)]" })
  ] });
}
function GridBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden opacity-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(oklch(var(--border)/0.4)_1px,transparent_1px),linear-gradient(90deg,oklch(var(--border)/0.4)_1px,transparent_1px)] bg-[size:60px_60px]" }) });
}
function LogLine({ entry }) {
  const colors = {
    critical: "text-destructive",
    warn: "text-yellow-400",
    info: "text-accent",
    success: "text-primary"
  };
  const prefix = {
    critical: "[ALERT]",
    warn: "[WARN] ",
    info: "[INFO] ",
    success: "[OK]   "
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4 },
      className: "flex gap-3 items-start font-mono text-xs leading-relaxed py-1 border-b border-border/20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground shrink-0 tabular-nums", children: entry.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 font-medium ${colors[entry.severity]}`, children: prefix[entry.severity] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 min-w-0 break-words", children: entry.message })
      ]
    }
  );
}
function StatCard({ item }) {
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(item.target, 1600, inView2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl md:text-5xl font-bold tabular-nums text-primary drop-shadow-[0_0_12px_oklch(var(--primary)/0.6)]", children: [
      count,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: item.suffix })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground font-medium uppercase tracking-wider", children: item.label })
  ] });
}
function ServiceCard({
  icon: Icon,
  title,
  description,
  glow,
  accent,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.1, duration: 0.5 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          glow,
          hover: true,
          className: "h-full flex flex-col gap-4",
          "data-ocid": `services.card.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-lg flex items-center justify-center ${accent === "text-primary" ? "bg-primary/10" : accent === "text-accent" ? "bg-accent/10" : "bg-destructive/10"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${accent}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: `flex items-center gap-1 text-xs font-medium transition-smooth hover:gap-2 ${accent}`,
                children: [
                  "Learn more ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                ]
              }
            ) }) })
          ]
        }
      )
    }
  );
}
function Home() {
  const [logs, setLogs] = reactExports.useState(
    () => LOG_POOL.slice(0, 5).map((l, i) => ({
      ...l,
      id: i,
      time: new Date(Date.now() - (5 - i) * 3e3).toLocaleTimeString("en-US", {
        hour12: false
      })
    }))
  );
  const logCounter = reactExports.useRef(5);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const poolEntry = LOG_POOL[logCounter.current % LOG_POOL.length];
      const newEntry = {
        ...poolEntry,
        id: logCounter.current,
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })
      };
      logCounter.current += 1;
      setLogs((prev) => [newEntry, ...prev].slice(0, 8));
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  const [scanUrl, setScanUrl] = reactExports.useState("");
  const [scanning, setScanning] = reactExports.useState(false);
  const [scanLines, setScanLines] = reactExports.useState([]);
  const [scanDone, setScanDone] = reactExports.useState(false);
  const scanRef = reactExports.useRef(null);
  const runScan = reactExports.useCallback(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
        "data-ocid": "hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
              style: {
                backgroundImage: "url('/assets/generated/hero-cyber-network.dim_1600x900.jpg')"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLineOverlay, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-24 left-8 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-lg opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-16 right-8 w-32 h-32 border-b-2 border-r-2 border-accent/30 rounded-br-lg opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "relative z-10 text-center px-4 max-w-5xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.2, duration: 0.5 },
                    className: "inline-flex items-center gap-2 mb-8",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "border-primary/40 bg-primary/10 text-primary px-4 py-1.5 font-mono text-xs tracking-widest", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3 h-3 mr-1.5 animate-pulse" }),
                      "LIVE THREAT MONITORING"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3, duration: 0.7 },
                    className: "font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-foreground", children: "Ryzous" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_oklch(var(--primary)/0.5)]", children: "Securing the" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-foreground/90", children: "Digital Future" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.6, duration: 0.6 },
                    className: "text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed",
                    children: [
                      "We find vulnerabilities before hackers do.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: "Think Like a Hacker. Defend Like a Pro." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.8, duration: 0.5 },
                    className: "flex flex-col sm:flex-row gap-4 justify-center items-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          className: "glow-neon bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold px-8 py-3 text-base tracking-wide transition-smooth",
                          "data-ocid": "hero.open_dashboard_button",
                          children: [
                            "Open Dashboard ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-2 w-4 h-4" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          variant: "outline",
                          className: "glass-effect border-accent/40 text-accent hover:border-accent/70 hover:bg-accent/10 font-display font-bold px-8 py-3 text-base tracking-wide transition-smooth",
                          "data-ocid": "hero.request_test_button",
                          children: [
                            "Request Test ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 w-4 h-4" })
                          ]
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.5 },
              className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono uppercase tracking-widest", children: "Scroll" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-12 bg-card border-y border-border/30 overflow-hidden",
        "data-ocid": "stats.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12", children: STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { item: s }, s.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4 bg-background",
        "data-ocid": "activity.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionHeader,
                {
                  title: "Live Threat Activity",
                  subtitle: "Real-time monitoring feed — threats detected, blocked, and patched as they happen.",
                  accent: "neon"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.2, duration: 0.6 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden p-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-muted/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-destructive/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-primary/70" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-xs font-mono ml-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ryzous-monitor — live feed" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary animate-pulse", children: "● LIVE" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-0 min-h-[240px]", children: logs.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(LogLine, { entry }, entry.id)) })
              ] })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4 bg-muted/20", "data-ocid": "services.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "Our Services",
              subtitle: "Comprehensive cybersecurity solutions built for modern threat landscapes.",
              accent: "cyan"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: SERVICES.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { ...service, index: i }, service.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4 bg-background", "data-ocid": "scan.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "Scan My Website",
              subtitle: "Enter a URL to see a simulated security scan — a taste of what Ryzous delivers.",
              accent: "purple"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.2, duration: 0.6 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { glow: "purple", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 bg-background/60 border border-border/50 rounded-lg px-4 py-2.5 focus-within:border-accent/60 transition-smooth", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: scanUrl,
                    onChange: (e) => setScanUrl(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && runScan(),
                    placeholder: "https://example.com",
                    className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono",
                    "data-ocid": "scan.input",
                    disabled: scanning
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: runScan,
                  disabled: scanning || !scanUrl.trim(),
                  className: "glow-neon bg-primary text-primary-foreground font-display font-bold px-6 transition-smooth disabled:opacity-50",
                  "data-ocid": "scan.submit_button",
                  children: scanning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 animate-pulse" }),
                    " ",
                    "Scanning…"
                  ] }) : "Scan"
                }
              )
            ] }),
            (scanLines.length > 0 || scanning) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                ref: scanRef,
                className: "rounded-lg border border-border/40 bg-background/80 p-4 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto scroll-smooth",
                "data-ocid": "scan.output",
                children: [
                  scanLines.map((line, lineIndex) => {
                    const lineKey = `scan-line-${lineIndex}`;
                    const cls = line.startsWith("[!]") ? "text-yellow-400" : line.startsWith("[ALERT]") || line.includes("CRITICAL") ? "text-destructive" : line.startsWith("[+]") || line.startsWith(">>") ? "text-primary" : line.startsWith("$") ? "text-accent" : "text-foreground/70";
                    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, children: line || " " }, lineKey);
                  }),
                  scanning && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary animate-pulse", children: "█" })
                ]
              }
            ),
            scanDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "mt-4 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Demo scan complete. Real scans reveal deeper findings." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "border-primary/40 text-primary hover:bg-primary/10 text-xs",
                      "data-ocid": "scan.request_full_button",
                      children: [
                        "Request Full Scan",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-1 w-3 h-3" })
                      ]
                    }
                  ) })
                ]
              }
            )
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4 bg-muted/20 border-t border-border/20",
        "data-ocid": "cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { glow: "neon", className: "py-14", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-3xl md:text-4xl text-foreground mb-4", children: [
                "Ready to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "Secure Your Systems?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed", children: "Join 98+ companies that trust Ryzous to protect their infrastructure. Start with a free consultation today." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "glow-neon bg-primary text-primary-foreground font-display font-bold px-8 transition-smooth",
                    "data-ocid": "cta.contact_button",
                    children: "Get Free Consultation"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/proof", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "border-border/60 text-foreground hover:border-accent/50 hover:text-accent font-display transition-smooth",
                    "data-ocid": "cta.proof_button",
                    children: "View Our Work"
                  }
                ) })
              ] })
            ] })
          }
        ) })
      }
    )
  ] });
}
export {
  Home as default
};
