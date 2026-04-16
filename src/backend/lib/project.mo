import ProjectTypes "../types/project";
import List "mo:core/List";

module {
  public type Project = ProjectTypes.Project;

  public func seedProjects(projects : List.List<Project>) {
    projects.add({
      id = 0;
      targetName = "ShopEase E-Commerce Platform";
      vulnerabilityType = "XSS (Cross-Site Scripting)";
      severity = #Critical;
      description = "A reflected XSS vulnerability was discovered in the product search endpoint. User-supplied input from the search query parameter was directly rendered into the HTML response without sanitization, allowing attackers to inject malicious scripts that execute in victims' browsers, potentially stealing session tokens or performing actions on behalf of users.";
      beforeCode = "// Vulnerable: raw user input reflected in HTML\napp.get('/search', (req, res) => {\n  const query = req.query.q;\n  res.send(`<h2>Results for: ${query}</h2>`);\n});";
      afterCode = "// Fixed: HTML-encode user input before rendering\nconst escapeHtml = (str) => str\n  .replace(/&/g, '&amp;')\n  .replace(/</g, '&lt;')\n  .replace(/>/g, '&gt;')\n  .replace(/\"/g, '&quot;');\n\napp.get('/search', (req, res) => {\n  const query = escapeHtml(req.query.q ?? '');\n  res.send(`<h2>Results for: ${query}</h2>`);\n});";
      status = #Fixed;
      category = "Web Application";
    });

    projects.add({
      id = 1;
      targetName = "SecureBank Online Banking API";
      vulnerabilityType = "SQL Injection";
      severity = #Critical;
      description = "The login endpoint was vulnerable to SQL injection via the username field. An attacker could bypass authentication entirely by injecting SQL syntax into the username parameter, potentially gaining access to any account or dumping the entire user database. This was confirmed exploitable via classic ' OR '1'='1 payloads.";
      beforeCode = "// Vulnerable: string concatenation in SQL query\ndef login(username, password):\n    query = \"SELECT * FROM users WHERE username='\" + username + \"' AND password='\" + password + \"'\"\n    cursor.execute(query)\n    return cursor.fetchone()";
      afterCode = "// Fixed: parameterized queries prevent injection\ndef login(username, password):\n    query = \"SELECT * FROM users WHERE username = %s AND password = %s\"\n    cursor.execute(query, (username, hash_password(password)))\n    return cursor.fetchone()";
      status = #Fixed;
      category = "API Security";
    });

    projects.add({
      id = 2;
      targetName = "CloudMetrics SaaS Dashboard";
      vulnerabilityType = "CSRF (Cross-Site Request Forgery)";
      severity = #High;
      description = "Multiple state-changing endpoints in the SaaS dashboard lacked CSRF token validation. An attacker could craft a malicious page that silently submits requests on behalf of an authenticated user, enabling account setting changes, data deletion, or privilege escalation without user knowledge. All POST endpoints accepting cookies for authentication were affected.";
      beforeCode = "<!-- Vulnerable: form with no CSRF protection -->\n<form method=\"POST\" action=\"/api/settings/update\">\n  <input name=\"email\" value=\"...\">\n  <button type=\"submit\">Save</button>\n</form>";
      afterCode = "<!-- Fixed: CSRF token validated server-side -->\n<form method=\"POST\" action=\"/api/settings/update\">\n  <input type=\"hidden\" name=\"_csrf\" value=\"{{ csrfToken }}\">\n  <input name=\"email\" value=\"...\">\n  <button type=\"submit\">Save</button>\n</form>\n// Server: verify token matches session before processing";
      status = #Fixed;
      category = "Web Application";
    });

    projects.add({
      id = 3;
      targetName = "MediConnect Healthcare Portal";
      vulnerabilityType = "Authentication Bypass";
      severity = #High;
      description = "Admin-only routes in the healthcare portal failed to validate JWT tokens, relying solely on client-side route guards. By directly requesting admin API endpoints with a standard user token or even no token at all, an attacker could access patient records, billing information, and system configuration. This violated HIPAA access control requirements.";
      beforeCode = "// Vulnerable: JWT not verified on admin routes\napp.get('/admin/patients', (req, res) => {\n  // TODO: add auth check\n  const patients = db.getAllPatients();\n  res.json(patients);\n});";
      afterCode = "// Fixed: JWT verified and role checked on every request\nconst requireAdmin = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });\n  req.user = decoded;\n  next();\n};\napp.get('/admin/patients', requireAdmin, (req, res) => {\n  res.json(db.getAllPatients());\n});";
      status = #Fixed;
      category = "Authentication";
    });

    projects.add({
      id = 4;
      targetName = "SmartHome IoT Firmware v3.2";
      vulnerabilityType = "Remote Code Execution (Buffer Overflow)";
      severity = #Critical;
      description = "A stack-based buffer overflow was identified in the firmware update handler of the IoT device. The function responsible for copying the update package name into a fixed-size stack buffer used unsafe memcpy without bounds checking. By sending a crafted firmware update request with an oversized package name, an attacker on the same network could overwrite the return address and achieve arbitrary code execution at the firmware level.";
      beforeCode = "// Vulnerable: unsafe memcpy without bounds check\nvoid handle_update(char *pkg_name) {\n    char buf[64];\n    memcpy(buf, pkg_name, strlen(pkg_name)); // overflow!\n    process_package(buf);\n}";
      afterCode = "// Fixed: bounds-checked copy with null termination\nvoid handle_update(const char *pkg_name) {\n    char buf[64];\n    size_t len = strlen(pkg_name);\n    if (len >= sizeof(buf)) {\n        log_error(\"Package name too long\");\n        return;\n    }\n    memcpy(buf, pkg_name, len);\n    buf[len] = '\\0';\n    process_package(buf);\n}";
      status = #Fixed;
      category = "Network Security";
    });
  };

  public func getAll(projects : List.List<Project>) : [Project] {
    projects.toArray();
  };

  public func getById(projects : List.List<Project>, id : Nat) : ?Project {
    projects.find(func(p) { p.id == id });
  };
};
