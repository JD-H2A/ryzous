import { c as createLucideIcon, j as jsxRuntimeExports, S as Shield, L as Link, B as Button, r as reactExports } from "./index-C_2TD7nS.js";
import { S as SectionHeader, G as GlassCard } from "./SectionHeader-C5mfMumD.js";
import { m as motion } from "./proxy-K7n5D9Td.js";
import { B as Bug } from "./bug-JMigUG93.js";
import { C as CircleCheck, A as ArrowRight, a as ChevronDown, b as AnimatePresence } from "./index-CorsxOJg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
];
const Code = createLucideIcon("code", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
const Network = createLucideIcon("network", __iconNode);
const SERVICES = [
  {
    id: "web-pentest",
    icon: Shield,
    title: "Web Pentesting",
    glow: "neon",
    description: "Our web penetration testing service delivers in-depth, adversarial assessments of your web applications. We simulate real-world attack scenarios using the same techniques as sophisticated threat actors, including OWASP Top 10 coverage, authentication bypass, session hijacking, and business logic flaws. Every engagement produces a prioritized, executive-ready report with concrete remediation steps.",
    features: [
      "Full OWASP Top 10 vulnerability coverage",
      "Authenticated & unauthenticated attack surface mapping",
      "Real-world attack simulation with proof-of-concept exploits",
      "Business logic flaw identification",
      "Detailed severity-ranked findings report",
      "Remediation validation retest included"
    ]
  },
  {
    id: "api-security",
    icon: Bug,
    title: "API Security",
    glow: "cyan",
    description: "APIs are the backbone of modern applications — and the number one attack surface. Our API security testing covers REST, GraphQL, gRPC, and WebSocket implementations. We probe for authentication and authorization flaws, injection vulnerabilities, excessive data exposure, rate limiting gaps, and improper asset management. Our testers go beyond automated scans to find chained logic exploits.",
    features: [
      "REST, GraphQL, gRPC & WebSocket testing",
      "Authentication & authorization bypass testing",
      "Injection attack vectors (SQLi, NoSQLi, command injection)",
      "Rate limiting & resource exhaustion analysis",
      "Sensitive data exposure & response leakage audits",
      "API schema validation & fuzzing"
    ]
  },
  {
    id: "network-testing",
    icon: Network,
    title: "Network Testing",
    glow: "purple",
    description: "From your external perimeter to your internal infrastructure, our network penetration testing exposes the paths an attacker would exploit to gain a foothold. We conduct internal and external network scanning, firewall rule analysis, port enumeration, protocol weaknesses, and lateral movement simulation. Wireless network security and segmentation reviews are included on request.",
    features: [
      "External & internal network perimeter scanning",
      "Firewall & ACL rule analysis",
      "Port enumeration & service fingerprinting",
      "Lateral movement & privilege escalation testing",
      "VPN & remote access security review",
      "Network segmentation validation"
    ]
  },
  {
    id: "code-review",
    icon: Code,
    title: "Code Review",
    glow: "neon",
    description: "Secure code review catches vulnerabilities before they reach production. Our engineers perform manual static analysis of your codebase alongside automated tooling to identify insecure patterns, hardcoded secrets, cryptographic misuse, and dependency risks. We provide line-level findings with remediation guidance and can integrate directly into your CI/CD pipeline for ongoing security assurance.",
    features: [
      "Manual static analysis by senior security engineers",
      "Automated dependency & SCA vulnerability scanning",
      "Hardcoded secrets & credential detection",
      "Cryptographic implementation review",
      "Secure coding recommendations with code examples",
      "Architecture & design pattern security review"
    ]
  }
];
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Assessment",
    desc: "Scope definition, threat modeling, and asset inventory. We align on objectives and rules of engagement before a single packet is sent.",
    color: "text-primary",
    border: "border-primary/40",
    glow: "shadow-[0_0_15px_oklch(var(--primary)/0.25)]"
  },
  {
    step: "02",
    title: "Deep Analysis",
    desc: "Active enumeration, exploitation, and lateral movement. We use the full attacker playbook to discover vulnerabilities with real proof-of-concept evidence.",
    color: "text-accent",
    border: "border-accent/40",
    glow: "shadow-[0_0_15px_oklch(var(--accent)/0.25)]"
  },
  {
    step: "03",
    title: "Report & Fix",
    desc: "Severity-ranked findings, executive summary, and remediation guidance. We stay engaged through retesting to confirm every issue is resolved.",
    color: "text-destructive",
    border: "border-destructive/40",
    glow: "shadow-[0_0_15px_oklch(var(--destructive)/0.25)]"
  }
];
const FAQS = [
  {
    q: "How long does a penetration test typically take?",
    a: "Timelines depend on scope. A targeted web application assessment runs 5–10 business days. Comprehensive network engagements or large codebases can take 2–4 weeks. We provide a precise timeline during scoping, and we never rush — thoroughness is non-negotiable."
  },
  {
    q: "Is a penetration test safe for our production environment?",
    a: "Yes. We conduct all testing under an agreed rules of engagement document. Destructive actions (data deletion, denial-of-service) are out-of-scope unless explicitly requested. We coordinate with your team in real time and can pause instantly if anything unexpected occurs."
  },
  {
    q: "What industries do you serve?",
    a: "We have experience across fintech, healthcare, SaaS, e-commerce, government, and critical infrastructure. Our team understands the compliance requirements (PCI-DSS, HIPAA, SOC 2, ISO 27001) that matter to each vertical and tailors deliverables accordingly."
  },
  {
    q: "Do you provide remediation support, not just findings?",
    a: "Absolutely. Every engagement includes a free retest of critical and high findings after your team applies fixes. We also offer paid remediation consulting where our engineers work directly alongside your developers to patch vulnerabilities and review the resulting code."
  },
  {
    q: "What certifications does the Ryzous team hold?",
    a: "Our core team holds OSCP, OSCE3, CREST CRT, CEH, and AWS/GCP security specializations. We maintain active lab environments and contribute to CVE research — we test against real-world threats, not textbook scenarios."
  }
];
function FaqItem({ q, a, index }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border/30 rounded-xl overflow-hidden glass-effect transition-smooth hover:border-accent/30",
      "data-ocid": `faq.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left group",
            "aria-expanded": open,
            "data-ocid": `faq.toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-smooth", children: q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `shrink-0 w-5 h-5 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.28, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-5 text-sm text-muted-foreground leading-relaxed", children: a })
          },
          "answer"
        ) })
      ]
    }
  );
}
function Services() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { "data-ocid": "services.page", className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-24 pb-16 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(var(--primary)/0.08),transparent)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "Our Security Services",
              subtitle: "Enterprise-grade protection, startup speed. We deliver hands-on offensive security engagements that uncover real vulnerabilities before attackers do.",
              accent: "neon",
              align: "center"
            }
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 px-4 bg-muted/10",
        "data-ocid": "services.cards.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6", children: SERVICES.map((svc, i) => {
          const Icon = svc.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.1 },
              "data-ocid": `services.card.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassCard,
                {
                  glow: svc.glow,
                  hover: true,
                  className: "h-full flex flex-col gap-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 p-3 rounded-lg bg-background/60 border border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold uppercase tracking-wide text-foreground", children: svc.title }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: svc.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2 flex-1", children: svc.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: f })
                    ] }, f)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": `services.cta.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        className: "w-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/70 transition-smooth group",
                        children: [
                          "Get Started",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" })
                        ]
                      }
                    ) }) })
                  ]
                }
              )
            },
            svc.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4", "data-ocid": "services.process.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          title: "How We Work",
          subtitle: "A disciplined three-phase methodology that delivers measurable results on every engagement.",
          accent: "cyan",
          align: "center"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-12 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-gradient-to-r from-primary/50 via-accent/50 to-destructive/50 pointer-events-none z-10" }),
        PROCESS_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.15 },
            "data-ocid": `services.process.step.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                className: `h-full flex flex-col gap-4 border ${step.border} ${step.glow}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `font-display text-4xl font-bold ${step.color} opacity-90`,
                      children: step.step
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: `font-display text-base font-bold uppercase tracking-wider ${step.color}`,
                      children: step.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.desc })
                ]
              }
            )
          },
          step.step
        ))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4 bg-muted/10",
        "data-ocid": "services.faq.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "Frequently Asked Questions",
              subtitle: "Straight answers to the questions every client asks before their first engagement.",
              accent: "purple",
              align: "center"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "services.faq.list", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: faq.q, a: faq.a, index: i }, faq.q)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.3 },
              className: "mt-12 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Still have questions? Our team responds within 24 hours." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "services.contact_cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-display uppercase tracking-wide px-8", children: [
                  "Contact Us",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                ] }) })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Services as default
};
