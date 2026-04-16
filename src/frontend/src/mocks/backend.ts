import type { backendInterface, Project, DashboardStats, ContactSubmission, Result } from "../backend";
import { ProjectStatus, Severity } from "../backend";

const sampleProjects: Project[] = [
  {
    id: BigInt(0),
    targetName: "ShopEase E-Commerce Platform",
    vulnerabilityType: "XSS (Cross-Site Scripting)",
    severity: Severity.Critical,
    description:
      "A reflected XSS vulnerability was discovered in the product search endpoint. User-supplied input from the search query parameter was directly rendered into the HTML response without sanitization.",
    beforeCode:
      "// Vulnerable: raw user input reflected in HTML\napp.get('/search', (req, res) => {\n  const query = req.query.q;\n  res.send(`<h2>Results for: ${query}</h2>`);\n});",
    afterCode:
      "// Fixed: HTML-encode user input before rendering\nconst escapeHtml = (str) => str\n  .replace(/&/g, '&amp;')\n  .replace(/</g, '&lt;');\n\napp.get('/search', (req, res) => {\n  const query = escapeHtml(req.query.q ?? '');\n  res.send(`<h2>Results for: ${query}</h2>`);\n});",
    status: ProjectStatus.Fixed,
    category: "Web Application",
  },
  {
    id: BigInt(1),
    targetName: "SecureBank Online Banking API",
    vulnerabilityType: "SQL Injection",
    severity: Severity.Critical,
    description:
      "The login endpoint was vulnerable to SQL injection via the username field. An attacker could bypass authentication entirely by injecting SQL syntax into the username parameter.",
    beforeCode:
      "// Vulnerable: string concatenation in SQL query\ndef login(username, password):\n    query = \"SELECT * FROM users WHERE username='\" + username + \"'\"\n    cursor.execute(query)",
    afterCode:
      "// Fixed: parameterized queries prevent injection\ndef login(username, password):\n    query = \"SELECT * FROM users WHERE username = %s AND password = %s\"\n    cursor.execute(query, (username, hash_password(password)))",
    status: ProjectStatus.Fixed,
    category: "API Security",
  },
  {
    id: BigInt(2),
    targetName: "CloudMetrics SaaS Dashboard",
    vulnerabilityType: "CSRF (Cross-Site Request Forgery)",
    severity: Severity.High,
    description:
      "Multiple state-changing endpoints in the SaaS dashboard lacked CSRF token validation. An attacker could craft a malicious page that silently submits requests on behalf of an authenticated user.",
    beforeCode:
      "<!-- Vulnerable: form with no CSRF protection -->\n<form method=\"POST\" action=\"/api/settings/update\">\n  <input name=\"email\" value=\"...\">\n  <button type=\"submit\">Save</button>\n</form>",
    afterCode:
      "<!-- Fixed: CSRF token validated server-side -->\n<form method=\"POST\" action=\"/api/settings/update\">\n  <input type=\"hidden\" name=\"_csrf\" value=\"{{ csrfToken }}\">\n  <input name=\"email\" value=\"...\">\n  <button type=\"submit\">Save</button>\n</form>",
    status: ProjectStatus.Fixed,
    category: "Web Application",
  },
  {
    id: BigInt(3),
    targetName: "MediConnect Healthcare Portal",
    vulnerabilityType: "Authentication Bypass",
    severity: Severity.High,
    description:
      "Admin-only routes in the healthcare portal failed to validate JWT tokens, relying solely on client-side route guards.",
    beforeCode:
      "// Vulnerable: JWT not verified on admin routes\napp.get('/admin/patients', (req, res) => {\n  // TODO: add auth check\n  const patients = db.getAllPatients();\n  res.json(patients);\n});",
    afterCode:
      "// Fixed: JWT verified and role checked on every request\nconst requireAdmin = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  next();\n};",
    status: ProjectStatus.Fixed,
    category: "Authentication",
  },
  {
    id: BigInt(4),
    targetName: "SmartHome IoT Firmware v3.2",
    vulnerabilityType: "Remote Code Execution (Buffer Overflow)",
    severity: Severity.Critical,
    description:
      "A stack-based buffer overflow was identified in the firmware update handler of the IoT device. By sending a crafted firmware update request, an attacker could achieve arbitrary code execution.",
    beforeCode:
      "// Vulnerable: unsafe memcpy without bounds check\nvoid handle_update(char *pkg_name) {\n    char buf[64];\n    memcpy(buf, pkg_name, strlen(pkg_name)); // overflow!\n}",
    afterCode:
      "// Fixed: bounds-checked copy with null termination\nvoid handle_update(const char *pkg_name) {\n    char buf[64];\n    size_t len = strlen(pkg_name);\n    if (len >= sizeof(buf)) { log_error(\"Too long\"); return; }\n    memcpy(buf, pkg_name, len);\n    buf[len] = '\\0';\n}",
    status: ProjectStatus.Fixed,
    category: "Network Security",
  },
];

const sampleStats: DashboardStats = {
  totalProjects: BigInt(5),
  vulnerabilitiesFound: BigInt(47),
  bugsFixed: BigInt(43),
  securityScore: BigInt(92),
};

export const mockBackend: backendInterface = {
  getContacts: async (): Promise<ContactSubmission[]> => [],

  getDashboardStats: async (): Promise<DashboardStats> => sampleStats,

  getProject: async (id: bigint): Promise<Project | null> => {
    return sampleProjects.find((p) => p.id === id) ?? null;
  },

  getProjects: async (): Promise<Project[]> => sampleProjects,

  submitContact: async (): Promise<Result> => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      name: "Test User",
      email: "test@example.com",
      message: "Test message",
      timestamp: BigInt(Date.now()),
    },
  }),
};
